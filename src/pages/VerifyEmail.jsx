import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { TiArrowSync } from "react-icons/ti";
import OTPInput from "react-otp-input";
import { signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const signUpData = useSelector((state) => state.auth.signupData);
  //   console.log("signup data : ",signUpData)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup")
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="text-richblack-5 flex justify-center items-center min-h-[calc(100vh-5rem)]">
      <form onSubmit={handleOnSubmit}>
        {loading ? (
          <SyncLoader color="#E7C009" />
        ) : (
          <div className="">
            <h1 className="text-3xl xl:text-4xl font-bold">Verify Email</h1>
            <div className="py-5">
              <p className="text-xl text-richblack-300">
                A varification code has been sent to your email
              </p>
              {/* <p className="text-xl text-richblack-300">Enter the code below</p> */}
            </div>
            <div className="text-richblack-5">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                containerStyle="flex justify-between gap-4 "
                renderInput={(props) => <input {...props}
                  className="px-7 rounded-lg py-5 border outline-yellow-100 bg-richblack-800 border-richblack-600 hover:outline text-richblack-900 "
                />}
              />
              <button className="mt-6 w-full rounded-lg bg-yellow-100 hover:bg-yellow-200 focus:bg-yellow-200 focus:outline-none transition-all duration-200 active:scale-95 py-2 font-medium text-richblack-900">
                Verify Email
              </button>
            </div>
            <div className="py-5 flex items-center text-xl justify-between">
              <Link to={"/login"} className=" text-richblack-300 hover:text-richblack-5 focus:text-richblack-5 transition-all duration-200">
                <p className="  items-center flex">
                  <MdArrowBackIos /> Back to Login
                </p>
              </Link>
              <button className="flex items-center gap-2 text-richblack-300 focus:text-richblack-5 hover:text-richblack-5 transition-all duration-200" onClick={() => dispatch(sendOtp(signUpData.email))}>
                <TiArrowSync /> Resent OTP
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default VerifyEmail;
