import { lazy } from 'react';
import { RouteId, RouteUrl } from '../../constants/routes';
import type { AppRoutesConfig } from '../../types';

const Main = lazy(() =>
  import('../../pages/Main/Main').then(module => ({
    default: module.Main,
  })),
);

const About = lazy(() =>
  import('../../pages/About/About').then(module => ({
    default: module.About,
  })),
);

const NotFound = lazy(() =>
  import('../../pages/NotFound/NotFound').then(module => ({
    default: module.NotFound,
  })),
);

export const AppAllRoutes: AppRoutesConfig = [
  {
    components: <Main />,
    path: RouteUrl[RouteId.main],
  },
  {
    components: <About />,
    path: RouteUrl[RouteId.about],
  },
  {
    components: <NotFound />,
    path: RouteUrl[RouteId.notFound],
  },
];
