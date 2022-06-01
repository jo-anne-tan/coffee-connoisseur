import Head from "next/head";
import { useRouter } from "next/router";

export default function DynamicIndex() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>{id}</title>
      </Head>

      {id}
    </div>
  );
}
