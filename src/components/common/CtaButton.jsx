import React from "react";
import { Link } from "react-router-dom";

const CtaButton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div 
        className={`text-center text-[13px] flex items-center px-4 py-2 rounded-md text-lg ${
          active ? "bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black " : "bg-richblack-700 hover:bg-richblack-800 focus:bg-richblack-800 text-white"
        } active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CtaButton;