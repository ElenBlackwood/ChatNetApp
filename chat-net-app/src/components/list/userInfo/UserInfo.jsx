import React from 'react';
import './userInfo.css';
import avatarImg from '../../../assets/avatar.png';

export default function UserInfo() {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={avatarImg} alt="user avatar" />
        <h2>John Doe</h2>
      </div>
      <div className='icons'>
       <i class="icon-more"></i>
       <i class="icon-video"></i>
       <i class="icon-edit"></i>


      </div>
    </div>
  )
}
