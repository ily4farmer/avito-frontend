import type { QueryClient } from '@tanstack/react-query';

import { RouteId, RouteUrl } from '../../constants/routes';
import { demoPostQueryOptions } from '../../services/demoPost';

export type RouteDefinition = {
  id: RouteId;
  path: string;
  preload?: (queryClient: QueryClient) => Promise<unknown>;
};

export const routeDefinitions: RouteDefinition[] = [
  {
    id: RouteId.main,
    path: RouteUrl.main,
    preload: queryClient => queryClient.query(demoPostQueryOptions),
  },
  {
    id: RouteId.about,
    path: RouteUrl.about,
  },
  {
    id: RouteId.notFound,
    path: RouteUrl.notFound,
  },
];
