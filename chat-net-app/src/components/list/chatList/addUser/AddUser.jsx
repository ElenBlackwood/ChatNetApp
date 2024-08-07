import React, { useState } from 'react';
import './addUser.css';

import avatarImg from '../../../../assets/avatar.png';


import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../../../lib/firebase';
import {useUserStore} from "../../../../lib/userStore"



export default function AddUser() {

     const [user, setUser] = useState(null);

     const {currentUser} = useUserStore();


     const handleSearch = async e => {
          e.preventDefault()

          const formData = new FormData(e.target);

          const username = formData.get("username")

          try {
               const usersRef = collection(db, "users");

               // Create a query against the collection.
               const q = query(usersRef, where("username", "==", username));

               const querySnapShot = await getDocs(q);

               if(!querySnapShot.empty) {
                    setUser(querySnapShot.docs[0].data());

               }else {
                    setUser(null);
                    console.log("No user found with that username.");
               }

               
          } catch (err) {
               console.log(err)
               
          };

     };

     const handleAdd = async () => {
          

          const chatRef = collection(db, "chats");  
          const userChatsRef = collection(db, "userchats");

          try {
               const newChatRef = doc(chatRef);


               await setDoc(newChatRef, {
                    createdAt: serverTimestamp(),
                    message: [],
               });


               await updateDoc(doc(userChatsRef, user.id), {
                    chats: arrayUnion({
                         chatId: newChatRef.id,
                         lastMessage: "",
                         receiverId: currentUser.id,
                         updateAt: Date.now(),
                    }),
               });

               await updateDoc(doc(userChatsRef, currentUser.id), {
                    chats: arrayUnion({
                         chatId: newChatRef.id,
                         lastMessage: "",
                         receiverId: user.id,
                         updateAt: Date.now(),
                    }),
               });

               
          } catch (err) {
               console.log(err);
               
          }
     }


  return (
    <div className='addUser'>
     <form onSubmit={handleSearch}>
          <input type="text" placeholder='Username' name='username' />
          <button>Search</button>
     </form>
     {user && <div className="user">
          <div className="detail">
               <img src={user.avatar || avatarImg} alt="user avatar" />
               <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add user</button>

     </div>}
    </div>
  )
}
