import { Link } from 'react-router-dom';
import { useAboutGetList } from '../../api/about/about.query';

export const About = () => {
  const { data, isError, isFetched, error } = useAboutGetList();

  console.log({ data, isError, isFetched, error });

  return (
    <div>
      About
      <Link to="/">Back to Main</Link>
    </div>
  );
};
