import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../context/store-context";
import { SWRConfig } from "swr";
import React from "react";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
      >
        <div
          className="p-10 min-h-screen text-gray-700 overflow-hidden border-2 border-red-500"
          // style={{
          //   backgroundImage: "url(/static/mesh-gradient.png)",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover",
          //   backgroundPosition: "50%",
          //   height: "100%",
          // }}
        >
          <div className="fixed h-screen w-screen -z-1">
            <Image
              src="/static/mesh-gradient.png"
              alt="gradient background"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </div>
      </SWRConfig>
    </React.StrictMode>
  );
}

export default MyApp;
