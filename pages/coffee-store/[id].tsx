import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CoffeeStore() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <h1>Coffee Store Page {id}</h1>
    </div>
  );
}
