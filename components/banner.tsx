import Image from "next/image";

type Props = {
  handleOnClick: () => void;
  buttonText: string;
  error: string;
};

const Banner: React.FC<Props> = ({ handleOnClick, buttonText, error }) => {
  return (
    <div className="relative block p-5 rounded-xl w-[80vw] h-96 bg-hero">
      {/* <div className="fixed w-full h-full overflow-hidden -z-1">
        <Image
          src="/static/hero.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div> */}
      <h1 className="mt-3 text-[60px] font-extrabold">
        Coffee <span className="text-pink-300">Connoisseur</span>
      </h1>
      <p className="mt-5 font-extrabold">Discover your local coffee shops!</p>
      <button
        onClick={handleOnClick}
        className="mt-3 rounded-lg bg-pink-300 px-10 py-5"
      >
        {buttonText}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Banner;
