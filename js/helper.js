import { UNSPLASH_URL_BACKGROUND_IMG, unsplashParams } from "./config.js";

export const getImages = () =>
  axios.get(UNSPLASH_URL_BACKGROUND_IMG, unsplashParams);

const handleErrors = (error) => {
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
