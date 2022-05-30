import { useState, useEffect } from 'react';
import styles from './App.module.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'shared/components/Button/Button';
import Modal from 'shared/components/Modal';
import Loader from 'shared/components/Loader';

import { getImages } from 'shared/services/images';

const App = () => {
  const [state, setState] = useState({
    items: [],
    loading: false,
    error: null,
  });
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalData: '',
  });

  useEffect(() => {
    const fetchImages = async () => {
      if (!q) {
        return
      };
      setState(prevState => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      try {
        const items = await getImages(q, page)
        setState(prevState => {
          return {
            ...prevState,
            items: [...prevState.items, ...items],
            loading: false,
          }
        })
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    }
    fetchImages()
  }, [q, page])

  const setSearch = ({ q }) => {
    setQ(q);
    setPage(1);
    setState({
    ...state,
    items: [],
    })
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  };
  
  const showModal = (modalData) => {
    setModal({
      isModalOpen: true,
      modalData,
    });
  };

  const closeModal = () => {
    setModal({
      isModalOpen: false,
    });
  };

  const { loading, items } = state;
  const { isModalOpen, modalData } = modal;
  return (
    <div className={styles.App}>
        
      <Searchbar onSubmit={setSearch} />
      {Boolean(items.length) &&
        <ImageGallery items={items} onClick={showModal} />
      }
      {loading && <Loader />}
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


export default App