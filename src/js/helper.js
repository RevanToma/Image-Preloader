import { UNSPLASH_URL_BACKGROUND_IMG, unsplashParams } from "./config.js";

export const getImages = () =>
  axios.get(UNSPLASH_URL_BACKGROUND_IMG, unsplashParams);

export const handleErrors = (error) => {
  if (error.response) {
    console.log(
      `Your request was made but the server responded with a failed status code! (${error.response.status})`
    );
  } else if (error.request) {
    console.log("Your request was made but no response was received!");
  } else {
    console.log(
      "Something happened in setting up the request that triggered an Error!"
    );
  }
};

export function displayModal() {
  const modal = document.querySelector("#myModal");
  modal.style.display = "block";
}
export function closeModal() {
  const modal = document.querySelector("#myModal");
  const close = document.querySelector(".close");

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

export function renderModal(img, parent) {
  let markup = `
  <div id="myModal" class="modal">   
   <div class="imgContainer">
    <img src="${img.src}" class="modal-content">
     <p id="caption">${img.alt}</p>
   <span class="close">&times;</span>     
      </div>
</div>   
  `;
  parent.insertAdjacentHTML("afterend", markup);
}
