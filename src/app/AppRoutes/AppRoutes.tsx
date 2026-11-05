import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppAllRoutes } from './AppAllRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      {AppAllRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<Suspense fallback={<div>Loading...</div>}>{route.components}</Suspense>}
        />
      ))}
    </Routes>
  );
};
