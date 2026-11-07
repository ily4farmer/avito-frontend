import type { QueryClient } from '@tanstack/react-query';
import { type ComponentType, lazy } from 'react';

import { demoPostQueryOptions } from '../../services/demoPost';

const Main = lazy(() => import('../../pages/Main/Main').then(({ Main }) => ({ default: Main })));
const About = lazy(() =>
  import('../../pages/About/About').then(({ About }) => ({ default: About })),
);
const NotFound = lazy(() =>
  import('../../pages/NotFound/NotFound').then(({ NotFound }) => ({ default: NotFound })),
);

export type RouteDefinition = {
  path: string;
  Component: ComponentType;
  preload?: (queryClient: QueryClient) => Promise<unknown>;
};

export const routeDefinitions: RouteDefinition[] = [
  {
    path: '/',
    Component: Main,
    preload: queryClient => queryClient.query(demoPostQueryOptions).catch(() => undefined),
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '*',
    Component: NotFound,
  },
];
