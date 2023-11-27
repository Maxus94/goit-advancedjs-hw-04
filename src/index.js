import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;
let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 50,
});

form.addEventListener('submit', searchButtonHandler);
loadMoreButton.addEventListener('click', loadMoreHandler);

async function loadMoreHandler() {
  page += 1;
  iziToast.destroy();
  try {
    const data = await servicePictures(page);
    if ((page + 1) * 40 >= data.data.totalHits) {
      loadMoreButton.classList.add('hidden');
    }
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
    gallerySimpleLightbox.refresh();
  } catch {
    iziToast.show({
      title: 'Error',
      message: `Something goes wrong, please try reload page.`,
      close: false,
      backgroundColor: 'red',
      messageColor: 'white',
      messageSize: 20,
      timeout: 0,
      position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    });
  }
}

async function searchButtonHandler(event) {
  event.preventDefault();
  iziToast.destroy();
  gallery.innerHTML = '';
  loadMoreButton.classList.add('hidden');
  try {
    const data = await servicePictures();
    if (Array.from(data.data.hits).length === 0) {
      iziToast.show({
        title: 'Error',
        message: `Sorry, there are no images matching your search query. Please try again.`,
        close: false,
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: 20,
        timeout: 0,
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
    } else if (Array.from(data.data.hits).length < 40) {      
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
      gallerySimpleLightbox.refresh();
      iziToast.show({
        //title: 'Error',
        message: `Hooray! We found ${data.data.totalHits} images.`,
        close: false,
        backgroundColor: 'green',
        messageColor: 'white',
        messageSize: 20,
        timeout: 5000,
        position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
    }else{
      loadMoreButton.classList.remove('hidden');
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
      gallerySimpleLightbox.refresh();
      iziToast.show({
        //title: 'Error',
        message: `Hooray! We found ${data.data.totalHits} images.`,
        close: false,
        backgroundColor: 'green',
        messageColor: 'white',
        messageSize: 20,
        timeout: 5000,
        position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
    }
  } catch {
    iziToast.show({
      //title: 'Error',
      message: `Something goes wrong, please try reload page.`,
      close: false,
      backgroundColor: 'red',
      messageColor: 'white',
      messageSize: 20,
      timeout: 0,
      position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    });
  }
}

async function servicePictures(page = 1) {
  const optionsAxios = {
    params: {
      key: '40858721-2ab2962236a746e97c71283b6',
      q: input.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    },
  };
  const pictures = await axios.get('https://pixabay.com/api/', optionsAxios);
  return pictures;
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) =>
        `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
      <img class="item-image" src="${webformatURL}" alt="${tags}" width="400" height="240" loading="lazy" />
      </a>
      <div class="info"><p class="info-item"><b>Likes</b><br>${likes}</p>
      <p class="info-item"><b>Views</b><br>${views}</p>
      <p class="info-item"><b>Comments</b><br>${comments}</p>
      <p class="info-item"><b>Downloads</b><br>${downloads}</p></div></div>`
    )
    .join('');
}




























// function searchButtonHandler(event) {
//   event.preventDefault();
//   iziToast.destroy();
//   servicePictures().then(data => {
//     console.log(Array.from(data.data.hits).length);
//     if (Array.from(data.data.hits).length === 0) {
//       gallery.innerHTML='';
//       iziToast.show({
//         //title: 'Error',
//         message: `Sorry, there are no images matching your search query. Please try again.`,
//         close: false,
//         backgroundColor: 'red',
//         messageColor: 'white',
//         messageSize: 20,
//         timeout: 0,
//         position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
//       });
//     } else {
//       loadMoreButton.classList.remove('hidden');
//       gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
//       gallerySimpleLightbox.refresh();
//       console.log(gallerySimpleLightbox);
//     }
//   });
// }

// function loadMoreHandler() {
//   page += 1;
//   servicePictures(page).then(data => {
//     console.log(page * 40, data.data.totalHits);
//     if ((page + 1) * 40 >= data.data.totalHits) {
//       loadMoreButton.classList.add('hidden');
//     }
//     gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
//     gallerySimpleLightbox.refresh();
//     console.log(gallerySimpleLightbox);
//   });
// }
