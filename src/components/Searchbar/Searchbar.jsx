import { useState, memo} from "react";

import { PropTypes } from "prop-types";

import styles from './Searchbar.module.css'

const Searchbar = ({ onSubmit }) => { 
    const [q, setQ] = useState('')

    const handleChange = ({target}) => {
    const { value } = target;
      setQ(value );
    };

    const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ q });
        
    reset();
    };

    const reset = () => {
    setQ('')
    }
    return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.SearchFormButton}>
                <span className={styles.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                className={styles.SearchFormInput}
                value = {q}
                type="text"
                name = 'q'
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
                required
                />
            </form>
        </header>
    )
}

export default memo(Searchbar)

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};