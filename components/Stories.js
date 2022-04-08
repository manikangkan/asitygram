import { useSession } from "next-auth/react";
import useSWR from "swr";
import Story from "./Story";

const fetcher = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
};
const Stories = () => {
  const { data: suggestions, error } = useSWR("/api/user", fetcher);
  const { data: session } = useSession();

  return (
    <div className="flex p-6  space-x-6 mt-8 overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && <Story avatar={session.user.image} username={session.user.username} />}
      {suggestions?.length > 0 &&
        suggestions.map((user) => (
          <Story key={user.id} username={user.username} />
        ))}
    </div>
  );
};

export default Stories;
