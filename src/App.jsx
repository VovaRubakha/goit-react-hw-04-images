import { Component } from 'react';
import styles from './App.module.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'shared/components/Button/Button';
import Modal from 'shared/components/Modal';
import Loader from 'shared/components/Loader';

import { getImages } from 'shared/services/images';

class App extends Component {
  state = {
    q: "",
    items: [],
    loading: false,
    error: null,
    page: 1,
    isModalOpen: false,
    modalData: '',
  }

  async componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;
    if (q !== prevState.q || page > prevState.page) {
      this.setState({
        loading: true,
        error: null,
      });

      try {
        const items = await getImages(q, page)
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...items],
            loading: false,
          }
        })
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }
  }

  setSearch = ({q}) => {
    this.setState({
      q,
      items: [],
      page: 1,
    })
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      }
    })
  }
  
  showModal = modalData => {
    this.setState({
      isModalOpen: true,
      modalData,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { loading, items, isModalOpen, modalData } = this.state;
    const { setSearch, loadMore, showModal, closeModal} = this;
    return (
      <div className={styles.App}>
        
        <Searchbar onSubmit={setSearch} />
        {Boolean(items.length) &&
          <ImageGallery items={items} onClick={showModal}/>
        }
        {loading && <Loader/>}
        {!loading && Boolean(items.length) && (
          <Button text='Load more' loadMore={loadMore}></Button>
        )}
        {isModalOpen && (
          <Modal close={closeModal}>
            <img src={modalData} alt="Nothing to see here" />
          </Modal>
        )}
      </div>
    );
  }
};

export default App