import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() =>
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    )
  );

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImage={post.data().profileImage}
            image={post.data().image}
            caption={post.data().caption}
          />
        ))
      ) : (
        <h1 className="mt-96 text-center font-semibold text-xl">
          No posts are being posted yet
        </h1>
      )}
    </div>
  );
};

export default Posts;
