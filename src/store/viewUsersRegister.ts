import { create } from 'zustand';

type Store = {
  value: string;
  addValueSearch: (nameValueSearch : string) => void;
};

export const viewStore = create<Store>((set) => ({
  value: '',
  addValueSearch: (nameValueSearch) => {
    set({ value: nameValueSearch });
  },
}));
