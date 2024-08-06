import React from 'react';
import './addUser.css';

import avatarImg from '../../../../assets/avatar.png';


export default function AddUser() {
  return (
    <div className='addUser'>
     <form>
          <input type="text" placeholder='Username' name='username' />
          <button>Search</button>
     </form>
     <div className="user">
          <div className="detail">
               <img src={avatarImg} alt="user avatar" />
               <span>Jane Doe</span>
          </div>
          <button>Add user</button>

     </div>
    </div>
  )
}
