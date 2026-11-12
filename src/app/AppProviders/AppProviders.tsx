import type { ReactNode } from 'react';
import { AppAntdProvider } from './AppAntdProvider';
import { AppQueryClient } from './AppQueryClient';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AppQueryClient>
      <AppAntdProvider>{children}</AppAntdProvider>
    </AppQueryClient>
  );
};
