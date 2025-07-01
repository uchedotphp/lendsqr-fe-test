export const localStorage = {
    set(key: string, value: unknown) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item in localStorage for key "${key}":`, error);
            throw new Error(`Failed to set localStorage item: ${error}`);
        }
    },

    get<T>(key: string): T | null {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : null;
        } catch (error) {
            console.error(`Error getting item from localStorage for key "${key}":`, error);
            throw new Error(`Failed to get localStorage item: ${error}`);
        }
    }
};