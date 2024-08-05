import React, { useState } from 'react';
import './chat.css';
import avatarImg from '../../assets/avatar.png';

import EmojiPicker from 'emoji-picker-react';




export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");


  const handleEmoji = e => {
    setText((prev)=> prev + e.emoji);
    setOpen(false);
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

        <div className='message'>
          <img src={avatarImg} alt="user avatar" />
          <div className="textContainer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, dolore aspernatur facere est dolorem sapiente expedita corporis possimus optio in. Nobis debitis, corporis numquam officiis eveniet impedit libero aut harum.</p>
          <span>1 min ago</span>
         </div>
        </div>
        <div className='message own'>
         <div className="textContainer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, dolore aspernatur facere est dolorem sapiente expedita corporis possimus optio in. Nobis debitis, corporis numquam officiis eveniet impedit libero aut harum.</p>
          <span>1 min ago</span>
         </div>
        </div>
        <div className='message'>
         <img src={avatarImg} alt="user avatar" />
         <div className="textContainer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, dolore aspernatur facere est dolorem sapiente expedita corporis possimus optio in. Nobis debitis, corporis numquam officiis eveniet impedit libero aut harum.</p>
          <span>1 min ago</span>
         </div>
        </div>
        <div className='message own'>
         <div className="textContainer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, dolore aspernatur facere est dolorem sapiente expedita corporis possimus optio in. Nobis debitis, corporis numquam officiis eveniet impedit libero aut harum.</p>
          <span>1 min ago</span>
         </div>
        </div>
        <div className='message'>
         <img src={avatarImg} alt="user avatar" />
         <div className="textContainer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, dolore aspernatur facere est dolorem sapiente expedita corporis possimus optio in. Nobis debitis, corporis numquam officiis eveniet impedit libero aut harum.</p>
          <span>1 min ago</span>
         </div>
        </div>
        <div className='message own'>
         <div className="textContainer">
          <img src='https://images.pexels.com/photos/13599879/pexels-photo-13599879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='picture'/>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, dolore aspernatur facere est dolorem sapiente expedita corporis possimus optio in. Nobis debitis, corporis numquam officiis eveniet impedit libero aut harum.</p>
          <span>1 min ago</span>
         </div>
        </div>
        

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
        <button className='sendButton'>Send</button>
      </div>

    </div>
  )
}
