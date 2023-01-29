import axios from 'axios';

const KEY = '33208065-9a52ef14977563a31cd84c980';
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// orientation - орієнтація фотографії. Постав значення horizontal.
// safesearch - фільтр за віком. Постав значення true.

async function pixabayAPI(inputValue, page, perPage) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}

export { pixabayAPI };
