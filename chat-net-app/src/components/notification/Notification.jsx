import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
  return (
    <div className=''>
      <ToastContainer position='bottom-right' />
    </div>
  )
}
