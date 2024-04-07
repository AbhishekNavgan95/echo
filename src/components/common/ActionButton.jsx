import React from 'react'

const ActionButton = ({
    onClick,
    active= false,
    type = null,
    children
}) => {
  return (
    <button 
    type={type}
    className={
        `text-center flex items-center justify-center px-4 py-2 md:px-4 md:py-2 rounded-md text-sm md:text-lg active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300
        ${active 
          ? "bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black " 
          : "bg-richblack-700 hover:bg-richblack-800 focus:bg-richblack-800 text-richblack-25"}
      `}
    onClick={onClick}>{children}</button>
  )
}

export default ActionButton