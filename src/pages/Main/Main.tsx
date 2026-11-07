import { Link } from 'react-router-dom';
import { navigationLabel } from '../../constants';
import { type RouteIdKeys, RouteUrl } from '../../constants/routes';
import { useMainStore } from '../../store';
import styles from './Main.module.css';

export const Main = () => {
  const { count, setCount } = useMainStore();

  return (
    <div className={styles.mainContent}>
      <h1>Main</h1>
      <div className={styles.mainCount}>
        <span>{count}</span>
        <button onClick={setCount}>add</button>
      </div>
      <div className={styles.mainLinkList}>
        {Object.keys(navigationLabel).map(el => (
          <Link to={RouteUrl[el as RouteIdKeys]} key={el}>
            {navigationLabel[el]}
          </Link>
        ))}
      </div>
    </div>
  );
};
