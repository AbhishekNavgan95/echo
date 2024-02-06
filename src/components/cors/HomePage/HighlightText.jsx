import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold bg-gradient-to-br from-yellow-100 to-yellow-25 bg-clip-text text-transparent">
      {" "}
      {text}
      {" "} 
    </span>
  );
};

export default HighlightText;
