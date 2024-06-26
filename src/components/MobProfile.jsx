"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MobProfile() {
 const { data: session } = useSession();
 return (
  <div className="flex items-center justify-between mt-2 ml-1 w-full text-gray-100">
   <img src={session?.user?.image || "/assets/blink sm.png"} alt="profile" className="w-20 h-20 rounded-full " />
   <div className="flex-1 ml-1">
    <h2 className="font-bold">{session?.user?.username}</h2>
    <h3 className="text-sm">Welcome to Blink</h3>
   </div>
   {session ? (
    <button onClick={signOut} className="text-blue-500 text-sm font-semibold">
     Sign Out
    </button>
   ) : (
    <button onClick={signIn} className="text-blue-500 text-sm font-semibold">
     Sign In
    </button>
   )}
  </div>
 );
}
