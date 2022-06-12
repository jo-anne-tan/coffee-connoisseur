import { CoffeeStore, CoffeeStoreAirtable } from "../data/coffee_store";
import { createApi } from "unsplash-js";

// init unsplash
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ?? "",
});

const getlistOfCoffeeStorePhotos = async (limit: number) => {
  const unsplashResponse = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: limit,
  });

  const unsplashResults = unsplashResponse.response?.results;
  const images = unsplashResults?.map((result) => result.urls["small"]) ?? [];
  return images;
};
const getUrlForCoffeeStores = (
  query: string,
  latlong: string,
  limit: string
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};
export const fetchCoffeeStores = async (
  latlong: string = "3.145166753749924,101.70840200741333",
  limit: string = "12"
): Promise<CoffeeStoreAirtable[]> => {
  const photos = await getlistOfCoffeeStorePhotos(Number(limit));
  const headers = new Headers({
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ?? "",
  });
  const response = await fetch(
    getUrlForCoffeeStores("coffee", latlong, limit),
    {
      method: "GET",
      headers,
    }
  );
  const json = await response.json();
  const data: CoffeeStore[] = json.results.map(
    (results: CoffeeStore, index: number) => ({
      ...results,
      image: photos[index],
    })
  );

  if (data && data.length > 0) {
    const stores: CoffeeStoreAirtable[] = data.map((d: CoffeeStore) =>
      CoffeeStoreAirtableFormatter(d)
    );
    return stores;
  } else return [];
};

export const CoffeeStoreAirtableFormatter = (
  coffeeStore: CoffeeStore
): CoffeeStoreAirtable => {
  return {
    id: coffeeStore.fsq_id,
    name: coffeeStore.name,
    address: coffeeStore.location?.formatted_address,
    neighbourhood:
      coffeeStore.location?.neighborhood?.length > 0
        ? coffeeStore.location.neighborhood[0]
        : "",
    voting: 0,
    image_url: coffeeStore.image ?? "",
    recordId: "",
  };
};
