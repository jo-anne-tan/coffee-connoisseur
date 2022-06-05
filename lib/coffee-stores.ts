import { CoffeeStore } from "../data/coffee_store";
import { createApi } from "unsplash-js";

// init unsplash
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getlistOfCoffeeStorePhotos = async () => {
  const unsplashResponse = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 10,
  });

  const unsplashResults = unsplashResponse.response.results;
  const images = unsplashResults.map((result) => result.urls["small"]);
  return images;
};
const getUrlForCoffeeStores = (
  query: string,
  latlong: string,
  limit: string
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};
export const fetchCoffeeStores = async (): Promise<CoffeeStore[]> => {
  const photos = await getlistOfCoffeeStorePhotos();
  const response = await fetch(
    getUrlForCoffeeStores(
      "coffee",
      "3.145166753749924,101.70840200741333",
      "6"
    ),
    {
      method: "GET",
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY,
      },
    }
  );
  const json = await response.json();
  const data = json.results.map((results, index) => ({
    ...results,
    image: photos[index],
  }));
  return data;
};
