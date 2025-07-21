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
    },

    removeItem(key: string) {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from localStorage for key "${key}":`, error);
            throw new Error(`Failed to remove localStorage item: ${error}`);
        }
    }
};

export function formatNumber(num: number, currency?: boolean): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M'; // Represent in millions
    } else if (currency) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
        });
        return formatter.format(num); // Add comma delimiter for thousands
    } else {
        return num.toLocaleString(); // Add comma delimiter for thousands
    }
}

export function formatDateTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    const datePart = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const timePart = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return `${datePart} ${timePart}`;
}
