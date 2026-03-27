import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions.js";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
    e.preventDefault();

    query = e.target.elements["search-text"].value.trim();

    if (!query) {
        iziToast.error({
            message: "Please enter a search query!",
        });
        return;
    }

    page = 1;
    clearGallery();
    showLoader();

    try {
        hideLoadMoreButton();
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
            })
            return;
        }

        createGallery(data.hits);

        // 
        const totalPages = Math.ceil(totalHits / 15);

        if (page < totalPages) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }  
        
    } catch (error) {
        iziToast.error({
            message: "Something went wrong. Try again!",
        });

    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    try {
        showLoader();
        hideLoadMoreButton();

        const data = await getImagesByQuery(query, page);

        createGallery(data.hits);

        const totalPages = Math.ceil(totalHits / 15);

        if (page >= totalPages) {
            hideLoadMoreButton();

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            showLoadMoreButton(); 
        }

        // скрол
        const card = document.querySelector('.gallery a');
        const rect = card.getBoundingClientRect();

        window.scrollBy({
            top: rect.height * 2,
            behavior: 'smooth',
        });

    } catch (error) {
        iziToast.error({
            message: 'Error loading more images',
        });
    } finally {
        hideLoader();
    }
});