export const RouteId = {
  main: 'main',
  about: 'about',
  notFound: 'notFound',
} as const;

export const RouteUrl: Record<string, string> = {
  [RouteId.main]: '/',
  [RouteId.about]: '/about',
  [RouteId.notFound]: '/not-found',
};
