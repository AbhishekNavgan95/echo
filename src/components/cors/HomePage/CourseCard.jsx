import React from "react";

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
  return (
    <button className="relative w-full text-start">
      <div
        className={`top-0 bottom-0 left-0 right-0 h-full z-[0] absolute bg-yellow-50 translate-x-2 translate-y-2 ${
          currentCard === course.heading ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={
          currentCard === course.heading
            ? "bg-richblack-25 text-black relative z-[1] h-full transition-all duration-200 py-5 px-10 flex flex-col justify-between"
            : "bg-richblack-700 text-white h-full transition-all duration-200 py-5 px-10 flex flex-col justify-between"
        }
        onClick={() => setCurrentCard(course.heading)}
      >
        <div>
          <h3 className="text-xl font-bold">{course.heading}</h3>
          <h3 className="text-lg font-semibold py-4 text-richblack-300">
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
