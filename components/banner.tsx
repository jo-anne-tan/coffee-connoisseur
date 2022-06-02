import Image from "next/image";

type Props = {
  handleOnClick: () => void;
  buttonText: string;
};

const Banner: React.FC<Props> = ({ handleOnClick, buttonText }) => {
  return (
    <div className="z-10 relative m-5">
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
      <div className="absolute -top-5 -left-5 -z-10">
        <Image
          alt="hero"
          src="/static/hero.png"
          objectFit="cover"
          className=" rounded-xl opacity-80"
          width={1200}
          height={700}
        />
      </div>
    </div>
  );
};

export default Banner;
