import { signOut, useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14">
      <img
        src={session?.user?.image}
        alt="profile pic"
        className="h-14 border p-1 rounded-full cursor-pointer"
      />
      <div className="flex-1 ml-5 mr-14">
        <p className="text-sm font-semibold">{session?.user?.username}</p>
        <p className="text-xs text-gray-500">Welcome to InsaClone</p>
      </div>
      <button className="text-blue-500 text-m font-semibold cursor-pointer" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
