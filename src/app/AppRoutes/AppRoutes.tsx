import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppAllRoutes } from './AppAllRoutes';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AppAllRoutes.map(el => (
          <Route
            key={el.path}
            path={el.path}
            element={<Suspense fallback={<div>Loading...</div>}>{el.components}</Suspense>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
