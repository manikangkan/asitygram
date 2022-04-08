import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import Image from "next/image";
import Img from "./Img";

const Post = ({ id, username, userImage, image, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-2 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center space-x-2 p-4">
        <Img source={userImage} />
        <p className="flex-1 font-semibold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}
      <Image
        src={image}
        alt={image}
        width={100}
        height={100}
        layout="responsive"
        objectFit="cover"
      />
      {/* Button */}
      {session && (
        <div className="flex justify-between items-center px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* Caption */}
      <div className="p-4 truncate">
        {likes.length > 0 && (
          <p className="font-semibold mb-1">{likes.length} likes</p>
        )}
        <span className="font-semibold mr-1">{username}</span>
        {caption}
      </div>
      {/* Comments */}

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-blue-500 scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-3 mb-3">
              <Img source={comment.data().userImage} width={12} />

              <p className=" flex-1">
                <span className="font-semibold">
                  {comment.data().username}{" "}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-sm text-gray-500">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <form className="flex items-center p-4 ">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none "
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="font-semibold text-blue-500 cursor-pointer disabled:cursor-not-allowed"
            onClick={sendComment}
            disabled={!comment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
