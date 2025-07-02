import { localStorage } from "@utils/helpers";
import { useEffect, useState } from "react";

export function usePersistedState<T>(Key: string, initialValue: T) {
    const [value, setValue] = useState(() => {
        const item = localStorage.get(Key);
        return (item as T) || initialValue
    });

    useEffect(() => {
        localStorage.set(Key, value);
    }, [Key, value]);

    return [value, setValue] as const;
}