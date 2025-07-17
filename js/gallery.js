const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

//!======================================================

const refs = {
  galleryElem: document.querySelector('.js-gallery'),
};

const galleryItemTemplate = item => {
  const { original, preview, description } = item;
  return `
  <li class="gallery-item">
    <a class="gallery-link" href="${original}">
      <img
        class="gallery-image js-gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
};

const galleryItemsTemplate = items => items.map(galleryItemTemplate).join('\n');

const markup = galleryItemsTemplate(images);

refs.galleryElem.innerHTML = markup;

//!======================================================

refs.galleryElem.addEventListener('click', handleGalleryElemClick);

function handleGalleryElemClick(e) {
  const isImgElem = e.target.classList.contains('js-gallery-image');

  if (!isImgElem) return;
  e.preventDefault();

  const {
    dataset: { source: largerImgLink },
    alt,
  } = e.target;

  console.log(largerImgLink);

  openModal({ largerImgLink, alt });
}

//!======================================================
function openModal({ largerImgLink, alt }) {
  const instance = basicLightbox.create(
    `
    <img src="${largerImgLink}" alt="${alt}" width="800" height="600">
  `,
    {
      onShow: () => {
        document.addEventListener('keydown', handleEscKeydown);
      },
      onClose: () => {
        document.removeEventListener('keydown', handleEscKeydown);
      },
    },
  );

  function handleEscKeydown(e) {
    if (e.key === 'Escape') {
      instance.close();
    }
  }

  instance.show();
}
