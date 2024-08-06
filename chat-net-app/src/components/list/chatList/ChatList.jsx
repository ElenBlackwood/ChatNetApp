import React, { useEffect, useState } from 'react';
import './chatList.css';
import avatarImg from '../../../assets/avatar.png';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../../lib/firebase';



export default function ChatList() {
     const [addMode, setAddMode] = useState(false);
     const [chats, setChats] = useState([]);


     const {currentUser} = useUserStore()

     useEffect(() => {

          const unSub = onSnapshot(doc(db, "userchats", currentUser.id), 
          async(res) => {
              const items = res.doc().chats;

              const promises = items.map( async (item) =>{
               const userDocRef = doc(db, "users", item.receiverId);
               const userDocSnap = await getDoc(userDocRef);

               const user = userDocSnap.data();


               return {...item, user};
              });


              const chatData = await Promise.all(promises);

              setChats(chatData.sort((a,b) => b.updateAt - a.updateAt));

          }
     );

          return () => {
               unSub()
          }
     }, [])


  return (
    <div className='chatList'>
     <div className='search'>
          <div className='searchBar'>
               <i class="icon-search"></i>
               <input type="text" placeholder='Search' />
          </div>
          <div className='add' onClick={() => setAddMode(prev => !prev)}>
          {addMode ? <i className="icon-minus"></i> : <i className="icon-plus"></i>}
        </div>
     </div>
     {chats.map((chat) => (
          <div className='item' key={chat.chatId}>
               <img src={avatarImg} alt="user avatar" />
               <div className='textContainer'>
                    <span>Jane Doe</span>
                    <p>{chat.lastMessage}</p>
               </div>
          </div>
     ))}
     
     {addMode && <AddUser />} 
    </div>
  )
}
