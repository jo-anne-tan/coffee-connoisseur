import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CoffeeStore() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Link href="/" prefetch={true}>
        <a>Back to Home</a>
      </Link>
      {id && (
        <Link href={`/coffee-store/${Number(id) + 1}`} prefetch={true}>
          <a>Go to page dynamic</a>
        </Link>
      )}
      <h1>Coffee Store Page {id}</h1>
    </div>
  );
}
