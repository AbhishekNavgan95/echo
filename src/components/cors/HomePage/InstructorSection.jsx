import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "../../common/HighlightText";
import CtaButton from "../../common/CtaButton";
import { MdArrowRight } from "react-icons/md";

const InstructorSection = () => {
  return (
    <div className="flex group flex-col lg:flex-row justify-between w-full text-white gap-10">
      <div className="w-5/6 mx-auto lg:w-1/2 relative">
        <div className="overflow-hidden">
          <img src={Instructor} className="group-hover:scale-105 transition-scale duration-300 delay-100 w-full z-[2] relative" alt="" />
        </div>
        <div className="w-full absolute  z-[1] bg-white left-[-2%] top-[-2%] right-0 bottom-[2%]"></div>
        <div className="w-full absolute z-[0] bg-richblue-500 blur-2xl right-0 left-0 top-0 bottom-0"></div>
      </div>
      <div className="px-2 flex flex-col justify-center items-center lg:items-start gap-5 w-full lg:w-1/2">
        <div className="flex gap-3">
          <h3 className="text-3xl xl:text-4xl  font-bold text-center lg:text-start">Become an <HighlightText text={"Instructor"} /></h3>
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
