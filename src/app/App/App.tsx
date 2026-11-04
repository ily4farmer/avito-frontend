import { AppQueryClient } from '../AppQueryClient';
import { AppRoutes } from '../AppRoutes/AppRoutes';

export const App = () => {
  return (
    <AppQueryClient>
      <AppRoutes />
    </AppQueryClient>
  );
};
