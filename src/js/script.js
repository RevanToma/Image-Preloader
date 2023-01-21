import {
  getImages,
  handleErrors,
  displayModal,
  renderModal,
  closeModal,
} from "./helper.js";

const titleContainer = document.querySelector(".title-container");
const loadingContainer = document.querySelector(".loadingContainer");
const mainContainer = document.querySelector(".main-container");

if (module.hot) {
  module.hot.accept();
}
const loadImages = async () => {
  try {
    const { data } = await getImages();

    let markup = "";

    const allPromises = await data.map((img) => {
      return new Promise((resolve, reject) => {
        const url = img.urls.regular;
        const authorLink = img.user.links.html;
        const { alt_description: alt } = img;
        const { name } = img.user;
        const imgEl = new Image();

        imgEl.src = url;
        imgEl.alt = alt;

        imgEl.onload = () => resolve(imgEl);
        imgEl.onerror = () => reject();

        markup += `
            <div class="imageContainer">
                ${imgEl.outerHTML}
                    <div class="authorContainer">
                    <a target="_blank" href="${authorLink}" class="author"> Photo By: ${name} </a>
                </div>
            </div>
            `;
      });
    });
    await Promise.all(allPromises);
    titleContainer.insertAdjacentHTML("afterend", markup);

    loadingContainer.classList.add("hidden");
    mainContainer.style.opacity = 1;
  } catch (error) {
    handleErrors(error);
  }
};
loadImages();

mainContainer.addEventListener("click", (e) => {
  const img = e.target.closest("img");
  if (!img) return;

  // render the modal markup
  renderModal(img, mainContainer);

  //display the modal
  displayModal();

  // close modal when X is clicked
  closeModal();
});
