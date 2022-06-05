import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import { CoffeeStore } from "../data/coffee_store";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/user-track-location";

type Props = {
  coffeeStores: CoffeeStore[];
};

const Home: React.FC<Props> = ({ coffeeStores }) => {
  const {
    handleTrackLocation,
    latlong,
    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();

  const [fetchedStores, setFetchedStores] = useState<CoffeeStore[]>([]);
  const [fetchStoreError, setFetchStoreError] = useState(null);

  const fetchStores = async (latlong: string) => {
    try {
      setFetchStoreError("");
      const fetchedCoffeeStores = await fetchCoffeeStores(latlong, "30");
      setFetchedStores(fetchedCoffeeStores);
    } catch (error) {
      console.error(error);
      setFetchStoreError(error.message);
    }
  };

  useEffect(() => {
    if (latlong) {
      fetchStores(latlong);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latlong]);
  return (
    <div className="">
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner
        handleOnClick={handleTrackLocation}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        error={locationErrorMessage}
      />
      {fetchStoreError && <p className="text-red-500">{fetchStoreError}</p>}
      {fetchedStores.length > 0 && (
        <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <h2 className="col-span-full text-3xl text-gray-800">
            Coffee Stores Near Me
          </h2>
          {fetchedStores.map((store, index) => (
            <Card
              key={index}
              name={store.name}
              image_url={store.image}
              href={`/coffee-store/${store.fsq_id}`}
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
              image_url={store.image}
              href={`/coffee-store/${store.fsq_id}`}
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
