import React, { useEffect, useState } from 'react'
import { TbNotification } from "react-icons/tb";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className='flex justify-between'>
        <div className='m-2 font-bold text-2xl text-[#FFC0CB] italic'>Hiring Portal</div>
        {/* <div className='m-2'>Logout</div> */}
        {/* {user && <TbNotification className='m-2 text-2xl' />} */}
    </div>
  )
}

export default Navbar