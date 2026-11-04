import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import type { BuildOptions } from './types';

export const prodConfig = ({ paths, mode = 'production' }: BuildOptions): webpack.Configuration => {
  return {
    mode: mode,
    target: 'web',
    devtool: 'source-map',
    entry: { app: paths.entry },
    output: {
      path: paths.build,
      filename: '[name].js',
      chunkFilename: '[name].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
        template: paths.html,
        filename: 'index.html',
        inject: 'head',
      }),
      new webpack.ProgressPlugin(),
      new CompressionPlugin({ algorithm: 'gzip' }),
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[name].[contenthash:8].css',
        filename: 'css/[name].[contenthash:8].css',
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
                    development: true,
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
          use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
        },

        // HTML, CSS need no loader — webpack supports them out of the box
        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
  };
};
