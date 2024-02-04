import React from "react";
import CtaButton from "./ctaButton";
// import HighlightText from "./HighlightText";
import { MdArrowRight } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({
  position,
  heading,
  subheading,
  ctaButton1,
  ctaButton2,
  code,
  codeColor,
  gradient,
}) => {
  return (
    <div className={`flex ${position} flex-col py-5 lg:py-[5rem] gap-10 justify-between items-center`}>

        {/* text section */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/2 gap-2 text-white">
            <h2 className="my-3 text-center lg:text-start">
            {heading}
            </h2>
            <div className="text-richblack-300 text-center lg:text-start text-xl font-bold my-3">
                {subheading}
            </div>
            <div className="flex gap-4 my-3"> 
                <CtaButton active={ctaButton1.active} linkTo={ctaButton1.linkTo} >
                    <div className="flex items-center">
                    {ctaButton1.text}
                    <MdArrowRight />
                    </div>
                </CtaButton>
                <CtaButton active={ctaButton2.active} linkTo={ctaButton2.linkTo} >
                    {ctaButton2.text}
                </CtaButton>
            </div>
        </div>
        {/* code section */}
          <div className="relative flex w-full lg:w-[40%] gap-3 border border-richblack-700 bg-transparent py-3 rounded-xl text-richblack-100 text-xl">
            <div className="w-3/4 top-0 left-0 translate-x-[20%] translate-y-[20%] h-3/4 bg-richblack-700 absolute rounded-full blur-3xl z-[1]"></div>
            <div className="text-center flex flex-col w-[10%] font-inter font-bold relative z-[2]">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <div className={`w-[90%] fkex flex-col font-bold relative z-[2] font-mono ${codeColor}`}>
                <TypeAnimation 
                    sequence={[code, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={{
                        whiteSpace: "pre-line",
                        display: "block",
                    }}
                />
            </div>
        </div>
    </div>
  );
};

export default CodeBlock;
