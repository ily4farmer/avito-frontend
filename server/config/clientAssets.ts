import path from 'node:path';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const clientDirectory = path.resolve(
  __dirname,
  isDevelopment ? '../client-dev' : '../client',
);

export const clientManifestPath = path.join(clientDirectory, 'manifest.json');
