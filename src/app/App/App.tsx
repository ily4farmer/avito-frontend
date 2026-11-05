import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import { AppQueryClient } from '../AppQueryClient';
import { AppRoutes } from '../AppRoutes/AppRoutes';

type Props = {
  queryClient?: QueryClient;
  dehydratedState?: DehydratedState;
};

export const App = ({ queryClient, dehydratedState }: Props) => {
  return (
    <AppQueryClient queryClient={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <AppRoutes />
      </HydrationBoundary>
    </AppQueryClient>
  );
};
