import React from 'react'

const ActionLabel = ({
    use = null,
    active = false,
    children
}) => {
  return (
    <label
        className={
        `text-center flex items-center px-4 py-2 md:px-4 md:py-2 rounded-md text-sm md:text-lg active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300
        ${active 
          ? "bg-yellow-100 hover:bg-yellow-300 focus:bg-yellow-300 text-black " 
          : "bg-richblack-700 hover:bg-richblack-800 focus:bg-richblack-800 text-richblack-25"}
      `}
        htmlFor={use}
    >
        {children}
    </label>
  )
}

export default ActionLabel