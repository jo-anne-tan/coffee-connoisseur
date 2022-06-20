import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import StoreProvider from "../context/store-context";
import { SWRConfig } from "swr";
import React from "react";
import Image from "next/image";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === "web-vital") {
    console.log("web-vitals:");
    console.log(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
  } else {
    console.log(metric);
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
      >
        <div className="p-10 min-h-screen text-gray-700">
          <div className="fixed top-0 left-0 h-screen w-screen -z-10 overflow-hidden">
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
