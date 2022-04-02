import { Error } from './ErrorMessage.styled';
import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return <Error>{message}</Error>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
