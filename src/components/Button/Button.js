import { BtnLoadMore } from './Button.styled';
// import PropTypes from 'prop-typs';

function Button({ onClick }) {
  return (
    <BtnLoadMore type="buton" onClick={onClick}>
      Load more
    </BtnLoadMore>
  );
}

// Button.propTypes = {
//   onClick: PropTypes.func,
// };
export default Button;
