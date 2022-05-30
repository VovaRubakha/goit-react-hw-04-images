import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ text, loadMore }) => {
  return (
    <button className={styles.Button} onClick={loadMore} >
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};