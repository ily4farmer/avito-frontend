export const RouteId = {
  main: 'main',
  about: 'about',
  notFound: 'notFound',
  todo: 'todo',
} as const;

export type RouteIdKeys = keyof typeof RouteId;

export const RouteUrl: Record<RouteIdKeys, string> = {
  [RouteId.main]: '/',
  [RouteId.about]: '/about',
  [RouteId.todo]: '/todo',
  [RouteId.notFound]: '/not-found',
};
