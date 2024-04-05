import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ActionButton from "../../common/ActionButton"
import { login } from "../../../services/operations/authAPI";

const LoginForm = ({ title, description1, description2 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-richblack-5">{title}</h2>
          <p className="md:text-xl flex flex-col text-richblack-300 my-2">
            <span>{description1}</span>
            <span>{description2}</span>
          </p>
        </div>
        <div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-2 text-richblack-5">
              Enter Email <sup>*</sup>
            </label>
            <input
              required
              className="w-full py-3 px-3 md:text-xl shadow-sm shadow-richblack-300 bg-richblack-800 text-richblack-5 rounded-lg focus:outline-none"
              type="email"
              onChange={handleOnChange}
              name="email"
              placeholder="Enter your email"
              value={FormData.email}
              id="email"
            />
          </div>
          <div className="flex flex-col ">
            <label
              className="font-semibold mt-3 mb-2 text-richblack-5"
              htmlFor="password"
            >
              Enter Password
            </label>
            <div className="flex items-center shadow-sm shadow-richblack-300 rounded-lg overflow-hidden">
              <input
                required
                className="w-full py-3 px-3 md:text-xl bg-richblack-800 text-richblack-5  focus:outline-none"
                type={showPass === true ? "text" : "password"}
                placeholder="Emter passoword"
                onChange={handleOnChange}
                name="password"
                value={FormData.password}
                id="password"
              />
              <span
                className="px-3 py-4 md:text-xl bg-richblack-800 text-richblack-5 hover:cursor-pointer "
                onClick={() => {
                  setShowPass((prev) => !prev);
                }}
              >
                {!(showPass === true) ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

        </div>
        <Link
          to="/reset-password"
          className="hover:cursor-pointer text-richblack-300 hover:text-richblack-5 focus:text-richblack-5 transition-all duration-200"
        >
          <p className=" text-end select-none ">Forgot password?</p>
        </Link>
        {/* <div > */}
          <ActionButton
            onClick={() => {
              // dispatch(setProgress(60));
            }}
            type="submit"
            active
          >
            Submit
          </ActionButton>
        {/* </div> */}
      </div>
    </form>
  );
};

export default LoginForm;
