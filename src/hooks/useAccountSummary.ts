import { useEffect, useState } from 'react';
import apiClient from '@services/api';
import { CanceledError } from 'axios';

interface AccountSummary {
  accountNumber: string;
  accountName: string;
  bankName: string;
  balance: string;
  tier: string;
  status: string;
  createdAt: string;
}

const useAccountSummary = (userId: string | undefined) => {
  const [data, setData] = useState<AccountSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError('User ID is required');
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.get(`/users/${userId}/account-summary`, { signal });
        setData(response.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [userId]);

  return { data, loading, error };
};

export default useAccountSummary;
export type { AccountSummary }; 