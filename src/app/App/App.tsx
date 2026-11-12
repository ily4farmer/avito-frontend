import { AppProviders } from '../AppProviders';
import { AppRoutes } from '../AppRoutes/AppRoutes';

export const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};
