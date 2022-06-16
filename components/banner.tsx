import Image from "next/image";

type Props = {
  handleOnClick: () => void;
  buttonText: string;
  error: string;
};

const Banner: React.FC<Props> = ({ handleOnClick, buttonText, error }) => {
  return (
    <div className="relative rounded-xl">
      <div className=" p-5  w-[80vw] h-96">
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
      <div className=" h-full w-full rounded-xl absolute top-0 -z-10">
        <Image
          className="rounded-xl"
          src="/static/hero.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Banner;
