import Img from "./Img";

const Story = ({ username, avatar = false }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Img
        source={
          avatar
            ? avatar
            : `https://avatars.dicebear.com/api/avataaars/${Math.random()}.png?background=%23AED7FF`
        }
        extraStyle={true}
      />
      <p className=" w-14 text-center truncate mt-1">{username}</p>
    </div>
  );
};

export default Story;
