import React from "react";
import RenderSteps from "./addCourse/RenderSteps";
import CourseUploadTips from "./addCourse/CourseUploadTips";

const AddCourse = () => {

  return (
    <div className="w-full">
      <div className="flex flex-col w-11/12 md:w-9/12 gap-10 justify-center mx-auto py-10 xl:py-20">
        <h2 className="text-3xl xl:text-4xl font bold">Add Course</h2>

        {/* course upload form */}
        <div>
          <RenderSteps />
        </div>

        {/* course upload Tips */}
        <div>
            <CourseUploadTips />
        </div>

      </div>
    </div>
  );
};

export default AddCourse;
