import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import {
  LocationMarkerIcon,
  PaperAirplaneIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { CoffeeStore } from "../../data/coffee_store";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../_app";

type Props = {
  store: CoffeeStore;
};
const CoffeeStore: React.FC<Props> = ({ store }) => {
  const [coffeeStore, setCoffeeStore] = useState(store);
  const {
    state: { latLong },
  } = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (store === null) {
      const fetchStore = async () => {
        const coffeeStores = await fetchCoffeeStores(latLong, "30");
        const store = coffeeStores.find((store) => store.fsq_id === id);
        setCoffeeStore(store);
      };

      fetchStore().catch((e) => console.error(e));
    } else {
      setCoffeeStore(store);
    }
  }, [store, id, latLong]);

  if (router.isFallback) {
    return <p>Loading....</p>;
  }

  if (coffeeStore)
    return (
      <div>
        <Head>
          <title>{coffeeStore.name}</title>
        </Head>
        <Link href="/">
          <a className="font-extrabold flex items-center">
            <ArrowLeftIcon height={20} width={20} className=" mr-3" />
            Back to Home
          </a>
        </Link>
        <div className="grid md:grid-cols-2 justify-start mt-10 gap-x-5">
          <div>
            <h1 className="mt-10 font-extrabold text-3xl mb-5">
              {coffeeStore.name}
            </h1>
            <Image
              src={coffeeStore.image}
              alt="coffee shop"
              height={500}
              width={800}
              objectFit="cover"
              className="rounded-xl w-full h-full"
            />
          </div>
          <div className="flex flex-col self-center justify-self-start p-10 rounded-xl bg-white bg-opacity-30 hover:bg-opacity-60   bg-clip-padding backdrop-filter backdrop-blur-lg">
            {coffeeStore.location.formatted_address && (
              <div className="flex gap-x-3 mb-3">
                <LocationMarkerIcon height={24} width={24} color="white" />
                <p>{coffeeStore.location.formatted_address}</p>
              </div>
            )}
            {coffeeStore.location.neighborhood && (
              <div className="flex gap-x-3 mb-3">
                <PaperAirplaneIcon height={24} width={24} color="white" />
                <p>{coffeeStore.location.neighborhood}</p>
              </div>
            )}
            <div className="flex gap-x-3 mb-3">
              <StarIcon height={24} width={24} color="white" />
              <p>1</p>
            </div>
            {/* <button className="mt-3 px-3 py-1 text-white bg-purple-600 active:bg-purple-500">
              Upvote
            </button> */}
          </div>
        </div>
      </div>
    );
  else {
    return <p>Loading....</p>;
  }
};
export default CoffeeStore;

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      store: coffeeStores.find((store) => store.fsq_id === params.id) ?? null,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((data) => ({
    params: { id: data.fsq_id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
