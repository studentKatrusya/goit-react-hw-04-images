import { Component } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import Api from 'services/serviceApi';
import ErrorMessage from './ErrorMessage';
// import { ToastContainer } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: Status.IDLE,
    page: 1,
    error: '',
    bigImage: '',
    showModal: false,
    totalHits: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;
    const nextImages = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImages !== nextImages) {
      this.setState({
        status: Status.PENDING,
        page: 1,
        images: [],
      });
      this.fetchGallery(nextImages, nextPage);
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchGallery(nextImages, nextPage);
    }
    if (nextPage >= 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchGallery(nextImages, nextPage) {
    Api.fetchGallery(nextImages, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            prevState,
            images: [...prevState.images, ...data.hits],
            status: Status.RESOLVED,
            searchQuery: nextImages,
            totalHits: data.totalHits,
          };
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal, bigImage }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, bigImage, status, totalHits } = this.state;

    if (status === Status.IDLE) {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </>
      );
    }
    if (status === Status.PENDING) {
      return <Loader />;
    }

    if (status === Status.REJECTED) {
      return <ErrorMessage />;
    }

    if (status === Status.RESOLVED) {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} toggleModal={this.toggleModal} />

          {this.state.showModal && (
            <Modal onClickModal={this.toggleModal} image={bigImage} />
          )}
          {/* {images.length >= 12 && <Button onClick={this.handleLoadMore} />} */}
          {images.length !== totalHits && (
            <Button onClick={this.handleLoadMore} />
          )}
        </div>
      );
    }
  }
}

// {/* <ImageGallery
//       images={images}
//       toggleModal={largeImageURL => this.toggleModal(largeImageURL)}
//     />} */}
// <Searchbar onSubmit={this.handleFormSubmit} />
// <ImageGallery
//   images={images}
//   toggleModal={largeImageURL => this.toggleModal(largeImageURL)}
// />

// {
//   this.state.images.length !== 0 && (
//     <Button onClick={() => this.handleLoadMore()} />)
// }
// {this.state.status === Status.PENDING && <Loader />}
// {
//   this.state.showModal && (
//     <Modal
//       onClick={() => {
//         this.toggleModal();
//       }}
//       image={bigImage}
//       closeModal={this.closeModal}
//     />)
// }
