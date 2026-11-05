import { Link } from 'react-router-dom';
import { DemoPost } from '../../components/DemoPost/DemoPost';
import { useMainStore } from '../../store';

export const Main = () => {
  const { count, setCount } = useMainStore();

  return (
    <div>
      Main
      <div>
        <span>{count}</span>
        <button onClick={setCount}>add</button>
      </div>
      <DemoPost />
      <Link to="/about">Back to About</Link>
    </div>
  );
};
