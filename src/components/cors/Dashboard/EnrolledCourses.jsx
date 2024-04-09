import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { getUserCourses } from "../services/operations/profileAPI";
import { SyncLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";
import EnrolledCourseSkeleton from "../../Skeletons/EnrolledCourseSkeleton";
import { getUserCourses } from "../../../services/operations/profileAPI";

const EnrolledCourses = () => {
  const token = useSelector((state) => state.auth.token);
  const [enrolledCourses, setEnrolledCourses] = useState();

  // const mockEnrolledCourses = [
  //   {
  //     id: 1,
  //     courseTitle: "Introduction to Programming",
  //     courseDescription: "Learn the basics of programming",
  //     thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
  //     totalDuration: "4 weeks",
  //     progressPercentage: 25,
  //   },
  //   {
  //     id: 2,
  //     courseTitle: "Web Development Fundamentals",
  //     courseDescription: "Explore the world of web development",
  //     thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
  //     totalDuration: "6 weeks",
  //     progressPercentage: 50,
  //   },
  //   {
  //     id: 3,
  //     courseTitle: "JavaScript Mastery",
  //     courseDescription: "Master the art of JavaScript programming",
  //     thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
  //     totalDuration: "8 weeks",
  //     progressPercentage: 75,
  //   },
  //   {
  //     id: 4,
  //     courseTitle: "React.js Essentials",
  //     courseDescription: "Learn the fundamentals of React.js",
  //     thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
  //     totalDuration: "6 weeks",
  //     progressPercentage: 90,
  //   },
  //   {
  //     id: 5,
  //     courseTitle: "Node.js in Action",
  //     courseDescription: "Discover the power of Node.js",
  //     thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
  //     totalDuration: "8 weeks",
  //     progressPercentage: 60,
  //   },
  // ];

  // This is a mock function that simulates the behavior of getUserCourses
  
  // const getUserCourses = async (token) => {
  //   // Simulate an asynchronous delay to mimic network request
  //   await new Promise((resolve) => setTimeout(resolve, 2500));

  //   // Return the mock enrolled courses data
  //   return mockEnrolledCourses;
  // };

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserCourses(token);

      setEnrolledCourses(response);
      // console.log(response);
    } catch (e) {
      console.log("unable to fetch enrolled courses", e);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <section className="flex flex-col w-full px-5 gap-10 justify-center mx-auto py-10 md:p-1 xl:py-20">
        <h2 className="text-3xl xl:text-4xl">My Courses</h2>
        <div className="flex w-full flex-col xl:flex-row gap-5 justify-between items-center bg-richblack-800 p-5 lg:p-10 rounded-lg">
          {!enrolledCourses ? (
            <div className="flex flex-col gap-10 w-full">
              <EnrolledCourseSkeleton count={4} />
            </div>
          ) : enrolledCourses?.length <= 0
            ? <p className="text-xl text-center w-full font-semibold text-richblack-25">Your have not enrolled in any course yet</p>
            : (
              <div className="flex gap-3 flex-col w-full divide-y divide-richblack-600 ">
                {enrolledCourses?.map((course, index) => (
                  <div key={index} className="flex justify-between flex-col md:flex-row items-start py-5 gap-3">
                    <div className="flex gap-5 items-center w-full ">
                      <img src={course.thumbnail} className="aspect-square border border-richblack-600 w-[90px] md:w-[100px] rounded-lg" alt="" />
                      <div className="flex flex-col justify-center gap-1">
                        <h3 className="text-xl line-clamp-2">{course.courseTitle}</h3>
                        <p className="text-richblack-300 line-clamp-1">{course.courseDescription}</p>
                      </div>
                    </div>
                    {/* <p className="w-4/12 md:text-xl text-start md:self-center">{course?.totalDuration}</p> */}
                    <div className="flex md:items-end self-center w-full flex-col gap-3 ">
                      <p className="text-nowrap ">progress : {course.progressPercentage || 0}%</p>
                      <span className="md:block self-stretch">
                        <ProgressBar
                          bgColor={"#E7C009"}
                          completed={course.progressPercentage || 0}
                          height="8px"
                          isLabelVisible={false}
                        />
                      </span>
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
