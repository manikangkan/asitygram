import useSWR from "swr";
import Img from "./Img";

const fetcher = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
};

const Suggestions = () => {
  const { data, error } = useSWR("/api/user", fetcher);

  return (
    <div className="my-4">
      <div className="flex justify-between mb-4">
        <p className=" font-semibold text-gray-500">
          Suggestions for you
        </p>
        <button className=" font-semibold cursor-pointer">
          See all
        </button>
      </div>

      {data?.length > 0 &&
        data.map(
          (user, index) =>
            index < 5 && (
              <div
                className="flex items-center justify-center ml-1 my-4"
                key={index}>
                <Img
                  source={`https://avatars.dicebear.com/api/avataaars/${Math.random()}.png?background=%23AED7FF`}
                  width={12}
                  extraStyle={true}
                />

                <div className="flex-1 ml-4">
                  <h2 className="font-semibold ">{user.username}</h2>
                  <h3 className=" text-gray-500 text-sm">{user.username}</h3>
                </div>
                <button className="text-blue-500  font-semibold">
                  Follow
                </button>
              </div>
            )
        )}
    </div>
  );
};

export default Suggestions;
