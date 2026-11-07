export const RouteId = {
  main: 'main',
  about: 'about',
  notFound: 'notFound',
} as const;

export type RouteIdKeys = keyof typeof RouteId;

export const RouteUrl: Record<RouteIdKeys, string> = {
  [RouteId.main]: '/',
  [RouteId.about]: '/about',
  [RouteId.notFound]: '/not-found',
};
