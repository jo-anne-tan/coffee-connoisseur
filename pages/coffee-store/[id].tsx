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
import { CoffeeStoreAirtable } from "../../data/coffee_store";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store-context";
import useSWR from "swr";
import { GetStaticPaths, GetStaticProps } from "next/types";

type Props = {
  store: CoffeeStoreAirtable | null;
};
const CoffeeStorePage: React.FC<Props> = ({ store }) => {
  const [coffeeStore, setCoffeeStore] = useState<CoffeeStoreAirtable | null>(
    store
  );

  const [voting, setVoting] = useState(coffeeStore?.voting ?? 0);
  const {
    state: { latLong },
  } = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR<{ coffeeStore: CoffeeStoreAirtable }>(
    `/api/getCoffeeStoreById?id=${id}`
  );

  useEffect(() => {
    if (data && data.coffeeStore) {
      setCoffeeStore(data.coffeeStore);
    }
  }, [data, error]);

  const findOrCreateStore = async (storeFromContext: CoffeeStoreAirtable) => {
    const { id, name, neighbourhood, address, image_url } = storeFromContext;

    await fetch("/api/createCoffeeStore", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: `${id}`,
        name: name,
        neighbourhood: neighbourhood,
        address: address,
        image_url: image_url,
        vote: 0,
      }),
    });
  };

  const upvoteCoffeeStore = async () => {
    if (voting || voting === 0) {
      setVoting(voting + 1);
      const response = await fetch(`/api/upvoteCoffeeStore?id=${id}`, {
        method: "PUT",
      });
      const storeUpdated = await response.json();
      setCoffeeStore(storeUpdated);
    }
  };
  useEffect(() => {
    if (!store) {
      const fetchStore = async () => {
        const coffeeStores = await fetchCoffeeStores(latLong, "30");
        const storeFromContext = coffeeStores.find((store) => store.id === id);

        if (storeFromContext) {
          await findOrCreateStore(storeFromContext);
          setCoffeeStore(storeFromContext);
        }
      };

      fetchStore().catch((e) => console.error(e));
    } else {
      findOrCreateStore(store);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, store]);

  useEffect(() => {
    if (coffeeStore && coffeeStore.voting) setVoting(coffeeStore.voting);
  }, [coffeeStore]);
  if (error) {
    console.error(error);
    return <div>Something went wrong retrieving coffee Store</div>;
  }

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
              coffeeStore?.image_url ??
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
          {coffeeStore?.address && (
            <div className="flex gap-x-3 mb-3">
              <LocationMarkerIcon height={24} width={24} color="white" />
              <p>{coffeeStore?.address}</p>
            </div>
          )}
          {coffeeStore?.neighbourhood && (
            <div className="flex gap-x-3 mb-3">
              <PaperAirplaneIcon height={24} width={24} color="white" />
              <p>{coffeeStore?.neighbourhood}</p>
            </div>
          )}
          <div className="flex gap-x-3 mb-3">
            <StarIcon height={24} width={24} color="white" />
            <p>{voting}</p>
          </div>
          <button
            className="mt-3 px-3 py-1 text-white bg-purple-600 active:bg-purple-500"
            onClick={upvoteCoffeeStore}
          >
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
};
export default CoffeeStorePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();
  const store = coffeeStores.find((store) => store.id === params?.id) ?? null;
  return {
    props: {
      store,
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((data) => ({
    params: { id: data.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};
