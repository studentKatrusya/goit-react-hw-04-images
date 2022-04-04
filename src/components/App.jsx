import { useState, useEffect } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Searchbar from './Searchbar';
import Api from 'services/serviceApi';
import { Hearts } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);

    Api.fetchGallery(searchQuery, page)
      .then(newImages => {
        if (newImages.total === 0) {
          toast.warn('Nothing was found on your request');
        }
        if (newImages) {
          setImages([...images, ...newImages.hits]);
        }
        if (page > 1) {
          window.scrollTo({
            top: document.body.clientHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => toast.error('Oops, something went wrong'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const toggleModal = () => {
    setShowModal(!showModal);
    setLargeImg(largeImg);
  };

  const handleFormSubmit = data => {
    setSearchQuery(data);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Hearts color="#00BFFF" height={400} width={400} />}
      {images.length !== 0 && (
        <ImageGallery images={images} hanleToggleModal={toggleModal} />
      )}

      {images.length !== 0 && <Button onClick={handleLoadMore} />}
      {showModal && <Modal onClickModal={toggleModal} image={largeImg} />}
      <ToastContainer />
    </div>
  );
}

export default App;
