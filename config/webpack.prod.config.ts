import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import type { BuildOptions } from './types';

export const prodConfig = ({ paths, mode = 'production' }: BuildOptions): webpack.Configuration => {
  return {
    name: 'client-production',

    mode,

    target: 'web',

    devtool: false,

    entry: {
      app: paths.entry,
    },

    output: {
      path: paths.build,

      filename: 'js/[name].[contenthash:8].js',

      chunkFilename: 'js/[name].[contenthash:8].js',

      publicPath: '/',

      clean: true,
    },

    plugins: [
      new webpack.ManifestPlugin({
        filename: 'manifest.json',

        entrypoints: true,
      }),

      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',

        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    ],

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
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,

          type: 'asset',
        },

        {
          test: /\.css$/i,

          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
  };
};
