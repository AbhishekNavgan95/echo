import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-br from-[#E7C009] to-[#e8d584] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
      {" "} 
    </span>
  );
};

export default HighlightText;
