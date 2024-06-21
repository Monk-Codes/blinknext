"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Modal from "react-modal"
import { LuImagePlus } from "react-icons/lu";
import {HiCamera} from "react-icons/hi"
export default function Header() {
  const {data:session}=useSession()
  const [isOpen,setIsOpen]=useState()
  return (
    <div className='shadow-sm border-b sticky'>

    <div className='flex justify-between items-center max-w-5xl mx-auto sticky top-0 z-50 px-1'>
      <div className="logo p-1">
        <Link href="/" className='hidden lg:inline-flex'>
        <Image src="/assets/Blink t.png"width={100} height={100} alt='blink'/>
        </Link>
        <Link href="/" className='lg:hidden'>
        <Image src="/assets/Blink.gif"width={50} height={50} alt='blink' />
        </Link>
      </div>
      {/* input */}
      <input type="text" placeholder='Search...' className='bg-gray-100 border border-amber-200 rounded-md text-sm w-full p-1 px-2 max-w-[210px] outline-none ' />
    {/* menu */}
    {session?(
      <>
      <div className='flex gap-3 items-center p-1'>

      <LuImagePlus className='text-2xl cursor-pointer transform hover:scale-110 hover:text-red-600 transition-all duration-150'onClick={()=>setIsOpen(true)}/>

      <img src={session.user.image} alt="img" className='h-8 w-8 rounded-full cursor-pointer'onClick={()=>signOut()}/>
      </div>
      </>
    ):(

      <button className='text-blue-500 text-sm font-semibold' onClick={()=>signIn()}>Login</button>
    )}
    </div>

    {/* modal */}
    {isOpen && (
      <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} className="max-w-lg w-[90%] p-6 absolute top-[40%] left-[50%] translate-x-[-50%] bg-slate-200 border-2 border-amber-200 rounded-xl shadow-sm" ariaHideApp={false}>
        <div className='flex justify-between'>
          <h1>Upload Image</h1>
          <button onClick={()=>setIsOpen(false)}>❌</button>
          </div>
          <div>
            <HiCamera/>
        </div>
      </Modal>
    )}
    </div>
  )
}
