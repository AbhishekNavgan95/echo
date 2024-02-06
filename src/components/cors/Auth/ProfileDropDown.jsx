import React from 'react'
import { TiArrowSortedDown } from "react-icons/ti";

const ProfileDropDown = () => {

  

  return (
    <div className='text-white'>
      <div className='flex  gap-2 items-center bg-richblack-500 rounded-full pr-2'>
        <div className='rounded-full w-[30px] h-[30px] bg-brown-700'></div>
        <p><TiArrowSortedDown /></p>
      </div>
    </div>
  )
}

export default ProfileDropDown