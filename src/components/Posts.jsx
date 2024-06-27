"use client";
import { useEffect, useState } from "react";
import { collection, getFirestore, orderBy, query, onSnapshot } from "firebase/firestore";
import { app } from "../firebase";
import Post from "./Post";

export default function Posts() {
 const [posts, setPosts] = useState([]);
 const db = getFirestore(app);

 useEffect(() => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
   let data = [];
   querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
   });
   setPosts(data);
  });

  return () => unsubscribe();
 }, [db]);

 return (
  <div>
   {posts.map((post) => (
    <Post key={post.id} post={post} />
   ))}
  </div>
 );
}
