import { useEffect, useState, useContext } from 'react';
import apiClient from '@services/api'
import { CanceledError } from 'axios';
import type { UserProfileSchemaType } from 'schemas/Schema';
import UsersTableContext from '../state-management/context/usersTableContext';

export interface UsersQuery {
    page: number;
    perPage: number;
    organization?: string;
    username?: string;
    email?: string;
    phone?: string;
    date?: string;
    status?: string;
}

type KpiType = { label: string; value: string }[];
export type RecordsType = {
    first: number | null,
    prev: number | null,
    next: number | null,
    last: number | null,
    pages: number | null,
    items: number | null,
    data: UserProfileSchemaType[]
}

interface FetchResponse {
    kpis: KpiType;
    records: UserProfileSchemaType[];
    pagination: {
        first: number;
        prev: number | null;
        next: number | null;
        last: number;
        pages: number;
        items: number;
    }
};

const useUsersData = (usersQuery?: UsersQuery) => {
    const { page, perPage } = useContext(UsersTableContext);
    const [data, setData] = useState<FetchResponse>({
        kpis: [] as KpiType,
        records: [],
        pagination: {
            first: 1,
            prev: null,
            next: null,
            last: 1,
            pages: 1,
            items: 0
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const currentPage = usersQuery?.page ?? page;
    const currentPerPage = usersQuery?.perPage ?? perPage;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get(`/users`, {
                    params: {
                        page: currentPage,
                        per_page: currentPerPage,
                        organization: usersQuery?.organization,
                        username: usersQuery?.username,
                        email: usersQuery?.email,
                        phone: usersQuery?.phone,
                        date: usersQuery?.date,
                        status: usersQuery?.status
                    },
                    signal
                });

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
    }, [currentPage, currentPerPage, usersQuery?.organization, usersQuery?.username, usersQuery?.email, usersQuery?.phone, usersQuery?.date, usersQuery?.status]);

    return { data, loading, error };
};

export default useUsersData;