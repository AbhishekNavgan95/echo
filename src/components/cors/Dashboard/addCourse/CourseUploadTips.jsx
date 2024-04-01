import React from "react";

const CourseUploadTips = () => {

  const courseUploadTips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create and organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important",
    "Notes to all enrolled students at once.",
  ];
  
  return (
    <section className="flex flex-col xl:flex-row gap-5 justify-between items-start bg-richblack-800 px-10 py-10 rounded-lg">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl xl:text-4xl font bold">Course Upload Tips</h2>
        <ul className="flex flex-col gap-1 text-lg">
          {courseUploadTips.map((tip, index) => (
            <div key={index} className="flex gap-3 items-center">
              <span className="w-[10px] h-[10px] rounded-full bg-yellow-100"></span>
              <li>{tip}</li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CourseUploadTips;
