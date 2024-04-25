import React from 'react'

const ActionButton = ({
    onClick,
    active= false,
    disabled = false,
    type = null,
    children,
}) => {
  return (
  <button 
  disabled={disabled}
    type={type}
    className={
        `text-center text-nowrap flex items-center justify-center px-4 py-2 md:px-4 md:py-2 rounded-md text-sm md:text-lg active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300
        ${active 
          ? "bg-yellow-100 hover:bg-yellow-300 focus:bg-yellow-300 text-black " 
          : "bg-richblack-700 hover:bg-richblack-800 focus:bg-richblack-800 text-richblack-25"}
          ${disabled ? "bg-yellow-600 cursor-not-allowed hover:bg-yellow-600 focus:bg-yellow-600 active:scale-100" : ""}
          `}
    onClick={onClick}
    >{children}</button>
  )
}

export default ActionButton