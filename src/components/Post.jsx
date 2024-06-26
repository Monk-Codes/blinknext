"use client";
import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";

export default function Post({ post }) {
 const [showOptions, setShowOptions] = useState(false);

 function toggleOptions() {
  setShowOptions(!showOptions);
 }

 function handleEdit() {
  // Implement your edit logic here
  console.log("Edit post with id:", post.id);
  setShowOptions(false);
 }

 function handleDelete() {
  // Implement your delete logic here
  console.log("Delete post with id:", post.id);
  setShowOptions(false);
 }

 return (
  <div className="bg-stone-50 my-1 px-1 border-none rounded-lg relative">
   <div className="flex items-center p-2 border-b border-amber-200 shadow-md">
    <img src={post.profileImg} alt={post.username} className="h-10 rounded-full object-cover border-none mr-2" />
    <p className="flex-1 font-bold text-stone-800">{post.username}</p>
    <HiOutlineDotsVertical className="h-5 cursor-pointer" onClick={toggleOptions} />
   </div>
   {showOptions && (
    <div className="absolute top-10 right-2 bg-transparent border border-amber-200 rounded-lg shadow-xl z-10">
     <button className="block w-full text-left px-4 py-2 text-sm hover:bg-stone-50" onClick={handleEdit}>
      ✏️
     </button>
     <button className="block w-full text-left px-4 py-2 text-sm hover:bg-stone-50" onClick={handleDelete}>
      ❌
     </button>
    </div>
   )}
   <img src={post.image} alt={post.caption} className="object-cover w-full" />
   <div className="p-1">
    <LikeSection id={post.id} />
    <p className="truncate">
     <span className="font-bold mr-2">{post.username}</span>
     {post.caption}
    </p>
    <CommentSection id={post.id} />
   </div>
  </div>
 );
}
