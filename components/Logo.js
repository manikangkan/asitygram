import Image from "next/image";
import Link from "next/link";
import LogoSvg from "../assets/Logo.svg";

const Logo = ({ n = 2 }) => {
  return (
    <Link href="/">
      <a>
        <Image
          src={LogoSvg}
          alt="asitygram logo"
          width={n * 73}
          height={n * 27}
        />
      </a>
    </Link>
  );
};

export default Logo;
