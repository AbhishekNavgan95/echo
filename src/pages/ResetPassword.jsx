import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdArrowBackIos, MdDisabledByDefault } from "react-icons/md";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { SyncLoader } from "react-spinners";

const ResetPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <form onSubmit={handleOnSubmit} className="">
      <div className="flex justify-center  min-h-[calc(100vh-5rem)] items-center">
        {loading ? (
          <SyncLoader color="#E7C009" />
        ) : (
          <div className="w-[100%] md:max-w-[60%] lg:max-w-[28%]">
            <p className="text-3xl font-bold text-white ">
              {!emailSent ? "Reset Your Password." : "Check Your Email."}
            </p>
            <div className="text-xl font-semibold text-richblack-300">
              {!email ? (
                <div className="pt-3">
                  <p>
                    Have no fear. we'll email you instructions to reset your
                    password. If you dont have access to your email we can try
                    account recovery
                  </p>
                </div>
              ) : (
                <div>
                  <p>We have sent the reset email to {email}</p>
                </div>
              )}
            </div>
            {!emailSent ? (
              <div className="flex flex-col my-1">
                <label className="text-white my-3">Email Address</label>
                <div className="flex shadow-sm items-center shadow-richblack-100 rounded-xl overflow-hidden">
                  <input
                    className="hover:outline-none w-full text-white focus:outline-none py-3 px-4 text-xl bg-richblack-700"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span
                    className="hover:outline-none text-xl text-white focus:outline-none py-4 px-4 bg-richblack-700"
                    onClick={() => {
                      setShowPass((prev) => !prev);
                    }}
                  >
                    {!(showPass === true) ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
              </div>
            ) : null}
            <button
              type="submit"
              className="w-full bg-yellow-50 hover:bg-yellow-100 focus:bg-yellow-100 transition-all duration-200 hover:scale-95 focus:scale-95 hover:outline-none focus:outline-none py-2 text-richblack-900 font-semibold mt-5 rounded-lg text-center"
            >
              {!emailSent ? "Reset Password" : "Resend Password"}
            </button>
            <Link to="/login" className="  items-center text-richblack-100 hover:text-white focus:text-white transition-all duration-200">
            <div className="mt-5 flex gap-3 items-center">
                <MdArrowBackIos />
                Back to Log in
            </div>
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};

export default ResetPassword;
