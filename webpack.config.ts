import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Configuration } from 'webpack';

import { devConfig, prodConfig, serverDevConfig, serverProdConfig } from './config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type BuildTarget = 'client' | 'server';

type BuildMode = 'development' | 'production';

type WebpackEnvironment = {
  target?: BuildTarget;
};

type WebpackArguments = {
  mode?: string;
};

export default (env: WebpackEnvironment, argv: WebpackArguments): Configuration => {
  const target = env.target ?? 'client';
  const mode = argv.mode;

  if (mode !== 'development' && mode !== 'production') {
    throw new Error(`Unsupported webpack mode: ${mode}`);
  }

  // Клиентская production-сборка.
  const clientPaths = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    build: path.resolve(__dirname, 'dist/client'),
    html: path.resolve(__dirname, 'index.html'),
  };

  // Клиентская development-сборка.
  const clientDevPaths = {
    ...clientPaths,
    build: path.resolve(__dirname, 'dist/client-dev'),
  };

  // Серверная production-сборка.
  const serverPaths = {
    ...clientPaths,
    entry: path.resolve(__dirname, 'server/index.ts'),
    build: path.resolve(__dirname, 'dist/server'),
  };

  // Серверная development-сборка.
  const serverDevPaths = {
    ...serverPaths,
    build: path.resolve(__dirname, 'dist/server-dev'),
  };

  const configurations: Record<BuildTarget, Record<BuildMode, () => Configuration>> = {
    client: {
      development: () =>
        devConfig({
          paths: clientDevPaths,
          port: 3000,
          mode: 'development',
        }),

      production: () =>
        prodConfig({
          paths: clientPaths,
          mode: 'production',
        }),
    },

    server: {
      development: () =>
        serverDevConfig({
          paths: serverDevPaths,
        }),

      production: () =>
        serverProdConfig({
          paths: serverPaths,
        }),
    },
  };

  return configurations[target][mode]();
};
