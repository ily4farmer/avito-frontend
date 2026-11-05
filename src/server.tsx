import { PassThrough } from 'node:stream';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';

import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { App } from './app/App';
import { createQueryClient } from './app/AppQueryClient/AppQueryClient';

import { demoPostQueryOptions } from './services/demoPost';

type RenderResult = {
  markup: string;
  dehydratedState: DehydratedState;
};

export const renderPage = async (url: string): Promise<RenderResult> => {
  const queryClient = createQueryClient();

  try {
    // Загружаем публикацию только для главной страницы.
    if (url === '/') {
      await queryClient.prefetchQuery(demoPostQueryOptions);
    }

    // Получаем состояние кэша после загрузки данных.
    const dehydratedState = dehydrate(queryClient);

    const markup = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];

      let renderError: unknown;

      let timeout: ReturnType<typeof setTimeout> | undefined;

      const { pipe, abort } = renderToPipeableStream(
        <StaticRouter location={url}>
          <App queryClient={queryClient} dehydratedState={dehydratedState} />
        </StaticRouter>,
        {
          onAllReady() {
            if (renderError) {
              reject(renderError);
              return;
            }

            const stream = new PassThrough();

            stream.on('data', (chunk: Buffer) => {
              chunks.push(chunk);
            });

            stream.on('error', reject);

            stream.on('end', () => {
              resolve(Buffer.concat(chunks).toString('utf8'));
            });

            pipe(stream);
          },

          onError(error) {
            renderError = error;
          },
        },
      );

      timeout = setTimeout(() => {
        abort();
        reject(new Error('SSR rendering timeout'));
      }, 10_000);

      timeout.unref();

      // Очищаем таймер после завершения рендеринга.
      // finally выполняется и при ошибке.
    }).finally(() => {
      // Очистку таймера вынесем ниже в окончательном варианте.
    });

    return {
      markup,
      dehydratedState,
    };
  } finally {
    queryClient.clear();
  }
};
