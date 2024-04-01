import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { getUserCourses } from "../services/operations/profileAPI";
import { SyncLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const token = useSelector((state) => state.auth.token);
  const [enrolledCourses, setEnrolledCourses] = useState();

  const mockEnrolledCourses = [
    {
      id: 1,
      courseTitle: "Introduction to Programming",
      courseDescription: "Learn the basics of programming",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      totalDuration: "4 weeks",
      progressPercentage: 25,
    },
    {
      id: 2,
      courseTitle: "Web Development Fundamentals",
      courseDescription: "Explore the world of web development",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      totalDuration: "6 weeks",
      progressPercentage: 50,
    },
    {
      id: 3,
      courseTitle: "JavaScript Mastery",
      courseDescription: "Master the art of JavaScript programming",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      totalDuration: "8 weeks",
      progressPercentage: 75,
    },
    {
      id: 4,
      courseTitle: "React.js Essentials",
      courseDescription: "Learn the fundamentals of React.js",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      totalDuration: "6 weeks",
      progressPercentage: 90,
    },
    {
      id: 5,
      courseTitle: "Node.js in Action",
      courseDescription: "Discover the power of Node.js",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      totalDuration: "8 weeks",
      progressPercentage: 60,
    },
  ];

  // This is a mock function that simulates the behavior of getUserCourses
  const getUserCourses = async (token) => {
    // Simulate an asynchronous delay to mimic network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return the mock enrolled courses data
    return mockEnrolledCourses;
  };

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserCourses(token);

      setEnrolledCourses(response);
      console.log(response);
    } catch (e) {
      console.log("unable to fetch enrolled courses", e);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <section className="flex flex-col w-full px-5 gap-10 justify-center mx-auto py-10 xl:py-20">
        <h2 className="text-3xl xl:text-4xl font bold">Enrolled Courses</h2>
        <div className="flex w-full flex-col xl:flex-row gap-5 justify-between items-center bg-richblack-800 px-10 py-10 rounded-lg">
          {!enrolledCourses ? (
            <div className="flex justify-center items-center w-full ">
              <SyncLoader color="#E7C009" />
            </div>
          ) : enrolledCourses.length <= 0 ? (
            <p className="text-xl text-center w-full font-semibold text-richblack-25">Your have not enrolled in any course yet</p>
          ) : (
            <div className="flex gap-5 flex-col w-full">
              <div className="flex justify-between">
                <p className="w-4/12 text-start text-xl text-richblack-300">Course Name</p>
                <p className="w-4/12 text-center text-xl text-richblack-300">Duration</p>
                <p className="w-4/12 text-end text-xl text-richblack-300">Progress</p>
              </div>
              {/* Cards */}
              {enrolledCourses.map((course, index) => (
                <div key={index} className="flex justify-between items-center">
                  {/* Thumbnai of course */}
                  <div className="flex gap-5 w-4/12 ">
                    <img src={course.thumbnail} className="w-[100px] rounded-lg" alt="" />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl">{course.courseTitle}</h3>
                      <p className="text-richblack-300">{course.courseDescription}</p>
                    </div>
                  </div>
                  <p className="w-4/12 text-xl text-center">{course?.totalDuration}</p>
                  <div className="w-4/12 flex flex-col gap-5">
                    <p className="self-end">Progress : {course.progressPercentage || 0}</p>
                    <ProgressBar
                    bgColor={"#E7C009"}
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EnrolledCourses;
