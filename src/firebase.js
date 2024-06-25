import { initializeApp } from "firebase/app";

const firebaseConfig = {
 apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
 authDomain: "blink-427107.firebaseapp.com",
 projectId: "blink-427107",
 storageBucket: "blink-427107.appspot.com",
 messagingSenderId: "497893413138",
 appId: "1:497893413138:web:b1ae8120a447c272c363cb",
};

export const app = initializeApp(firebaseConfig);
