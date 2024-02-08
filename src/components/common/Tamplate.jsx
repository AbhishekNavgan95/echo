import React, { useState } from "react";
import SignupForm from "../cors/Auth/SignUpForm";
import LoginForm from "../cors/Auth/LoginForm";
import signup from "../../assets/Images/signup.webp";
import HighlightText from "../common/HighlightText";
import login from "../../assets/Images/login.webp";
import frame from "../../assets/Images/Frame.png";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

const Tamplate = ({ formType }) => {
  const loading = useSelector((state) => state.auth.loading);
  const [accountType, setAccountType] = useState("Student");

  return (
    <div className="flex justify-center  min-h-[calc(100vh-5rem)] items-center">
      {loading ? (
                  <SyncLoader color="#E7C009" />
      ) : (
        <div className="max-w-maxContent py-28 mx-auto gap-10 items-center justify-between flex flex-col xl:flex-row">
          <div className="flex flex-col gap-3 xl:w-2/5 md:w-8/12 w-10/12">
            {formType === "login" ? (
              <LoginForm
                title={"Welcome Back"}
                description1={"Build skills for today, tomorrow, and beyond."}
                description2={"Education to future-proof your career."}
              />
            ) : (
              <SignupForm
                accountType={accountType}
                setAccountType={setAccountType}
                title={
                  "Join the millions learning to code with StudyNotion for free"
                }
                description1={"Build skills for today, tomorrow, and beyond."}
                description2={"Education to future-proof your career."}
              />
            )}
          </div>

          <div className="relative  xl:w-2/5 hidden md:block md:w-8/12 w-11/12">
            <div className="relative">
              <img
                className="object-cover border-2 shadow-2xl border-white relative z-[2] w-full"
                src={!(formType === "login")? signup : login}
                alt=""
              />
              <img
                src={frame}
                className="w-full h-full bg-white top-0 z-[1] translate-x-6 translate-y-4 absolute"
              />
              <div className="w-full h-full bg-richblack-500 top-0 z-[1] blur-3xl absolute"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tamplate;
