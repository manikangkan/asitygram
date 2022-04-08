import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";

// const posts = [
//   {
//     id: 1,
//     username: "manikangkan",
//     userImage: "https://avatars.githubusercontent.com/u/75943412?v=4",
//     image: "https://avatars.githubusercontent.com/u/75943412?v=4",
//     caption: "This is dope manikangkandas",
//   },
//   {
//     id: 2,
//     username: "gayatri",
//     userImage: "https://avatars.githubusercontent.com/u/75943412?v=4",
//     image: "https://avatars.githubusercontent.com/u/75943412?v=4",
//     caption: "This is dope manikangkandas",
//   },
//   {
//     id: 3,
//     username: "dipambita",
//     userImage: "https://avatars.githubusercontent.com/u/75943412?v=4",
//     image: "https://avatars.githubusercontent.com/u/75943412?v=4",
//     caption: "This is dope manikangkandas",
//   },
// ];

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );


  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImage={post.data().profileImage}
          image={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
