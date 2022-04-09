import { signOut, useSession } from "next-auth/react";
import Img from "./Img";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-12 mb-6">
      <Img source={session?.user?.image} />
      <div className="flex-1 ml-5 mr-24">
        <p className=" font-semibold">{session?.user?.username}...</p>
        <p className="text-gray-500 text-sm">Hello there😀</p>
      </div>
      <button
        className="text-blue-500  font-semibold cursor-pointer"
        onClick={signOut}>
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
