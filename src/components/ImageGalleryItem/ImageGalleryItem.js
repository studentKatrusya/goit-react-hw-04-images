import { Image, Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onClickItem,
}) => {
  return (
    <Item key={id}>
      <Image
        alt={tags}
        src={webformatURL}
        data-source={largeImageURL}
        onClick={onClickItem}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickItem: PropTypes.func,
};

export default ImageGalleryItem;
