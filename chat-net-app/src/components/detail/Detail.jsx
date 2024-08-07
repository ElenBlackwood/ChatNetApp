import React from 'react';
import './detail.css';

import avatarImg from '../../assets/avatar.png';


import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { auth, db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { useChatStore } from '../../lib/chatStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';



export default function Detail() {
  const {checkActionCode, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
  const {currentUser} = useUserStore();

  const handleBlock = async () => {
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
      
    }


  }



  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || avatarImg} alt="avatar" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={arrowUp} alt="arrow up icon" />
            {/* <i class="icon-arrowUp"></i> */}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src={arrowUp} alt="arrow up icon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Media</span>
            <img src={arrowDown} alt="arrow up icon" />
            {/* <i class="icon-arrowDown"></i> */}

          </div>
          <div className="media">
            
            <div className="mediaItem">
              <div className="mediaDetail">
                <img src="https://images.pexels.com/photos/13599879/pexels-photo-13599879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <i class="icon-download"></i>
            </div>
            <div className="mediaItem">
              <div className="mediaDetail">
                <img src="https://images.pexels.com/photos/13599879/pexels-photo-13599879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <i class="icon-download"></i>
            </div>
            <div className="mediaItem">
              <div className="mediaDetail">
                <img src="https://images.pexels.com/photos/13599879/pexels-photo-13599879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <i class="icon-download"></i>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src={arrowUp} alt="arrow up icon" />
            {/* <i class="icon-arrowUp"></i> */}
          </div>
        </div>
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ? "YOU ARE BLOCKED!" : isReceiverBlocked ? "User blocked" : "Block user" 
        }</button>
        <button className='logout' onClick={() => auth.signOut()}>LOGOUT</button>

      </div>
    </div>
  )
}
