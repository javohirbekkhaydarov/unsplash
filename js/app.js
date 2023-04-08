const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const submit_btn = document.querySelector(".submit-btn");
// created photo
const auth = "zULWaFhbMP8qokTS_EkFuCmLqQyjUmioesXgZd9kQkI";

async function createdPhotos() {
  link = `https://api.unsplash.com/photos/?client_id=${auth}`;
  const data = await getPhotos(link);
  generatePhotos(data);
}

createdPhotos();
// get photos
function getPhotos(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Client-ID ${auth}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (searchInput.value) {
        generatePhotos(response.results);
      } else {
        generatePhotos(response);
      }
      return response;
    });
}

function generatePhotos(data) {
  data.map((photo) => {
    const images = document.createElement("div");
    images.classList.add("gallery");
    images.innerHTML = `
      <div class="gallery-item">        
        <img src="${photo.urls.small}" alt="${photo.alt_description}"></img>
            <div class="gallery-info">
            <div class="user-photo">
               <img src="${photo.user.profile_image.medium}" alt="user photo">
             </div>
             <p>${photo.user.name}</p>
              <a  href="https://unsplash.com/photos/${photo.id}/download?force=true" download="${photo.alt_description}">
            <i class="fas fa-arrow-down"></i>
            </a>
           </div>
         </div>
       `;
    gallery.append(images);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchInput.value);
});

submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  searchPhotos(searchInput.value);
});

// search  function
function searchPhotos(query) {
  clear();
  // <https://api.unsplash.com/search/photos?page=1&query=office>;
  link = `https://api.unsplash.com/search/photos?query=${query}&per_page=15&page=1`;
  const dataImg = getPhotos(link);
}

// clear function
function clear() {
  gallery.innerHTML = "";
  searchInput.innerHTML = "";
}
// when user scroll working this function

let page = 1;
function fetchMorePhotos() {
  page++;
  const fetchLink = `https://api.unsplash.com/photos/?page=${page}`;
  getPhotos(fetchLink).then((data) => {
    generatePhotos(data);
  });
}
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchMorePhotos();
  }
});
