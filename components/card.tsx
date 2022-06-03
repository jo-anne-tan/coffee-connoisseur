import Image from "next/image";
import Link from "next/link";
import { glassmorphism } from "../lib/glassmorphism";

type Props = {
  name: string;
  image_url: string;
  href: string;
};

const Card: React.FC<Props> = ({ name, image_url, href }) => {
  return (
    <Link href={href} className=" ">
      <a>
        <div className={`p-5 rounded-xl ${glassmorphism}`}>
          <p className="mb-2">{name}</p>
          <Image
            src={image_url}
            alt="coffee store"
            height={200}
            width={200}
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </a>
    </Link>
  );
};

export default Card;
