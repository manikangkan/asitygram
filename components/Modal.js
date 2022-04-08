import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
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
    console.log(`New doc added with id - ${docRef.id}`);
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    console.log(`Done with all stuff`);
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overyflow-y-auto"
        onClose={setOpen}>
        <div className="flex items-end justify-center max-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"></span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
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
                    className="mx-auto flex  items-center justify-center h-12 w-12 rounded-full bg-blue-500 cursor-pointer">
                    <CameraIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-3">
                    <Dialog.Title
                      as="h3"
                      className="text-lg  leading-6 font-semibold">
                      Upload a photo
                    </Dialog.Title>
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
                    className="inline-flex justify-center w-full px-4 py-2  outline-none bg-blue-500 hover:bg-white hover:border-2 hover:border-blue-500  hover:text-blue-500 text-white font-semibold rounded-full cursor-pointer disabled:cursor-not-allowed"
                    disabled={!selectedFile}
                    onClick={uploadPost}>
                    {loading ? "Uploading..." : "Upload post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
