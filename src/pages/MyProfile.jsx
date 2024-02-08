import React from "react";
import { useSelector } from "react-redux";
import CtaButton from "../components/common/CtaButton";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);

  return (
    <div className="w-full my-10">
      <div className="flex flex-col w-11/12 md:w-9/12 gap-10 justify-center  mx-auto py-10">
        <h2 className="text-3xl xl:text-4xl font bold">My Profile</h2>

        <section className="flex justify-between items-center bg-richblack-800 px-10 py-10 rounded-lg">
          <div className="flex gap-5 items-center">
            <img
              src={user.image}
              alt=""
              className="rounded-full border-2 border-richblack-100 w-[100px]"
            />
            <div className="flex flex-col gap-2">
              <h5 className="text-xl font-semibold">
                {user.firstName + " " + user.lastName}
              </h5>
              <p className="text-lg text-richblack-300">{user.accountType}</p>
            </div>
          </div>
          <div>
            <CtaButton onClick={navigate("../settings")} active={true}>
              <span className="flex gap-3 items-center">
                <FaEdit />
                Edit
              </span>
            </CtaButton>
          </div>
        </section>

        <section className="flex flex-col justify-between items-start bg-richblack-800 px-10 py-10 rounded-lg">
          <h3 className="text-2xl font-semibold">About</h3>
          <div className="flex items-center justify-between w-full mb-5">
            {/* <CtaButton onClick={navigate("../settings")} active={true}>
              <span className="flex gap-3 items-center">
                <FaEdit />
                Edit
              </span>
            </CtaButton> */}
          </div>
          <div>
            <p className="text-xl">{user.additionalDetails.about ?? "You haven't added your Bio yet!"}</p>
          </div>
        </section>

        <section className="flex flex-col justify-between items-start bg-richblack-800 px-10 py-10 rounded-lg">
          <div className="flex items-center justify-between w-full mb-5">
            <h4 className="text-2xl font-semibold">Personal Details</h4>
            {/* <CtaButton onClick={navigate("../settings")} active={true}>
              <span className="flex gap-3 items-center">
                <FaEdit />
                Edit
              </span>
            </CtaButton> */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full py-2 gap-5">
            <div className="w-full py-1 flex flex-col gap-1">
              <h4 className="text-lg text-richblack-300">Full Name</h4>
              <p className="text-semibold text-xl">
                {user.firstName + " " + user.lastName}
              </p>
            </div>
            <div className="w-full py-1 flex flex-col gap-1">
              <h4 className="text-lg text-richblack-300">Gender</h4>
              <p className="text-semibold text-xl">
                {user.additionalDetails.gender ?? "Please add your your Gender"}
              </p>
            </div>
            <div className="w-full py-1 flex flex-col gap-1">
              <h4 className="text-lg text-richblack-300">Email</h4>
              <p className="text-semibold text-xl">
                {user.email ?? "Please add your Email"}
              </p>
            </div>
            <div className="w-full py-1 flex flex-col gap-1">
              <h4 className="text-lg text-richblack-300">Contact Number</h4>
              <p className="text-semibold text-xl">
                {user.additionalDetails.contactNumber ??
                  "Please add your contact number"}
              </p>
            </div>
            <div className="w-full py-1 flex flex-col gap-1">
              <h4 className="text-lg text-richblack-300">Courses Entrolled</h4>
              <p className="text-semibold text-xl">{user.courses.length}</p>
            </div>
            <div className="w-full py-1 flex flex-col gap-1">
              <h4 className="text-lg text-richblack-300">Data Of Birth</h4>
              <p className="text-semibold text-xl">
                {
                user.additionalDetails.DOB ?? 
                  "Please add your Date of Birth"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
