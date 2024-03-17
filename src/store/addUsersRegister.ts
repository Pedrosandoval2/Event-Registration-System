import { create } from 'zustand';

export type CreateUserDto = {
    username: string;
    lastname: string;
    email: string;
    authStrategy: string;
}

type Store = {
  user: CreateUserDto;
  addValueSearch: (nameValueSearch:any) => void;
};

// Inicializa vacio pero ssabe que tipado es
export const defaultInitState = {
    user: {} as CreateUserDto
  }

export const addUsersRegister = create<Store>((set) => ({
    ...defaultInitState,
  addValueSearch: (nameValueSearch) => {
    set({ user: nameValueSearch });
  },
}));


