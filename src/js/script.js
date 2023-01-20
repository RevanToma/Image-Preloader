import { getImages, handleErrors } from "./helper.js";

const titleContainer = document.querySelector(".title-container");
const loadingContainer = document.querySelector(".loadingContainer");
const mainContainer = document.querySelector(".main-container");

const loadImages = async () => {
  try {
    const { data } = await getImages();

    let markup = "";

    const allPromises = await data.map((img) => {
      return new Promise((resolve, reject) => {
        const url = img.urls.small;
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
const overlay = document.querySelector(".overlay");

mainContainer.addEventListener("click", (e) => {
  const img = e.target.closest("img");

  if (!img) return;

  renderModal(img, mainContainer);
  displayModal();

  // const modal = document.getElementById("myModal");
  // modal.style.display = "block";

  if (e.target.classList.contains(".modal")) modal.style.display = "none";
});
function displayModal() {
  const modal = document.querySelector("#myModal");
  modal.style.display = "block";
}
function renderModal(img, parent) {
  let markup = `
  <div id="myModal" class="modal">   
      <span class="close">&times;</span>     
      <img src="${img.src}" class="modal-content">   
    <div id="caption">${img.alt_description}</div>
</div>   
  `;
  parent.insertAdjacentHTML("beforeend", markup);
}
