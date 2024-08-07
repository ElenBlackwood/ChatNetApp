import React, { useEffect, useState, useRef } from 'react';
import './chat.css';
import avatarImg from '../../assets/avatar.png';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';




export default function Chat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const {chatId, user} = useChatStore();
  const {currentUser} = useUserStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"});

  },[]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    })

    return () => {
      unSub();
    }

  }, [chatId]);

  const handleEmoji = e => {
    setText((prev)=> prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if(text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        })
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userhats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if(userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId)
          userChatsData[chatIndex].lastMessage = text;
          userChatsData[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData[chatIndex].updatedAt = Date.now();


          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          }
          )
        }
      });
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='chat'>
      {/* TOP */}

      <div className='top'>
        <div className='user'>
          <img src={avatarImg} alt="user avatar" />
          <div className='textContainer'>
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
          <div className='icons'>
            <i class="icon-more"></i>
            <i class="icon-video"></i>
            <i class="icon-edit"></i>
      </div>

        </div>
        <div className='icons'></div>

      </div>
      {/* CENTER */}

      <div className='center'>
        {
          chat?.messages?.map((message) => (
          
          <div className='message own' key={message?.createdAt}>
          <div className="textContainer">
            {message.img && <img src={message.img} alt='picture'/>}
            <p>{message.text}</p>
            {/* <span>{message.createdAt}</span> */}
          </div>
        </div>
          ))}
        
        
        
        <div ref={endRef}></div>
      
      </div>

      {/* BOTTOM */}
      <div className='bottom'>
        <div className='icons'>
          <i class="icon-attach"></i>
          <i class="icon-video"></i>
          <i class="icon-mic"></i>
        </div>
        <input type="text" placeholder='Type a message...' value={text} onChange={e=>setText(e.target.value)}/>
        <div className='emoji'>
          <i onClick={()=>setOpen(prev=>!prev)} className="icon-emoji"></i>
          <div className='picker'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />

          </div>
        </div>
        <button className='sendButton'  onClick={handleSend}>Send</button>
      </div>

    </div>
  )
}
