import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import type { BuildOptions } from './types';

export const devConfig = ({
  paths,
  port,
  mode = 'development',
}: BuildOptions): webpack.Configuration => {
  return {
    mode: mode,
    entry: { app: paths.entry },
    output: {
      path: paths.build,
      filename: '[name].js',
      chunkFilename: '[name].js',
      clean: true,
    },
    devServer: {
      open: true,
      historyApiFallback: true,
      hot: true,
      port: port || 3000,
    } as DevServerConfiguration,
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.html,
        filename: 'index.html',
        inject: 'head',
      }),
      new ReactRefreshWebpackPlugin(),
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
                    refresh: true,
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  namedExport: false,
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
  };
};
