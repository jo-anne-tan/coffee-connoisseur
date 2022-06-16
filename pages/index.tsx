import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import { CoffeeStoreAirtable } from "../data/coffee_store";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/user-track-location";
import { StoreContext } from "../context/store-context";

type Props = {
  coffeeStores: CoffeeStoreAirtable[];
};

const Home: React.FC<Props> = ({ coffeeStores }) => {
  const { handleTrackLocation, locationErrorMessage, isFindingLocation } =
    useTrackLocation();

  const [fetchStoreError, setFetchStoreError] = useState<string>("");
  const { state, dispatch } = useContext(StoreContext);

  const fetchStores = async (latlong: string) => {
    try {
      setFetchStoreError("");
      const response = await fetch(
        `/api/getCoffeeStoresByLocation?latLong=${latlong}&limit=${30}`
      );

      const coffeeStores: CoffeeStoreAirtable[] = (await response.json())
        .coffeeStores;

      dispatch({
        type: "SET_COFFEE_STORES",
        payload: { coffeeStores },
      });
      setFetchStoreError("");
    } catch (error: any) {
      console.error(error);
      setFetchStoreError(error.message.toString());
    }
  };

  useEffect(() => {
    if (state.latLong) {
      fetchStores(state.latLong);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.latLong]);
  return (
    <div className="">
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="shows a list of coffee stores in Kuala Lumpur, Malaysia"
        />
      </Head>
      <Banner
        handleOnClick={handleTrackLocation}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        error={locationErrorMessage}
      />
      {fetchStoreError && <p className="text-red-500">{fetchStoreError}</p>}
      {state.coffeeStores.length > 0 && (
        <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <h2 className="col-span-full text-3xl text-gray-800">
            Coffee Stores Near Me
          </h2>
          {state.coffeeStores.map((store, index) => (
            <Card
              key={index}
              name={store.name}
              image_url={store.image_url}
              href={`/coffee-store/${store.id}`}
            />
          ))}
        </div>
      )}
      {coffeeStores.length > 0 && (
        <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <h2 className="col-span-full text-3xl text-gray-800">
            Kuala Lumpur Coffee Stores
          </h2>
          {coffeeStores.map((store, index) => (
            <Card
              key={index}
              name={store.name}
              image_url={store.image_url}
              href={`/coffee-store/${store.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}
