import { useQuery } from '@tanstack/react-query';
import { baseQuery } from '../baseQuery';

export const useAboutGetList = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: () =>
      baseQuery('https://swapi.online/api/filmfs', {
        method: 'GET',
      }),
    refetchOnMount: false,
  });
};
