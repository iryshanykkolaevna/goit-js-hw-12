import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

iziToast.settings({
  position: "topRight",
  timeout: 5000,
  resetOnHover: true,
  transitionIn: "flipInX",
  transitionOut: "flipOutX"
});

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const API_KEY = "41671607-e33db59ab0332d081087354c8";
const API_URL = "https://pixabay.com/api/?";

const reqParams = {
  key: API_KEY,
  orientation: "horizontal",
  image_type: "photo",
  safesearch: true,
  per_page: 40,
  page: 1,
  q: ""
};

const form = document.querySelector(".search-form");
const loader = document.querySelector("div[data-loader='search']");
const gallery = document.querySelector(".gallery");
const btnLoadMore = document.querySelector("button[data-pagination]");
const loaderLoadMore = document.querySelector("div[data-loader='pagination']");
const btnGoUp = document.querySelector("button[data-goup]");

form.addEventListener("submit", onSearch);
btnLoadMore.addEventListener("click", onPagination);
btnGoUp.addEventListener("click", () => window.scrollTo({top:  0, behavior: 'smooth'}));

function onSearch(e) {
  e.preventDefault();

  const searchStr = form.elements.searchStr.value.trim();
  form.reset();

  if (!searchStr) {
    iziToast.error({ message: "Search field cannot be empty!" });
    return;
  }

  gallery.innerHTML = "";
  loader.style.display = "block";
  btnLoadMore.style.display = "none";
  btnGoUp.style.display = "none";

  reqParams.q = searchStr;
  reqParams.page = 1;
  performAPI(reqParams)
}

function onPagination() {
  loaderLoadMore.style.display = "block";
  performAPI(reqParams);
}

async function performAPI(params) {
  try {
    const images = await axios.get(API_URL, { params })
          .then(({ data }) => data);

    if (images.hits.length == 0) {
      iziToast.warning({ message: "Sorry, there are no images matching<br> your search query.Please try again!" });
      return;
    }
    updateGalleryMarkup(images.hits);
    performPagination(images.totalHits);

  } catch (error) {
    iziToast.error({ message: `Api request error: ${error}` })

  } finally {
    loader.style.display = "none";
    loaderLoadMore.style.display = "none";
  }
}

function performPagination(imgCount) {
  if (imgCount <= reqParams.per_page * reqParams.page) {
    btnLoadMore.style.display = "none";
    btnGoUp.style.display = "block";
    iziToast.warning({ message: "We're sorry, but you've reached the end of search results." });

  } else {
    reqParams.page += 1;
    btnLoadMore.style.display = "block";
  }

  if (reqParams.page > 2) {
    const elHeight = gallery.children[0].getBoundingClientRect().height;
    window.scrollBy({ left:0, top: elHeight * 2 + 12, behavior: 'smooth'});
  }
}

function updateGalleryMarkup(images) {
  gallery.insertAdjacentHTML("beforeend", images.map(fillGalleryCard).join(""));
  lightbox.refresh();
}

const fillGalleryCard = ({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <div class="item-wrap">
          <div class="image-wrap">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </div>
          <ul class="metabox-list">
            <li class="mbox-info">
              <p class="mbox-info-title">Likes</p>
              <span class="mbox-info-descr">${likes}</span>
            </li>
            <li class="mbox-info">
              <p class="mbox-info-title">Views</p>
              <span class="mbox-info-descr">${views}</span>
            </li>
            <li class="mbox-info">
              <p class="mbox-info-title">Comments</p>
              <span class="mbox-info-descr">${comments}</span>
            </li>
            <li class="mbox-info">
              <p class="mbox-info-title">Downloads</p>
              <span class="mbox-info-descr">${downloads}</span>
            </li>
          </ul>
        </div>
      </a>
    </li>`;
};