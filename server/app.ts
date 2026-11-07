import type { ErrorRequestHandler } from 'express';
import express from 'express';

import { matchRoutes } from 'react-router-dom';

import { routeDefinitions } from '../src/app/AppRoutes/routeDefinitions';
import { renderPage } from '../src/server';

import { clientDirectory } from './config/clientAssets';
import { renderDocument } from './services/renderDocument';

export const app = express();

app.disable('x-powered-by');

// Раздача клиентских ресурсов.
app.use(
  express.static(clientDirectory, {
    index: false,
    fallthrough: true,
  }),
);

// Серверный рендеринг.
app.get('/{*splat}', async (request, response) => {
  const pathname = request.path;

  // Отсутствующие статические ресурсы не должны запускать SSR.
  if (/^\/(?:js|css|assets)\//.test(pathname) || pathname === '/manifest.json') {
    response.status(404).send('Not Found');
    return;
  }

  // Определяем маршрут React-приложения.
  const matches = matchRoutes(routeDefinitions, pathname);

  const statusCode = !matches || matches.at(-1)?.route.path === '*' ? 404 : 200;

  // Выполняем React SSR.
  const { markup, dehydratedState } = await renderPage(pathname);

  // Формируем HTML.
  const html = await renderDocument({
    markup,
    dehydratedState,
  });

  response.set('Cache-Control', 'no-store');

  response.status(statusCode).type('html').send(html);
});

// Централизованная обработка ошибок.
const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  console.error('SSR error:', error);

  if (response.headersSent) {
    next(error);
    return;
  }

  response.status(500).type('text/plain').send('Internal Server Error');
};

app.use(errorHandler);
