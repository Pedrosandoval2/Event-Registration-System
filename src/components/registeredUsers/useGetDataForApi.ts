import React from 'react'
import { useAsyncList } from "@react-stately/data";

export const useGetDataForApi = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    console.log("🚀 ~ RegisteredUsers ~ searchTerm:", searchTerm)
  
    const onsubmit = async (e: any) => {
      e.preventDefault();
      const nameValue = e.target[0].value;
      setSearchTerm(nameValue);
      await getDataForName(nameValue);
    };
  
    const getDataForName = async (nameSearch: string) => {
      const resp = await fetch(`https://swapi.py4e.com/api/people/?search=${nameSearch}`);
      const data = await resp.json();
      setItems(data.results);
    };
  
    const list = useAsyncList({
      async load({ signal }) {
        const res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
          signal,
        });
        const json = await res.json();
        setIsLoading(false);
  
        return {
          items: json.results,
        };
      },
      async sort({ items, sortDescriptor }) {
        return {
          items: items.sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
  
            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }
  
            return cmp;
          }),
        };
      },
    });
    return {
        onsubmit,
        getDataForName,
        list,
        isLoading,
        items,
        searchTerm
    }
}
