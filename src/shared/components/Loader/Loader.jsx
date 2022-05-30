import { RotatingLines } from 'react-loader-spinner'
import styles from './Loader.module.css';

const Loader = () => {
  return (
      <div className={styles.Loader} >
          <RotatingLines width="50" />
      </div>
  );
};

export default Loader;