import { localStorage } from '@utils/helpers';

// Authentication service functions
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userProfile';

export const isAuthenticated = (): boolean => {
    const token = localStorage.get<string>(AUTH_TOKEN_KEY);
    const userData = localStorage.get(USER_DATA_KEY);
    return !!(token && userData);
};

export const removeToken = (): void => {
    try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
        console.error('Error removing auth data:', error);
    }
};

export const logout = (): void => {
    removeToken();
    window.location.href = '/login';
}; 