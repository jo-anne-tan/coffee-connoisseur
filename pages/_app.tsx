import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className="p-10 h-screen text-gray-700"
      style={{
        backgroundImage: "url(/static/mesh-gradient.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50%",
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
