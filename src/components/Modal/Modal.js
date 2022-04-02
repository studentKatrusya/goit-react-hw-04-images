import { Overley, Container } from './Modal.styled';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClickModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClickModal();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <Overley onClick={this.handleBackdropClick}>
        <Container>
          <img src={image} alt={image.tags} />
        </Container>
      </Overley>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
