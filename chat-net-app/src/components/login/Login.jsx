import React, { useState } from 'react';
import './login.css';
import avatarImg from '../../assets/avatar.png';
import { toast } from 'react-toastify';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../lib/firebase.js'
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload.js';

export default function Login() {
     const [avatar, setAvatar] = useState({
          file: null,
          url: ""
     });

     const [loading, setLoading] = useState(false);
     const handleRegister = async (e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData(e.target);
          const {username, email, password} = Object.fromEntries(formData);
          console.log(username);

          try {
               const res = await createUserWithEmailAndPassword(auth, email, password);
               const imgUrl = await upload(avatar.file);

               await setDoc(doc(db, "users", res.user.uid), {
                    username,
                    email,
                    avatar: imgUrl,
                    id: res.user.uid,
                    blocked: []

               });

               await setDoc(doc(db, "userchats", res.user.uid), {
                    chats:[],
               });
               toast.success("Account created! You can log in now!");
          } catch(err) {
               console.log(err);
               toast.error(err.message);
          } finally {
               setLoading(false);
          }
     };

     const handleLogin = async e => {
          e.preventDefault();
          setLoading(true);

          const formData = new FormData(e.target);
          const {email, password} = Object.fromEntries(formData);

          try {
               await signInWithEmailAndPassword(auth, email, password);
               toast.success("Welckome back!");
          } catch (err) {
               console.log(err);
               toast.error(err.message);
          } finally {
               setLoading(false);
          }
     }

     const handleAvatar = e => {
          if(e.target.files[0]) {
          setAvatar({
               file: e.target.files[0],
               url: URL.createObjectURL(e.target.files[0])
          })
          } 
     };

  return (
    <div className='login'>
          <div className='item'>
               <h2>Welcome back!</h2>
               <form onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={loading}>
                         {loading ? "Loading" : "Sign In"}
                    </button>
               </form>
          </div>
          <div className='separator'></div>
          <div className='item'>
          <h2>Create an account!</h2>
               <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                         <img src={avatar.url || avatarImg} alt="default avatar" />
                         Upload your avatar</label>
                    <input type="file" id='file' style={{display:'none'}}  onChange={handleAvatar}/>
                    <input type="text" placeholder='Username' name='username' />
                    <input type="email" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={loading}> 
                         {loading ? "Loading" : "Sign Up"}
                    </button>
               </form>
          </div>
    </div>
  )
}
