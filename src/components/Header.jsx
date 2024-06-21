"use client"
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const {data:session}=useSession()
  return (
    <div className='shadow-sm border-b sticky'>

    <div className='flex justify-between items-center max-w-7xl mx-auto sticky top-0 z-50 px-1'>
      <div className="logo">
        <Link href="/" className='hidden lg:inline-flex'>
        <Image src="/assets/Blink t.png"width={100} height={100} alt='blink'/>
        </Link>
        <Link href="/" className='lg:hidden'>
        <Image src="/assets/Blink.gif"width={50} height={50} alt='blink' />
        </Link>
      </div>
      {/* input */}
      <input type="text" placeholder='Search...' className='bg-gray-50 border border-gray-200 rounded-md text-sm w-full py-2 px-4 max-w-[210px]' />
    {/* menu */}
    {session?(
      <img src={session.user.image} alt="img"/>
    ):(

      <button className='text-blue-500 text-sm font-semibold' onClick={()=>signIn()}>Login</button>
    )}
    </div>
    </div>
  )
}
