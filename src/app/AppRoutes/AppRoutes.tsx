import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeDefinitions } from './routeDefinitions';

export const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routeDefinitions.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  </Suspense>
);
