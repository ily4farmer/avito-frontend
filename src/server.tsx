import { PassThrough } from 'node:stream';
import { finished } from 'node:stream/promises';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';

import { renderToPipeableStream } from 'react-dom/server';
import { matchRoutes, StaticRouter } from 'react-router-dom';

import { App } from './app/App';
import { createQueryClient } from './app/AppQueryClient/AppQueryClient';
import { routeDefinitions } from './app/AppRoutes/routeDefinitions';

type RenderResult = {
  markup: string;
  dehydratedState: DehydratedState;
};

export const renderPage = async (url: string): Promise<RenderResult> => {
  const queryClient = createQueryClient();

  try {
    const matches = matchRoutes(routeDefinitions, url) ?? [];

    await Promise.all(matches.map(({ route }) => route.preload?.(queryClient)));

    const dehydratedState = dehydrate(queryClient);

    const chunks: Buffer[] = [];
    const stream = new PassThrough();
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));

    const completed = finished(stream);
    const fail = (error: unknown) => {
      stream.destroy(error instanceof Error ? error : new Error(String(error)));
    };

    let renderError: unknown;
    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App queryClient={queryClient} dehydratedState={dehydratedState} />
      </StaticRouter>,
      {
        onAllReady() {
          if (renderError) {
            fail(renderError);
            return;
          }
          pipe(stream);
        },

        onShellError: fail,

        onError(error) {
          renderError = error;
        },
      },
    );

    const timeout = setTimeout(() => {
      fail(new Error('SSR rendering timeout'));
      abort();
    }, 10_000);
    timeout.unref();

    try {
      await completed;
    } finally {
      clearTimeout(timeout);
    }

    return {
      markup: Buffer.concat(chunks).toString('utf8'),
      dehydratedState,
    };
  } finally {
    queryClient.clear();
  }
};
