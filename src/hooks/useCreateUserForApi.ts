import { useCallback } from 'react';
import { API_DATA } from "@/components/shared/apiGlobal";
import { toast } from "react-toastify";
import { catchError } from '@/utils/catchError';

interface User {
  email?: string | null;
  username?: string | null;
  lastname: string;
  authStrategy: 'SignUp' | 'Google';
}

interface ApiResponse {
  username?: string;
  id?: string;
}

export const useCreateUserForApi = () => {
  const addUsers = useCallback(async (user: User): Promise<boolean> => {
    // Validación de entrada
    if (!user.email || !user.username) {
      toast.error('Email y username son requeridos');
      return false;
    }

    try {
      const response = await fetch(`${API_DATA}/users`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(user)
      });

      const data: ApiResponse = await response.json();

      // Mejorar la validación de respuesta exitosa
      const isSuccess = data && (data.id || data.username);

      if (isSuccess) {
        toast.success(`Usuario ${data.username || user.username} creado exitosamente`);
        return true;
      } else {
        toast.error('Respuesta inesperada del servidor');
        return false;
      }

    } catch (error) {
      console.error('Error creating user:', error);

      // Manejo de errores más específico
      catchError(error);

      return false;
    }
  }, []);

  return {
    addUsers
  };
};