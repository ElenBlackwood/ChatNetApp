import React, { useEffect, useState } from 'react';
import './chatList.css';
import avatarImg from '../../../assets/avatar.png';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { useChatStore } from '../../../lib/chatStore';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../lib/firebase';

export default function ChatList() {
     const [addMode, setAddMode] = useState(false);
     const [input, setInput] = useState("");
     const [chats, setChats] = useState([]);
     const {currentUser} = useUserStore()
     const {chatId, changeChat} = useChatStore()

     useEffect(() => {
          const unSub = onSnapshot(doc(db, "userchats", currentUser.id), 
          async(res) => {
               const items = res.data().chats;
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
     }, [currentUser.id]);

     const handleSelect = async (chat) => {
          const userChats = chats.map(item => {
               const {user, ...rest} = item;
               return rest;
          });

          const chatIndex = userChats.findIndex((item)=> item.chatId === chat.chatId);
          userChats[chatIndex].isSeen = true;
          const userChatsRef = doc(db, "userchats", currentUser.id);

          try {
               await updateDoc(userChatsRef, {
                    chats: userChats,

               });
               changeChat(chat.chatId, chat.user);
          } catch (err) {
               console.log(err);
          }
     };

     const filteredChats = chats.filter((c)=> 
          c.user.username.toLowerCase().includes(input.toLowerCase()
     ));

     return (
     <div className='chatList'>
          <div className='search'>
               <div className='searchBar'>
                    <i className="icon-search"></i>
                    <input 
                         type="text" 
                         placeholder="Search" 
                         onChange={(e) => setInput(e.target.value)}  
                    />
               </div>
               <div 
                    className='add' 
                    onClick={() => setAddMode(prev => !prev)}>
                    {addMode ? <i className="icon-minus"></i> : <i className="icon-plus"></i>}
               </div>
          </div>
          {filteredChats.map((chat) => (
               <div 
                    className='item' 
                    key={chat.chatId} 
                    onClick={()=> handleSelect(chat)} 
                    style={{
                         backgroundColor: chat?.isSeen ? "transparent" : "#bb51fe61"
          }}>
                    <img src = 
                         {chat.user.blocked.includes(currentUser.id) 
                         ? avatarImg 
                         : chat.user.avatar || avatarImg} 
                         alt="user avatar" 
                    />
                    <div className='textContainer'>
                         <span>
                              {chat.user.blocked.includes(currentUser.id) 
                              ? "User" 
                              : chat.user.username}
                         </span>
                         <p>{chat.lastMessage}</p>
                    </div>
               </div>
          ))}
          {addMode && <AddUser />} 
    </div>
  )
}
