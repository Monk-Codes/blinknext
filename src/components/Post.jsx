import { HiOutlineDotsVertical } from "react-icons/hi";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";

export default function Post({ post }) {
 return (
  <div className="bg-stone-50 my-1 px-1 border-none rounded-lg">
   <div className="flex items-center p-2 border-b border-amber-200 shadow-md">
    <img src={post.profileImg} alt={post.username} className="h-10 rounded-full object-cover border-none mr-2" />
    <p className="flex-1 font-bold text-stone-800">{post.username}</p>
    <HiOutlineDotsVertical className="h-5 cursor-pointer" />
   </div>
   <img src={post.image} alt={post.caption} className="object-cover w-full transition-all hover:scale-105 duration-400 ease-in" />
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
