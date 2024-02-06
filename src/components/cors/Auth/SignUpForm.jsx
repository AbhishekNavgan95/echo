import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import CtaButton from "../HomePage/CtaButton";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

const SignupForm = ({
  accountType,
  setAccountType,
  title,
  description1,
  description2,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // account type
  // const [accountType, setAccountType] = useState("Student");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    // setAccountType(ACCOUNT_TYPE.STUDENT)
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-xl flex flex-col text-richblack-300 my-2">
            <span>{description1}</span>
            <span>{description2}</span>
          </p>
        </div>
        <div className="bg-richblack-800 px-2 rounded-full py-2 text-white w-max my-3 flex gap-2">
          <div
            onClick={() => setAccountType("Student")}
            className={
              accountType === "Student"
                ? "px-7 py-2  bg-richblack-900 rounded-full hover:bg-richblack-900 transition-color duration-300 "
                : "px-7 py-2  bg-richblack-800 rounded-full hover:bg-richblack-900 transition-color duration-300 "
            }
          >
            Student
          </div>
          <div
            onClick={() => setAccountType("Instructor")}
            className={
              accountType === "Instructor"
                ? "px-7 py-2 bg-richblack-900 rounded-full hover:bg-richblack-900 transition-color duration-300 "
                : "px-7 py-2 bg-richblack-800 rounded-full hover:bg-richblack-900 transition-color duration-300 "
            }
          >
            Intructor
          </div>
        </div>
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="font-semibold my-3 text-white"
            >
              First Name
            </label>
            <input
              required
              className="w-full py-3 px-3 text-xl bg-richblack-800 text-white rounded-lg focus:outline-none"
              type="text"
              placeholder="First Name"
              onChange={handleOnChange}
              name="firstName"
              value={FormData.firstName}
              id="firstName"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold my-3 text-white">
              Last Name
            </label>
            <input
              required
              className="w-full py-3 px-3 text-xl bg-richblack-800 text-white rounded-lg focus:outline-none"
              type="text"
              placeholder="Last Name"
              onChange={handleOnChange}
              name="lastName"
              value={FormData.lastName}
              id="lastName"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold mt-3 mb-2 text-white">
            Enter Email <sup>*</sup>
          </label>
          <input
            required
            className="w-full py-3 px-3 text-xl bg-richblack-800 text-white rounded-lg focus:outline-none"
            type="email"
            placeholder="Email"
            onChange={handleOnChange}
            name="email"
            value={FormData.email}
            id="email"
          />
        </div>
        <div className="flex gap-4 my-3">
          <div className="flex flex-col gap-2">
            <label className="font-semibold  text-white" htmlFor="password">
              Password
            </label>
            <div className="flex items-center">
              <input
                required
                placeholder="password"
                className="w-full py-3 px-3 text-xl rounded-s-lg bg-richblack-800 text-white focus:outline-none "
                type={showPass === true ? "text" : "password"}
                onChange={handleOnChange}
                name="password"
                value={FormData.password}
                id="password"
              />
              <span
                className="px-3 py-4 text-xl bg-richblack-800 text-white hover:cursor-pointer rounded-e-lg"
                onClick={() => {
                  setShowPass((prev) => !prev);
                }}
              >
                {!(showPass === true) ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold  text-white"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <input
                required
                placeholder="cofirm password"
                className="w-full py-3 px-3 text-xl rounded-s-lg bg-richblack-800 text-white focus:outline-none "
                type={showConfirmPass === true ? "text" : "password"}
                onChange={handleOnChange}
                name="confirmPassword"
                value={FormData.confirmPassword}
                id="confirmPassword"
              />
              <span
                className="px-3 py-4 text-xl bg-richblack-800 text-white hover:cursor-pointer rounded-e-lg"
                onClick={() => {
                  setShowConfirmPass((prev) => !prev);
                }}
              >
                {!(showConfirmPass === true) ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          // onClick={()=>{dispatch(setProgress(60))}}
          className="mt-6 w-full rounded-lg bg-yellow-50 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none transition-all duration-200 hover:scale-95 focus:scale-95 py-2 font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
