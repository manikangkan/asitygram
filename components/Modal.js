import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { CameraIcon } from "@heroicons/react/outline";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import Image from "next/image";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    // create post & add to firestore post collection
    // get the post id or the newly created post
    // upload the image to firebase storage with the post id
    // get a download url from firebase storage & update the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 w-full h-full justify-center items-center transition-transform ${
        open ? `flex` : `hidden`
      }`}>
      <div
        className="absolute w-full h-full -z-50 bg-gray-500 bg-opacity-50"
        onClick={() => setOpen(false)}></div>
      <div className="w-11/12 md:w-2/5 bg-white rounded-lg p-6">
        <div>
          {selectedFile ? (
            <Image
              src={selectedFile}
              alt={selectedFile}
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              onClick={() => setSelectedFile(null)}
              className="w-full cursor-pointer rounded-lg"
            />
          ) : (
            <div
              onClick={() => filePickerRef.current.click()}
              className="mx-auto flex  items-center justify-center h-12 w-12 rounded-full bg-blue-500 cursor-pointer animate-pulse">
              <CameraIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
          )}
          <div>
            <div className="mt-3 text-center sm:mt-3">
              <h2 className="text-lg leading-6 font-semibold">
                Upload a photo
              </h2>
              <div>
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="border-none focus:ring-0 w-full text-center"
                  placeholder="Please enter a caption"
                  ref={captionRef}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-4  outline-none bg-blue-500 hover:bg-white hover:border-2 hover:border-blue-500  hover:text-blue-500 text-white font-semibold rounded-full cursor-pointer disabled:cursor-not-allowed"
              disabled={!selectedFile}
              onClick={uploadPost}>
              {loading ? "Uploading..." : "Upload post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
