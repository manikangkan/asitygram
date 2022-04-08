import Image from "next/image";

const Story = ({ username, avatar }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={
          avatar
            ? avatar
            : `https://avatars.dicebear.com/api/micah/${Math.random()}.svg?background=%23AED7FF`
        }
        alt="avatar"
        className="h-14 w-14 rounded-full p-1 border-blue-500 border object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-sm w-14 text-center truncate mt-1">{username}</p>
    </div>
  );
};

export default Story;
