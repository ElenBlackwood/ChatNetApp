import React from 'react';
import './userInfo.css';
import avatarImg from '../../../assets/avatar.png';
import { useUserStore } from '../../../lib/userStore';

export default function UserInfo() {
  const {currentUser} = useUserStore();

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || avatarImg} alt="user avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className='icons'>
        <i className="icon-more"></i>
        <i className="icon-video"></i>
        <i className="icon-edit"></i>
      </div>
    </div>
  )
}
