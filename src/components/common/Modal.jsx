import React from "react";

const Modal = ({ modalData }) => {
  return (
    <div className="w-full h-full bg-[#0000008b] fixed top-0">
      <div className="text-white absolute bg-richblack-800 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-lg">
        <div className="flex flex-col py-10 px-14 items-center gap-5">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-2xl ">{modalData?.heading}</h3>
            <p className="text-lg text-richblack-300">
              {modalData?.subHeading}
            </p>
          </div>
          <div className="flex gap-10">
            <button
              onClick={modalData.btn1Handler}
              className="text-center text-[13px] flex items-center px-4 py-2 rounded-md text-lg active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black"
            >
              {modalData.btn1Text}
            </button>
            <button
              className="text-center text-[13px] flex items-center px-4 py-2 rounded-md text-lg active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 bg-richblack-700 hover:bg-richblack-800 focus:bg-richblack-800 text-white"
              onClick={modalData?.btn2Handler}
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
