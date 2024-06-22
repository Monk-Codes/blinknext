"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import { LuImagePlus } from "react-icons/lu";
import { HiCamera } from "react-icons/hi";
export default function Header() {
 const { data: session } = useSession();
 const [isOpen, setIsOpen] = useState();
 return (
  <div className="shadow-sm border-b sticky">
   <div className="flex justify-between items-center max-w-5xl mx-auto sticky top-0 z-50 px-1">
    <div className="logo p-1">
     <Link href="/" className="hidden lg:inline-flex">
      <Image src="/assets/Blink t.png" width={100} height={100} alt="blink" />
     </Link>
     <Link href="/" className="lg:hidden">
      <Image src="/assets/Blink.gif" width={50} height={50} alt="blink" />
     </Link>
    </div>
    {/* input */}
    <input type="text" placeholder="Search..." className="bg-gray-100 border border-amber-200 rounded-md text-sm w-full p-1 px-2 max-w-[210px] outline-none " />
    {/* menu */}
    {session ? (
     <>
      <div className="flex gap-3 items-center p-1">
       <LuImagePlus className="text-2xl cursor-pointer transform hover:scale-110 hover:text-red-600 transition-all duration-150" onClick={() => setIsOpen(true)} />

       <img src={session.user.image} alt="img" className="h-8 w-8 rounded-full cursor-pointer" onClick={() => signOut()} />
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
     className="max-w-lg w-[90%] p-5 absolute top-[40%] left-[50%] translate-x-[-50%]  border-2 border-amber-300 rounded-xl shadow-sm bg-amber-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
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
       <HiCamera className="text-4xl text-amber-400 cursor-pointer" />
      </div>
      <input
       type="text"
       maxLength="120"
       placeholder="Enter caption..."
       className="p-3 border text-center w-full
        focus:ring-0 outline-none bg-amber-100 rounded-xl mb-1"
      />
      <button disabled className="w-1/2 bg-amber-500 text-white p-2 shadow-sm rounded-2xl hover:brightness-125 disabled:bg-gray-200 disabled:hover:brightness-100">
       Add post
      </button>
     </div>
    </Modal>
   )}
  </div>
 );
}
