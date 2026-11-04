import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

type Options = {
  method?: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
};

const api = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

export const baseQuery = async <T>(baseURL: string, { method = 'GET', body }: Options) => {
  const response = await api.request<T>({
    url: baseURL,
    method,
    data: body,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`${response.statusText}`);
  }

  return response.data;
};
