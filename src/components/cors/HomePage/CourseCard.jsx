import React from "react";

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
  return (
    <button className="relative w-full text-start">
      <div
        className={`top-0 bottom-0 left-0 right-0 h-full z-[0] absolute bg-richblack-700 translate-x-2 translate-y-2 ${
          currentCard === course.heading ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={
          currentCard === course.heading
            ? "bg-richblack-5 border border-richblack-600 text-richblack-900 relative z-[1] h-full transition-all duration-300 p-5 flex flex-col justify-between gap-3"
            : "bg-richblack-700  border border-richblack-600 text-richblack-5 h-full transition-all duration-300 p-5 flex flex-col justify-between gap-3"
        }
        onClick={() => setCurrentCard(course.heading)}
       >
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold">{course.heading}</h3>
          <h3 className="text-lg font-semibold  text-richblack-300 line-clamp-4">
            {course.description}
          </h3>
        </div>
        <div className="flex justify-between border-t pt-4 mt-4 border-dashed">
          <p className="text-lg">{course.level}</p>
          <p className="text-lg">{course.lessionNumber} lessons</p>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
