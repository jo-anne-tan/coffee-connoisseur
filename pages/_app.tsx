import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../context/store-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className="p-10 min-h-screen text-gray-700"
      style={{
        backgroundImage: "url(/static/mesh-gradient.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50%",
        height: "100%",
      }}
    >
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}

export default MyApp;
