import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import { CoffeeStore } from "../data/coffee_store";
import { fetchCoffeeStores } from "../lib/coffee-stores";

type Props = {
  coffeeStores: CoffeeStore[];
};

const Home: React.FC<Props> = ({ coffeeStores }) => {
  const viewStoresNearby = async () => {};
  return (
    <div className="">
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner
        handleOnClick={viewStoresNearby}
        buttonText={"View stores nearby"}
      />
      {coffeeStores.length > 0 && (
        <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <h2 className="col-span-full text-3xl text-gray-800">
            Kuala Lumpur Coffee Stores
          </h2>
          {coffeeStores.map((store, index) => (
            <Card
              key={index}
              name={store.name}
              image_url={
                // TODO: add image
                "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
              }
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
