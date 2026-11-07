# React SSR Boilerplate

React 19, React Router 7, TanStack Query, Zustand, Webpack 5, SWC and Express 5.
The server renders HTML; the browser hydrates the existing markup.

## Requirements

- Node.js 22+
- pnpm 12

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. `pnpm dev` watches both client and server bundles
and restarts the Express process after server changes. Refresh the browser
manually after client changes; this setup deliberately does not enable HMR.

## Production

```sh
pnpm build
pnpm start
```

The client bundle is written to `dist/client`, and the server bundle to
`dist/server`. Express reads the client asset manifest and injects the current
JS and CSS filenames into SSR HTML. Use the `PORT` environment variable to
change the listening port (default: 3000).

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm test
```

`pnpm test` builds the project and runs an HTTP smoke test for the SSR server.
It does not replace browser-level hydration tests.

## Docker

```sh
docker build -t react-ssr-boilerplate .
docker run --rm -p 3000:3000 react-ssr-boilerplate
```

## Adding routes

Add a lazy component and a route in `src/app/AppRoutes/routeDefinitions.ts`.
The same route list is used for browser rendering, server HTTP statuses and
optional server data preloading. Route preloads can propagate critical errors
or handle optional errors locally.

The example on `/` fetches a public demo post. Replace it with your own data
source when starting a real application.
