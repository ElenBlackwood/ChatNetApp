import React, { useState } from 'react';
import './addUser.css';

import avatarImg from '../../../../assets/avatar.png';


import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../../lib/firebase';



export default function AddUser() {

     const [user, setUser] = useState(null)


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
          <button>Add user</button>

     </div>}
    </div>
  )
}
