// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery-item">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" />
  </a>
  <div class="info">
  <p><span class="label">Likes</span><span>${likes}</span></p>
  <p><span class="label">Views</span><span>${views}</span></p>
  <p><span class="label">Comments</span><span>${comments}</span></p>
  <p><span class="label">Downloads</span><span>${downloads}</span></p>
</div>
</li>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.remove("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add('visible');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('visible');
}