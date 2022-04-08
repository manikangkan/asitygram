import useSWR from "swr";

const fetcher = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
};

const Suggestions = () => {
  const { data, error } = useSWR("/api/user", fetcher);

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-4">
        <p className="text-sm font-semibold text-gray-500">
          Suggestions for you
        </p>
        <button className="text-sm font-semibold cursor-pointer">
          See all
        </button>
      </div>

      {data?.length > 0 &&
        data.map(
          (user, index) =>
            index < 5 && (
              <div
                className="flex items-center justify-center  mt-2"
                key={index}>
                <img
                  src={`https://avatars.dicebear.com/api/micah/${Math.random()}.svg?background=%23AED7FF`}
                  alt="avatar"
                  className="h-12 w-12 rounded-full p-1 border object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-sm">{user.username}</h2>
                  <h3 className="text-xs text-gray-500">{user.username}</h3>
                </div>
                <button className="text-blue-500 text-xs font-semibold">
                  Follow
                </button>
              </div>
            )
        )}
    </div>
  );
};

export default Suggestions;
