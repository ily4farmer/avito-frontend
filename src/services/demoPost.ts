import { queryOptions } from '@tanstack/react-query';

export type DemoPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const API_URL = 'https://jsonplaceholder.typicode.com';

const REQUEST_TIMEOUT = 8_000;

export const getDemoPost = async (signal: AbortSignal): Promise<DemoPost> => {
  const requestSignal = AbortSignal.any([signal, AbortSignal.timeout(REQUEST_TIMEOUT)]);

  const response = await fetch(`${API_URL}/posts/1`, {
    signal: requestSignal,
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return (await response.json()) as DemoPost;
};

export const demoPostQueryOptions = queryOptions({
  queryKey: ['demo-post', 1],

  queryFn: ({ signal }) => getDemoPost(signal),

  staleTime: 60_000,

  retry: false,
});
