import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Home;
