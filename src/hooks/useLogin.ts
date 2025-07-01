import { useState } from 'react';
import { type LoginSchemaType } from '../schemas/Schema';
import { localStorage } from '@utils/helpers';

interface LoginResponse {
  success: boolean;
  error?: string;
  data?: {
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      organization: string;
      role: string;
      username: string;
      phoneNumber: string;
      status: string;
      imgUrl: string;
      organizations: string[];
    }
  }
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginSchemaType): Promise<LoginResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Login failed');
      }

      // Store auth data in localStorage
      localStorage.set('userProfile', data.user);
      localStorage.set('authToken', data.token);

      return {
        success: true,
        data: data
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error
  };
};
