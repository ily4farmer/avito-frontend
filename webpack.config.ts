import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Configuration } from 'webpack';
import { devConfig, prodConfig } from './config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_env: unknown, argv: { mode?: string }): Configuration => {
  const paths = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    build: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, './public/index.html'),
  };

  if (argv.mode === 'development') {
    return devConfig({
      paths,
      port: 3000,
      mode: 'development',
    });
  }

  if (argv.mode === 'production') {
    return prodConfig({
      paths,
      mode: 'production',
    });
  }

  throw new Error('Production configuration is not implemented yet');
};
