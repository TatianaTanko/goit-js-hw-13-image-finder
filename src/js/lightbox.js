import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function setLightbox(e) {
  let escBtn = '';
  if (event.target.localName === 'img') {
    const imgListSrc = e.target.getAttribute('data-src');
    const altImg = e.target.getAttribute('alt');
    const instance = basicLightbox.create(`<img src=${imgListSrc} alt="${altImg}" width="1080">`, {
      onClose: () => {
        document.body.classList.remove('is-open');
      },
    });
    instance.show(document.body.classList.add('is-open'));
    escBtn = window.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        instance.close();
      }
    });
  }
  window.removeEventListener('keyup', escBtn);
}