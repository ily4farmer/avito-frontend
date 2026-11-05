import type { Configuration } from 'webpack';

import type { BuildPaths } from './types';

type ServerDevOptions = {
  paths: BuildPaths;
};

export const serverDevConfig = ({ paths }: ServerDevOptions): Configuration => {
  return {
    name: 'server-development',

    mode: 'development',

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

    devtool: 'inline-source-map',

    optimization: {
      minimize: false,
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
                    development: true,
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
