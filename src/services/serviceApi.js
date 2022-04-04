const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24753082-868cb2bb63826684a408e0cdf';

function fetchGallery(searchQuery, page) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then(response => {
    if (response.status === 404) {
      return Promise.reject('Oops, something went wrong');
    }
    return response.json();
  });
}

const Api = {
  fetchGallery,
};
export default Api;
