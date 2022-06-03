import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStores from "../data/coffee-stores.json";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner
        handleOnClick={() => {
          console.log("click");
        }}
        buttonText={"View stores nearby"}
      />
      <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {coffeeStores.map((store, index) => (
          <Card
            key={index}
            name={store.name}
            image_url={store.imgUrl}
            href={`/coffee-store/${store.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
