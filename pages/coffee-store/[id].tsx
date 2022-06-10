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
import { StoreContext } from "../../context/store-context";

type Props = {
  store: CoffeeStore | null;
};
const CoffeeStore: React.FC<Props> = ({ store }) => {
  const [coffeeStore, setCoffeeStore] = useState(store);
  const {
    state: { latLong },
  } = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;

  const findOrCreateStore = async (storeFromContext: CoffeeStore) => {
    const { fsq_id, name, location, image } = storeFromContext;
    const { neighborhood, address } = location;

    await fetch("/api/createCoffeeStore", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: `${fsq_id}`,
        name: name,
        neighbourhood: neighborhood ? neighborhood[0] : "",
        address: address,
        image_url: image,
        vote: 1,
      }),
    });
  };
  useEffect(() => {
    if (store === null) {
      const fetchStore = async () => {
        const coffeeStores = await fetchCoffeeStores(latLong, "30");
        const storeFromContext = coffeeStores.find(
          (store) => store.fsq_id === id
        );

        if (storeFromContext) {
          await findOrCreateStore(storeFromContext);
          setCoffeeStore(storeFromContext);
        }
      };

      fetchStore().catch((e) => console.error(e));
    } else {
      findOrCreateStore(store);
      // setCoffeeStore(store);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, store]);

  if (router.isFallback) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <Head>
        <title>{coffeeStore?.name}</title>
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
            {coffeeStore?.name}
          </h1>
          <Image
            src={
              coffeeStore?.image ??
              "https://images.unsplash.com/photo-1654807423880-04daa58d1e49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            }
            alt="coffee shop"
            height={500}
            width={800}
            objectFit="cover"
            className="rounded-xl w-full h-full"
          />
        </div>
        <div className="flex flex-col self-center justify-self-start p-10 rounded-xl bg-white bg-opacity-30 hover:bg-opacity-60   bg-clip-padding backdrop-filter backdrop-blur-lg">
          {coffeeStore?.location.formatted_address && (
            <div className="flex gap-x-3 mb-3">
              <LocationMarkerIcon height={24} width={24} color="white" />
              <p>{coffeeStore?.location.formatted_address}</p>
            </div>
          )}
          {coffeeStore?.location.neighborhood && (
            <div className="flex gap-x-3 mb-3">
              <PaperAirplaneIcon height={24} width={24} color="white" />
              <p>{coffeeStore?.location.neighborhood}</p>
            </div>
          )}
          <div className="flex gap-x-3 mb-3">
            <StarIcon height={24} width={24} color="white" />
            <p>1</p>
          </div>
          <button className="mt-3 px-3 py-1 text-white bg-purple-600 active:bg-purple-500">
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
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
