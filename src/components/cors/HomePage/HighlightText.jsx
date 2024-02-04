import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold bg-gradient-to-br from-blue-500 to-blue-25 bg-clip-text text-transparent">
      {" "}
      {text}
      {" "} 
    </span>
  );
};

export default HighlightText;
