import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { pixabayAPI } from './js/FetchPixabay';
import { createGallery } from './js/Gallery';


const input = document.querySelector('.search-form-input');
const gallery = document.querySelector('.gallery');
const btnSearch = document.querySelector('.search-form-button');
const btnLoad = document.querySelector('.load-more');


let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let page = 0;
let perPage = 40;
let searchInput = input.value.trim();

btnLoad.style.display = "none";

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  page = 1;
    searchInput = input.value.trim();
    // refs.btnSearch.classList.add('is-hidden');
  if (!searchInput) {
    clearPage();
    return;
  } else {
      pixabayAPI(searchInput, page, perPage)
          .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        clearPage();
        return;
      } else {
        createGallery(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        gallerySimpleLightbox.refresh();
        btnLoad.style.display = "";
        
          
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * -1,
          behavior: 'smooth',
        });
      }
    })
    .catch(error => console.log(error))
  }
});

btnLoad.addEventListener('click', () => {
    page += 1
    searchInput = input.value.trim();
    pixabayAPI(searchInput, page, perPage)
        .then(data => {
            createGallery(data.hits);
            gallerySimpleLightbox.refresh();
            if (page >= (data.totalHits / perPage)) {
              Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
              );
            }
      })
      .catch(error => console.log(error));
});

function clearPage() {
  gallery.innerHTML = '';
  btnLoad.style.display = 'none';
}
