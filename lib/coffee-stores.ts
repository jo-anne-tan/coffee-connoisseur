import { CoffeeStore } from "../data/coffee_store";

const getUrlForCoffeeStores = (
  query: string,
  latlong: string,
  limit: string
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};
export const fetchCoffeeStores = async (): Promise<CoffeeStore[]> => {
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
  const data = json.results;
  return data;
};
