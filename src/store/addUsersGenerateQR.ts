import { create } from 'zustand';

export type User  = {
    username: string;
    lastname: string;
}

type Store = {
  user: User;
  addValueBtnQR: (nameValueBtnGenerate:any) => void;
};

// Inicializa vacio pero ssabe que tipado es
export const defaultInitState: Store = {
    user: { username: '', lastname: '' },
    addValueBtnQR: () => {},
  }

export const addGenerateQRStore = create<Store>((set) => ({
    ...defaultInitState,
    addValueBtnQR: (nameValueBtnGenerate) => {
    set({user: nameValueBtnGenerate.username + ' ' + nameValueBtnGenerate.lastname});
  },
}));
    console.log("🚀 ~ addGenerateQRStore ~ defaultInitState:", defaultInitState)


