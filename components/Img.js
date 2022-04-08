import Image from "next/image";

const Img = ({ source, width = 14, extraStyle = false }) => {
  return (
    <div
      className={`relative cursor-pointer rounded-full border p-0.5 aspect-square w-${width} ${
        extraStyle &&
        `hover:scale-110 transition transform duration-200 ease-out overflow-hidden border-blue-500`
      }`}>
      <Image
        src={source}
        alt={source}
        width={100}
        height={100}
        layout="responsive"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
};

export default Img;
