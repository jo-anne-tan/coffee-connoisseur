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
            src={
              image_url ??
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
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
