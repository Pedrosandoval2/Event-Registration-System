import { useState, useEffect } from 'react';

/**
 * Hook para debouncing de un valor.
 * @param value El valor que deseas debounciar.
 * @param delay El tiempo en milisegundos que se espera antes de actualizar el valor.
 * @returns El valor debounciado.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpia el timeout si el valor cambia antes de que se cumpla el delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}