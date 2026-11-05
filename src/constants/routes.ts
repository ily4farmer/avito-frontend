export const RouteId = {
  main: 'main',
  about: 'about',
  notFound: 'notFound',
} as const;

export type RouteId = (typeof RouteId)[keyof typeof RouteId];

export const RouteUrl = {
  [RouteId.main]: '/',
  [RouteId.about]: '/about',
  [RouteId.notFound]: '/not-found',
} as const satisfies Record<RouteId, string>;

export const AppRoutePaths = Object.values(RouteUrl).map(path => ({
  path,
}));
