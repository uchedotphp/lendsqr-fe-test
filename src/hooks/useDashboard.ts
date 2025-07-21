import { useEffect, useState, useContext } from 'react';
import apiClient from '@services/api';
import { CanceledError } from 'axios';
import DashboardContext from '../state-management/context/dashboardContext';
import type { StatusSchemaType } from '../schemas/Schema';

export interface DashboardKPI {
  label: string;
  value: number;
  currency?: boolean;
}

export interface DashboardActivity {
  id: number;
  type: string;
  user: string;
  action: string;
  amount?: string;
  time: string;
  status: StatusSchemaType;
}

export interface DashboardQuickStats {
  pendingApplications: number;
  usersToActivate: number;
  overduePayments: number;
  newRegistrations: number;
}

interface DashboardData {
  kpis: DashboardKPI[];
  activities: DashboardActivity[];
  quickStats: DashboardQuickStats;
}

const useDashboardData = () => {
  const { lastUpdated } = useContext(DashboardContext);
  const [data, setData] = useState<DashboardData>({
    kpis: [],
    activities: [],
    quickStats: {
      pendingApplications: 0,
      usersToActivate: 0,
      overduePayments: 0,
      newRegistrations: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get('/dashboard', { signal });
        const { kpis, activities, quickStats } = response.data;
        
        setData({
          kpis,
          activities,
          quickStats,
        });
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
  }, [lastUpdated]);

  return { data, loading, error };
};

export default useDashboardData; 