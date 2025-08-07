import { toast } from "react-toastify";

export const catchError = (error: unknown) => {
    if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Error de conexión. Verifica tu conexión a internet');
    } else if (error instanceof Error) {
        toast.error(error.message || 'Error al crear el usuario');
    } else {
        toast.error('Error desconocido al crear el usuario');
    }
}