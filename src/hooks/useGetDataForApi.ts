import { User } from '@/interfaces/users/users';
import React from 'react'

const getList = async (url: string, query?: string): Promise<User[]> => {
  try {
    const resp = await fetch(`${url}${query ? `?username=${query}` : ''}`);
    const data = await resp.json();
    if (!data) return [];
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Error fetching data');
  }
};

export const useGetDataForApi = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [items, setItems] = React.useState<User[]>([]);

  const fetchData = async (url: string, query?: string) => {
    try {
      setIsLoading(true);
      const data = await getList(url, query);
      setItems(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    fetchData,
    isLoading,
    items
  }

}


