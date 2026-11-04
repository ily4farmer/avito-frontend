import { Link } from 'react-router-dom';
import { AboutGetList } from '../../api/about/about.query';

export const About = () => {
  const { data, isError, isFetched, error } = AboutGetList();

  console.log({ data, isError, isFetched, error });

  return (
    <div>
      About
      <Link to="/">Back to Main</Link>
    </div>
  );
};
