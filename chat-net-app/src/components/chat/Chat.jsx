import React, { useEffect, useState, useRef } from 'react';
import './chat.css';
import avatarImg from '../../assets/avatar.png';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';


export default function Chat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: ""
  });

  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore();
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

  const handleImg = e => {
    if(e.target.files[0]) {

    setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
    })
    } 
};

  const handleSend = async () => {
    if(text === "") return;
    let imgUrl = null;

    try {
      if(img.file) {
        imgUrl = await upload (img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if(userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId)
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          }
          )
        }
      });
    } catch (err) {
      console.log(err);
    };

    setImg({
      file: null,
      url: "",
    })

    setText("");
  };

  return (
    <div className='chat'>
      {/* TOP */}
      <div className='top'>
        <div className='user'>
          <img src={user?.avatar || avatarImg} alt="user avatar" />
          <div className='textContainer'>
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
          <div className='icons'>
            <i className="icon-more"></i>
            <i className="icon-video"></i>
            <i className="icon-edit"></i>
          </div>
        </div>
        <div className='icons'></div>
      </div>
      {/* CENTER */}
      <div className='center'>
        {chat?.messages?.map((message) => (
          <div className=
            {message.senderId === currentUser.id 
            ? "message own" 
            : "message"} 
            key={message?.createdAt}>
          <div className="textContainer">
            {message.img && <img src={message.img} alt='picture'/>}
            <p>{message.text}</p>
            {/* <span>{message.createdAt}</span> */}
          </div>
        </div>
          ))}
        {img.url && 
          <div className="message own">
            <div className="textContainer">
              <img src={img.url} alt="" />
            </div>
          </div>
        }
        <div ref={endRef}></div>
      </div>
      {/* BOTTOM */}
      <div className='bottom'>
        <div className='icons'>
          <label htmlFor="file">
            <i className="icon-attach"></i>
          </label>
            <input type="file" id="file" style={{
              display: "none"
            }} 
            onChange={handleImg}/>
          <i className="icon-video"></i>
          <i className="icon-mic"></i>
        </div>
        <input 
          type="text" 
          placeholder={
            (isCurrentUserBlocked || isReceiverBlocked) 
            ? "You cannot send a message" 
            : "Type a message..."} 
          value={text} 
          onChange={e=>setText(e.target.value)} 
          disabled={isCurrentUserBlocked || isReceiverBlocked}/>
        <div className='emoji'>
          <i onClick={()=>setOpen(prev=>!prev)} className="icon-emoji"></i>
          <div className='picker'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button 
          className='sendButton' 
          onClick={handleSend} 
          disabled={isCurrentUserBlocked || isReceiverBlocked}>
            Send
        </button>
      </div>
    </div>
  )
}
