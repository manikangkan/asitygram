import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Logo from "./Logo.js";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom.js";
import Img from "./Img";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="bg-white backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-5 xl:mx-auto">
        {/* left */}
        <div className="w-24 cursor-pointer">
          <Logo />
        </div>

        {/* middle */}
        <div className="max-w-xs">
          <div className="relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-5 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-slate-50 block w-full px-12 md:py-4  border-none rounded-full focus:border-blue-500"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-4 md:space-x-8">
          <Link href="/">
            <a>
              <HomeIcon className="navBtn" />
            </a>
          </Link>
          <PlusCircleIcon
            className="md:hidden h-6 cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
            onClick={() => setOpen(true)}
          />
          {/* <MenuIcon className="h-6 w-6 md:hidden cursor-pointer" /> */}
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="rotate-45" />
                <div className="absolute -top-2 -right-1 text-xs w-5 h-5 flex items-center justify-center text-white bg-red-500 rounded-full">
                  4
                </div>
              </div>

              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div onClick={signOut}>
                <Img source={session.user.image} width={12} />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
