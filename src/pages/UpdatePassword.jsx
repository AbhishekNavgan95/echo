import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    console.log("token : ", token)
    console.log(token);
    dispatch(resetPassword(formData.password, formData.confirmPassword, token));
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-5rem)] items-center">
      {loading ? (
        <div className="text-4xl text-center text-pink-300">Loading...</div>
      ) : (
        <form onSubmit={handleOnSubmit} className="">
          <div className="text-white">
            <h1 className="text-4xl font-bold">Choose new passowrd</h1>
            <p className="text-xl py-3 font-semibold text-richblack-300">
              Almost done, Enter your new password and you are all set.
            </p>
            <div className="flex flex-col">
              <label htmlFor="" className="text-white">
                New password<sup>*</sup>
              </label>
              <div className="flex mt-3 shadow-sm items-center shadow-richblack-100 rounded-xl overflow-hidden">
                <input
                  name="password"
                  value={formData.password}
                  type={!showPass ? "password" : "text"}
                  onChange={handleOnChange}
                  required
                  className="bg-richblack-700 w-full py-3 px-4 text-xl hover:outline-none focus:outline-none"
                  placeholder="Password"
                />
                <span
                  className="px-4 py-4 text-xl bg-richblack-700 text-white hover:cursor-pointer rounded-e-xl"
                  onClick={() => {
                    setShowPass((prev) => !prev);
                  }}
                >
                  {!(showPass === true) ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <div className="flex flex-col my-3">
              <label htmlFor="">
                confirm password<sup>*</sup>
              </label>
              <div className="flex mt-3 shadow-sm items-center shadow-richblack-100 rounded-xl overflow-hidden">
                <input
                  type={!showConfirmPass ? "password" : "text"}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="bg-richblack-700 w-full py-3 px-4 text-xl hover:outline-none focus:outline-none"
                  placeholder="Confirm Password"
                />
                <span
                  className="px-4 py-4 text-xl bg-richblack-700 text-white hover:cursor-pointer rounded-e-xl"
                  onClick={() => {
                    setShowConfirmPass((prev) => !prev);
                  }}
                >
                  {!(showConfirmPass === true) ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )}
                </span>
              </div>
            </div>
            <button
              className="w-full bg-yellow-50 mt-4 hover:bg-yellow-100 transition-all duration-100 focus:bg-yellow-100 rounded-xl py-3 text-richblack-900 font-semibold"
              type="submit"
            >
              Reset password
            </button>
            <div className="pt-3 text-richblack-300 hover:text-white transition-all duration-200">
              <Link to="/login" className="flex gap-2 items-center">
                {" "}
                <MdArrowBackIos />
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdatePassword;
