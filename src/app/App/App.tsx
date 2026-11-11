import { AppAntdProvider } from '../AppAntdProvider';
import { AppQueryClient } from '../AppQueryClient';
import { AppRoutes } from '../AppRoutes/AppRoutes';

export const App = () => {
  return (
    <AppQueryClient>
      <AppAntdProvider>
        <AppRoutes />
      </AppAntdProvider>
    </AppQueryClient>
  );
};
