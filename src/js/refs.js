export default function getRefs() {
    return {
      cardContainer: document.querySelector('.js-gallery-container'),
      searchForm: document.querySelector('.search-form'),
      input: document.querySelector('.form-control'),
      sentinel: document.querySelector('#observer'),
    };
  }