import React from "react";
import { Link } from "react-router-dom";

const CtaButton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <button
        className={`text-center text-[13px] flex items-center px-def py-2 rounded-md text-lg ${
          active ? "bg-yellow-50 text-black " : "bg-richblack-700 text-white"
        } hover:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300`}
      >
        {children}
      </button>
    </Link>
  );
};

export default CtaButton;