import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";

const Home: React.FC<Props> = ({ coffeeStores }) => {
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
      {coffeeStores.length > 0 && (
        <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <h2 className="col-span-full text-3xl text-gray-800">
            Toronto Coffee Stores
          </h2>
          {coffeeStores.map((store, index) => (
            <Card
              key={index}
              name={store.name}
              image_url={store.imgUrl}
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
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }, // will be passed to the page component as props
  };
}

type Props = {
  coffeeStores: {
    id: number;
    name: string;
    imgUrl: string;
    websiteUrl: string;
    address: string;
    neighbourhood: string;
  }[];
};
