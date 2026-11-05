import { useQuery } from '@tanstack/react-query';
import { demoPostQueryOptions } from '../../services/demoPost';

export const DemoPost = () => {
  const { data, isPending, isError, error } = useQuery(demoPostQueryOptions);

  if (isPending) {
    return <div>Загрузка данных...</div>;
  }

  if (isError) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </article>
  );
};
