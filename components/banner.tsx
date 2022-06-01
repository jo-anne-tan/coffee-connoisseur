type Props = {
  handleOnClick: () => void;
  buttonText: string;
};

const Banner: React.FC<Props> = ({ handleOnClick, buttonText }) => {
  return (
    <div className="">
      <h1 className="mt-3 text-3xl font-extrabold">
        Coffee <span className="text-purple-700">Connoisseur</span>
      </h1>
      <p className="mt-3">Discover your local coffee shops!</p>
      <button onClick={handleOnClick} className="mt-3 bg-purple-700 px-10 py-5">
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;
