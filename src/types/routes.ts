import type { ReactNode } from 'react';

export type AppRoutesConfig = RouteItem[];

export type RouteItem = {
  components: ReactNode;
  path: string;
};
