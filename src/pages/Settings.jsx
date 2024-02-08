import React, { useState } from "react";
import { useSelector } from "react-redux";
import CtaButton from "../components/common/CtaButton";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { settingsEndpoints } from "../services/apis";
import toast from "react-hot-toast";

const Settings = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.profile.user);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: user.dateOfBirth,
    about: user.about,
    gender: user.gender,
    contactNumber: user.contactNumber,
  });

  // pending
  const imageUpload = (e) => {
    e.preventDefault();

    try {
      // const response = apiConnector("POST", UPDATE_DISPLAY_PICTURE_API, {
      //     thumbnail:
      // })
    } catch (e) {}
  };

  const updateDetails = (e) => {
    const { name, value, checked, type, id } = event.target;
    // console.log(name, value, checked, type, id);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? id : value,
    }));
  };

  const detailsSubmitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const reponse = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_PROFILE_API,
        formData,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //Add this line
        }
      );

      if (!reponse.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("your details updated successfully");
      setLoading(false);
      toast.dismiss(toastId);
    } catch (e) {
      console.log("something went wrong");
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className='w-full my-10"'>
      <div className="flex flex-col w-11/12 md:w-9/12 gap-10 justify-center  mx-auto py-10">
        <h2 className="text-3xl xl:text-4xl font bold">Update Profile</h2>

        <form onSubmit={imageUpload}>
          <section className="flex justify-between items-center bg-richblack-800 px-10 py-10 rounded-lg">
            <div className="flex gap-5 items-center justify-between w-full">
              <div className="flex items-center gap-5">
                <img
                  src={user.image}
                  alt=""
                  className="rounded-full border-2 border-richblack-100 w-[100px]"
                />
                <div className="flex flex-col gap-3">
                  <h5 className="text-xl font-semibold">
                    {user.firstName + " " + user.lastName}
                  </h5>
                  <input type="file" className="bg-richblack-800 rounded-lg" />
                  <div className="flex gap-5"></div>
                </div>
              </div>
              <button
                type="submit"
                className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3"
              >
                <FaEdit />
                Update
              </button>
            </div>
          </section>
        </form>

        <form onSubmit={detailsSubmitHandler}>
          <section className="flex flex-col justify-between items-center bg-richblack-800 px-10 py-10 rounded-lg">
            <div className="flex items-center justify-between w-full mb-5">
              <h4 className="text-2xl font-semibold">Personal Details</h4>
              <button
                type="submit"
                className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3"
              >
                {/* onClick={navigate("../settings")} */}
                <span className="flex gap-3 items-center">
                  <FaEdit />
                  Save
                </span>
              </button>
            </div>
            <div className="flex flex-col w-full gap-5">
              <div className="flex gap-10 w-full">
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="dateOfBirth">Date Of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={updateDetails}
                    className="py-2 px-4 rounded-lg shadow-sm focus:outline-none shadow-richblack-300 text-xl text-richblack-100 bg-richblack-700"
                    placeholder="dd/mm/yy"
                    id="dateOfBirth"
                  />
                </div>
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="gender">Gender</label>
                  <div className="py-2 px-4 rounded-lg text-lg text-richblack-100 shadow-sm text=xl shadow-richblack-300 bg-richblack-700 flex justify-evenly">
                    <span className="flex gap-5">
                      <input
                        type="radio"
                        onChange={updateDetails}
                        checked={formData.gender === "male"}
                        name="gender"
                        id="male"
                      />
                      <label htmlFor="male">Male</label>
                    </span>
                    <span className="flex gap-5">
                      <input
                        type="radio"
                        onChange={updateDetails}
                        checked={formData.gender === "female"}
                        name="gender"
                        id="female"
                      />
                      <label htmlFor="female">Feamle</label>
                    </span>
                    <span className="flex gap-5">
                      <input
                        type="radio"
                        onChange={updateDetails}
                        checked={formData.gender === "other"}
                        name="gender"
                        id="other"
                      />
                      <label htmlFor="other">Other</label>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-10">
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="dateOfBirth">Contact Number</label>
                  <input
                    type="number"
                    onChange={updateDetails}
                    name="contactNumber"
                    className="py-2 px-4 text-xl rounded-lg focus:outline-none shadow-sm shadow-richblack-300  text-richblack-100 bg-richblack-700"
                    placeholder="123 - 456 - 7890"
                    id="contactNumber"
                  />
                </div>
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="dateOfBirth">Description</label>
                  <textarea
                    rows={1}
                    onChange={updateDetails}
                    name="about"
                    className="py-2 text-xl px-4 rounded-lg focus:outline-none shadow-sm resize-none shadow-richblack-300 text-richblack-100 bg-richblack-700"
                    placeholder="Write something about yourself"
                    id="about"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Settings;
