'use client'
import { API_DATA } from '@/components/shared/apiGlobal';
import { viewStore } from '@/store/viewUsersRegister';
import React from 'react'

export const useGetDataForApi = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const { value } = viewStore()

  const getList = async (url:string) => {
    try {
      const resp = await fetch(`${url}`);
      const data = await resp.json();
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (value.length !== 0) {
      getList(`${API_DATA}/${value}`)
      return;
    }
    getList(`${API_DATA}`);
  }, [value])

  const processData = (data: {}) => {

    if (!Array.isArray(data)) {
      return [data];
    }
    return data;
  };
  const processedData = processData(items);
  return {
    items: processedData,
    isLoading
  }
}
