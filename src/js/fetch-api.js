import debounce from 'lodash.debounce';
import sampleCard from '../templates/markup-card.hbs';

import { error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

import NewsApiService from './apiService.js';
import getRefs from './refs.js';
import setLightbox from './lightbox.js';

const newsApiService = new NewsApiService();
const refs = getRefs();

let form = '';

refs.cardContainer.addEventListener('click', setLightbox);

refs.input.addEventListener('input', debounce(toSearch, 500));

function toSearch(e) {
  e.preventDefault();

  clearGalleryContainer();

  form = e.target.value;
  let newForm = form.trim();

  const inputValue = newForm;

  const str = new RegExp('[a-zA-Z]');

  console.log(inputValue);

  if (!str.test(inputValue) || inputValue === '') {
    return error({
      text: 'Enter something!',
    });
  }

  newsApiService.query = inputValue;

  newsApiService.resetPage();

  newsApiService
    .fetchApi()
    .then(response => {
      renderCard(response);
    })
    .catch(err => console.log(err));
}

function renderCard(query) {
  const markup = sampleCard(query);
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
  observer.observe(refs.sentinel);
}

function renderMore() {
  newsApiService
    .fetchApi()
    .then(renderCard)
    .catch(err => console.log(err));
}

function clearGalleryContainer() {
  refs.cardContainer.innerHTML = '';
  observer.unobserve(refs.sentinel);
}

const onEntry = entries => {
  entries.forEach(entr => {
    if (entr.isIntersecting && newsApiService.query !== '') {
      renderMore();
    }
  });
};

const options = {
  rootMargin: '250px',
};

const observer = new IntersectionObserver(onEntry, options);