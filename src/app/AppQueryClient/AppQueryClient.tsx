import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  queryClient?: QueryClient;
};

export const createQueryClient = () => {
  return new QueryClient();
};

const browserQueryClient = createQueryClient();

export const AppQueryClient = ({ children, queryClient }: Props) => {
  return (
    <QueryClientProvider client={queryClient ?? browserQueryClient}>{children}</QueryClientProvider>
  );
};
