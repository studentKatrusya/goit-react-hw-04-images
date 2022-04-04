import { Overley, Container } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ image, onClickModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClickModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClickModal();
    }
  };

  // const { image } = this.props;
  return createPortal(
    <Overley onClick={handleBackdropClick}>
      <Container>
        <img src={image} alt={image.tags} />
      </Container>
    </Overley>,
    modalRoot
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Modal;
