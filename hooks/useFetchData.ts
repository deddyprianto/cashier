import { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

interface FetchDataParams {
  token?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: Record<string, any>;
  queryParams?: Record<string, string | number | boolean>;
}

interface FetchDataResult<T> {
  dataRes: T | undefined;
  isLoading: boolean;
  isError: any;
  mutate: SWRResponse<T, any>['mutate'];
}

export const useFetchData = <T>({
  token,
  method = 'GET',
  endpoint,
  body,
  queryParams,
}: FetchDataParams): FetchDataResult<T> => {
  const myVariable = process.env.NEXT_PUBLIC_BASE_URL_API;

  const [loading, setLoading] = useState(false);

  const url = new URL(`${myVariable}/${endpoint}`);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const fetcher = async (url: string) => {
    setLoading(true);
    const res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });
    setLoading(false);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'An error occurred');
    }

    return res.json();
  };

  const { data, error, mutate } = useSWR<T>(url.toString(), fetcher, {
    revalidateOnFocus: false,
    onError: () => setLoading(false),
  });

  return {
    mutate,
    dataRes: data,
    isLoading: loading,
    isError: error,
  };
};
