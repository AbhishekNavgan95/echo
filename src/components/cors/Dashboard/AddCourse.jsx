import React from "react";
import RenderSteps from "./addCourse/RenderSteps";
import CourseUploadTips from "./addCourse/CourseUploadTips";

const AddCourse = () => {

  return (
    <div className="w-full">
      <div className="flex flex-col w-full px-5 gap-10 justify-center mx-auto py-10 xl:py-20">
        <h2 className="text-3xl xl:text-4xl w-full">Add Course</h2>

        <div className="flex flex-col xl:flex-row justify-between w-full gap-5">
        {/* course upload form */}
        <div className="xl:w-7/12">
          <RenderSteps />
        </div>

        {/* course upload Tips */}
        <div className="xl:w-5/12 top-100">
            <CourseUploadTips />
        </div>
        </div>

      </div>
    </div>
  );
};

export default AddCourse;
