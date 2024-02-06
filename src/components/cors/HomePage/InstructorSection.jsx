import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import { MdArrowRight } from "react-icons/md";

const InstructorSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full text-white gap-10">
      <div className="w-4/5 mx-auto lg:w-1/2 relative">
        <img src={Instructor} className="w-full z-[2] relative" alt="" />
        <div className="w-full absolute  z-[1] bg-white left-[-2%] top-[-2%] right-0 bottom-[2%]"></div>
        <div className="w-full absolute z-[0] bg-richblue-500 blur-2xl right-0 left-0 top-0 bottom-0"></div>
      </div>
      <div className="px-10 flex flex-col justify-center items-center lg:items-start gap-5 w-full lg:w-1/2">
        <div>
          <h3 className="text-4xl font-bold text-center lg:text-start">Become an </h3>
          <h3 className="text-4xl font-bold text-center lg:text-start">
            <HighlightText text={"Instructor"} />
          </h3>
        </div>
        <p className="text-xl text-richblack-300 text-center lg:text-start">
          Instructors from around the globe teach millions of students on Echo.
          We provide the tools and skills to teach what you love.
        </p>
        <CtaButton active={true} linkTo={"/signup"} >Start teaching today <MdArrowRight /></CtaButton>
      </div>
    </div>
  );
};

export default InstructorSection;
