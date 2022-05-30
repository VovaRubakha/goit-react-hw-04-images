import { Component } from "react";

import { PropTypes } from "prop-types";

import styles from './Searchbar.module.css'

class Searchbar extends Component {
    state = {
        q: "",
    }
    handleChange = ({target}) => {
      const { name, value } = target;
  
      this.setState({ [name]: value });
    };

    handleSubmit = e => {
    e.preventDefault();
    const { q } = this.state;

    this.props.onSubmit({q});
    this.reset();
    };

    reset() {
        this.setState({
            q: ""
        })
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { q } = this.state;
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
}

export default Searchbar

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};