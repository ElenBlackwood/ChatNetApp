import React, { useState } from 'react';
import './chatList.css';
import avatarImg from '../../../assets/avatar.png';
import AddUser from './addUser/AddUser';





export default function ChatList() {
     const [addMode, setAddMode] = useState(false);
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
     <div className='item'>
          <img src={avatarImg} alt="user avatar" />
          <div className='textContainer'>
               <span>Jane Doe</span>
               <p>Hello!</p>
          </div>
     </div>
     <div className='item'>
          <img src={avatarImg} alt="user avatar" />
          <div className='textContainer'>
               <span>Jane Doe</span>
               <p>Hello!</p>
          </div>
     </div>
     <div className='item'>
          <img src={avatarImg} alt="user avatar" />
          <div className='textContainer'>
               <span>Jane Doe</span>
               <p>Hello!</p>
          </div>
     </div>
     <div className='item'>
          <img src={avatarImg} alt="user avatar" />
          <div className='textContainer'>
               <span>Jane Doe</span>
               <p>Hello!</p>
          </div>
     </div>
     <div className='item'>
          <img src={avatarImg} alt="user avatar" />
          <div className='textContainer'>
               <span>Jane Doe</span>
               <p>Hello!</p>
          </div>
     </div>
     {addMode && <AddUser />}
    </div>
  )
}
