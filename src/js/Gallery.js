const gallery = document.querySelector('.gallery');

function createGallery(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
  <a href="${largeImageURL}"><img class="photo"  src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info_item">
      <b>Likes</b><span class="info_item-api">${likes}</span>
    </p>
    <p class="info_item">
      <b>Views</b><span class="info_item-api">${views}</span>
    </p>
    <p class="info_item">
      <b>Comments</b><span class="info_item-api">${comments}</span>
    </p>
    <p class="info_item">
      <b>Downloads</b><span class="info_item-api">${downloads}</span>
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export {createGallery}
