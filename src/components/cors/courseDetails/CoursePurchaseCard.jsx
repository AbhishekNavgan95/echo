import React from 'react'
import { MdOutlineSwitchVideo } from "react-icons/md";
import { MdAccessAlarm } from "react-icons/md";
import { MdDevices } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShare } from "react-icons/fa";



const CoursePurchaseCard = ({ handleAddToCart, setConfirmationModal, handleBuyCourse, courseData, handleShare }) => {

  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='bg-richblack-800 rounded-lg border border-richblack-600 overflow-hidden flex flex-col '>
      <div className='px-3 pt-3' ><img loading="lazy"  className='w-full rounded-lg aspect-video h-[150px] md:h-[190px] lg:h-[220px] object-cover' src={courseData?.thumbnail} alt="" /></div>
      <div className='p-5 flex flex-col gap-2'>
        <h4 className='text-2xl font-bold'>Rs. {courseData?.price}</h4>
        <div className='flex flex-col gap-3 mt-2'>
          <button
            onClick={() =>
              user && courseData?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse(courseData?._id)
            }
            className="text-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:bg-yellow-200 text-black active:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3" >
            {
              user && courseData?.studentsEnrolled.includes(user?._id) ? "Go to course" : "Buy now"
            }
          </button>
          {
            (!courseData?.studentsEnrolled?.includes(user?._id)) &&
            <button onClick={() => handleAddToCart(courseData)} className="text-center  px-4 py-2 rounded-md text-lg bg-richblack-600 hover:bg-richblack-700 focus:bg-richblack-700 text-richblack-25 active:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3" >Add to Cart</button>
          }
        </div>
        <p className='text-sm mt-2 mb-1 text-center text-richblack-100'>30-Day Money-Back Guarantee</p>
        <div className='space-y-1'>
          <p> This course Includes : </p>
          <p className='flex gap-1 text-sm items-center text-caribbeangreen-200'>< MdOutlineSwitchVideo /> 8 hours on-demand video</p>
          <p className='flex gap-1 text-sm items-center text-caribbeangreen-200'>< MdAccessAlarm /> Full Lifetime access</p>
          <p className='flex gap-1 text-sm items-center text-caribbeangreen-200'> < MdDevices />Access on mobile and TV</p>
          <p className='flex gap-1 text-sm items-center text-caribbeangreen-200'> <TiDocumentText />Cirtificate of completion</p>
        </div>
        <button className='mt-2 w-max text-yellow-50 hover:text-yellow-100 active:scale-95 transition-all duration-300 text-start flex items-center gap-3' onClick={handleShare}> Share <FaShare /></button>
      </div>
    </div>
  )
}

export default CoursePurchaseCard