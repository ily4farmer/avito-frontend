import type { Configuration } from 'webpack';

import type { BuildPaths } from './types';

type ServerProdOptions = {
  paths: BuildPaths;
};

export const serverProdConfig = ({ paths }: ServerProdOptions): Configuration => {
  return {
    name: 'server-production',

    mode: 'production',

    target: 'node',

    externals: {
      express: 'commonjs express',
    },

    entry: {
      server: paths.entry,
    },

    output: {
      path: paths.build,

      filename: 'server.cjs',

      chunkFilename: '[name].cjs',

      library: {
        type: 'commonjs2',
      },

      clean: true,
    },

    devtool: false,

    optimization: {
      minimize: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,

          exclude: /node_modules/,

          use: {
            loader: 'swc-loader',

            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },

                transform: {
                  react: {
                    runtime: 'automatic',
                    development: false,
                  },
                },

                target: 'es2022',
              },
            },
          },
        },

        {
          test: /\.css$/i,

          type: 'asset/source',
        },
      ],
    },
  };
};
