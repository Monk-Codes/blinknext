"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import { LuImagePlus } from "react-icons/lu";
import { HiCamera } from "react-icons/hi";
import { app } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { collection, getFirestore, serverTimestamp, addDoc } from "firebase/firestore";
export default function Header() {
 // DEFAULTS
 const { data: session } = useSession();
 const filePickerRef = useRef(null);
 const [isOpen, setIsOpen] = useState(false);
 const [caption, setCaption] = useState("");
 const [selectedFile, setSelectedFile] = useState(null);
 const [imgFileUrl, setImgFileUrl] = useState(null);
 const [imageIsUploading, setImageIsUploading] = useState(false);
 const [postUploading, setPostUploading] = useState(false);

 const db = getFirestore(app);
 //  ADD IMAGE FILE
 function addImgToPost(img) {
  const file = img.target.files[0];
  if (file) {
   setSelectedFile(file);
   setImgFileUrl(URL.createObjectURL(file));
  }
 }
 //ADDING IMAGE TO FIREBASE
 const uploadImageToStorage = useCallback(async () => {
  setImageIsUploading(true);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + "-" + selectedFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  uploadTask.on(
   "state_changed",
   (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
   },
   (error) => {
    console.log(error);
    setImageIsUploading(false);
    setImgFileUrl(null);
    setSelectedFile(null);
   },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     setImgFileUrl(downloadURL);
     setImageIsUploading(false);
    });
   }
  );
 }, [selectedFile]);
 //USING USEEFFECT TO UPLOAD BY DEFAULT
 useEffect(() => {
  if (selectedFile) {
   uploadImageToStorage();
  }
 }, [selectedFile, uploadImageToStorage]);

 async function handleSubmit() {
  setPostUploading(true);
  const docRef = await addDoc(collection(db, "posts"), {
   username: session.user.username,
   caption,
   profileImg: session.user.image,
   image: imgFileUrl,
   timestamp: serverTimestamp(),
  });
  setPostUploading(false);
  setIsOpen(false);
  location.reload();
 }
 //  RETURN
 return (
  <div className="shadow-sm border-b sticky">
   <div className="flex justify-between items-center max-w-5xl mx-auto sticky top-0 z-50 px-1">
    {/* Logo */}
    <div className="logo p-1">
     <Link href="/" className="hidden lg:inline-flex">
      <img src="/assets/Blink t.png" width={200} height={100} alt="blink" />
     </Link>
     <Link href="/" className="lg:hidden">
      <img src="/assets/Blink t.png" width={100} height={50} alt="blink" />
     </Link>
    </div>
    {/* Input */}
    <input type="text" placeholder="Search..." className="bg-gray-100 border border-amber-200 rounded-md text-sm w-full p-1 px-2 max-w-[210px] outline-none " />
    {/* Menu */}
    {session ? (
     <>
      <div className="flex gap-3 items-center p-1">
       <LuImagePlus className="text-2xl cursor-pointer transform hover:scale-110 hover:text-red-600 transition-all duration-150" onClick={() => setIsOpen(true)} />

       <img src={session.user.image} alt="img" width={10} height={10} className="h-8 w-8 rounded-full cursor-pointer" onClick={() => signOut()} />
      </div>
     </>
    ) : (
     <button className="text-blue-500 text-sm font-semibold" onClick={() => signIn()}>
      Login
     </button>
    )}
   </div>

   {/* modal */}
   {isOpen && (
    <Modal
     isOpen={isOpen}
     onRequestClose={() => setIsOpen(false)}
     className="max-w-lg w-[80%] p-5 absolute top-[10%] left-[50%] translate-x-[-50%]  border-2 border-amber-100 rounded-xl shadow-sm bg-amber-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
     ariaHideApp={false}
    >
     <div className="flex flex-col justify-center items-center ">
      <button
       onClick={() => setIsOpen(false)}
       className="right-2 cursor-pointer top-2 absolute 
              hover:rotate-90 transition-all duration-500"
      >
       ❌
      </button>
      <div className="flex justify-center items-center">
       {selectedFile ? (
        <img src={imgFileUrl} onClick={() => setSelectedFile(null)} alt="img" width="10" height="10" className={`"max-h-[250px] w-full object-cover cursor-pointer" ${imageIsUploading ? "animate-pulse" : ""}`} />
       ) : (
        <HiCamera onClick={() => filePickerRef.current.click()} className="text-4xl text-amber-400 cursor-pointer" />
       )}
      </div>
      <input hidden ref={filePickerRef} type="file" accept="image/*" onChange={addImgToPost} />
      <input
       type="text"
       maxLength="120"
       placeholder="Enter caption..."
       className="p-3 border text-center w-full
                focus:ring-0 outline-none bg-amber-100 rounded-xl mb-1"
       onChange={(e) => setCaption(e.target.value)}
      />
      <button
       disabled={!selectedFile || caption.trim() === "" || postUploading || imageIsUploading}
       onClick={handleSubmit}
       className="w-1/2 bg-amber-500 text-white p-2 shadow-sm rounded-2xl hover:brightness-125 disabled:bg-gray-200 disabled:hover:brightness-100"
      >
       Add post
      </button>
     </div>
    </Modal>
   )}
  </div>
 );
}
