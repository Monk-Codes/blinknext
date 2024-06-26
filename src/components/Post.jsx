"use client";
import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";
import { app } from "@/firebase";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Post({ post }) {
 const [showOptions, setShowOptions] = useState(false);
 const [isEditing, setIsEditing] = useState(false);
 const [newCaption, setNewCaption] = useState(post.caption);

 const db = getFirestore(app);

 function toggleOptions() {
  setShowOptions(!showOptions);
 }

 async function handleEdit() {
  setIsEditing(true);
  setShowOptions(false);
 }

 async function handleDelete() {
  try {
   await deleteDoc(doc(db, "posts", post.id));
   alert("Post deleted successfully");
   window.location.reload(); // Refresh the page after deleting
  } catch (error) {
   console.error("Error deleting post: ", error);
  }
  setShowOptions(false);
 }

 async function saveEdit() {
  try {
   await updateDoc(doc(db, "posts", post.id), {
    caption: newCaption,
   });
   alert("Post updated successfully");
   setIsEditing(false);
   window.location.reload(); // Refresh the page after editing
  } catch (error) {
   console.error("Error updating post: ", error);
  }
 }

 return (
  <div className="bg-stone-50 my-1 px-1 border-none rounded-lg relative">
   <div className="flex items-center p-2 border-b border-amber-200 shadow-md">
    <img src={post.profileImg} alt={post.username} className="h-10 rounded-full object-cover border-none mr-2" />
    <p className="flex-1 font-bold text-stone-800">{post.username}</p>
    <HiOutlineDotsVertical className="h-5 cursor-pointer" onClick={toggleOptions} />
   </div>
   {showOptions && (
    <div className="absolute top-10 right-2 bg-transparent border border-amber-100 rounded shadow-xl z-10">
     <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-50" onClick={handleEdit}>
      ✏️
     </button>
     <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-50" onClick={handleDelete}>
      ❌
     </button>
    </div>
   )}
   <img src={post.image} alt={post.caption} className="object-cover w-full" />
   <div className="p-1">
    <LikeSection id={post.id} />
    {isEditing ? (
     <div>
      <input type="text" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} className="border p-1 w-full" />
      <button onClick={saveEdit} className="text-blue-500">
       Save
      </button>
     </div>
    ) : (
     <p className="truncate">
      <span className="font-bold mr-2">{post.username}</span>
      {post.caption}
     </p>
    )}
    <CommentSection id={post.id} />
   </div>
  </div>
 );
}
