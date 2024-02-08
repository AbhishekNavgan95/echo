import React from "react";
import { TypeAnimation } from "react-type-animation";
import text from "../assets/Logo/4041.png"
import image from "../assets/Logo/4042.png"


const Error = () => {
  return (
    <div>
      <div className="bg-richblack-900 text-richblack-300 text-bold text-5xl min-h-[calc(100vh-5rem)] flex flex-col gap-10 justify-center items-center">
        <div className="w-full flex justify-center">
          <img className="w-1/3 lg:w-1/5" src={image} alt="" />
        </div>
        <div className="w-full justify-center items-center flex flex-col xl:flex-row gap-10">
          <p className="text-center w-full"><TypeAnimation 
                    sequence={["The page you are looking for does not exist", 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={{
                        whiteSpace: "pre-line",
                        display: "block",
                    }}
                /></p>
        </div>
      </div>
    </div>
  );
};

export default Error;
