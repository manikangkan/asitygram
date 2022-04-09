import Image from "next/image";
import Link from "next/link";
import LogoPng from "../assets/asitygram.png";

const Logo = ({ n = 2 }) => {
  return (
    <Link href="/">
      <a>
        <Image
          src={LogoPng}
          alt="asitygram logo"
          width={n * 73}
          height={n * 27}
        />
      </a>
    </Link>
  );
};

export default Logo;
