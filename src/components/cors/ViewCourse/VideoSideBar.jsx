import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import ActionButton from "../../common/ActionButton"
import { MdArrowBack } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

const VideoSideBar = ({ reviewModal, setReviewModal }) => {

  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const {sectionId, subSectionId} = useParams();
  const navigate = useNavigate()
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures
  } = useSelector(state => state?.viewCourse)

  // console.log("total lectures : ", totalNoOfLectures);
  // console.log("completed lectures : ", completedLectures);

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) {
        return;
      }

      // console.log("courseEntiredata : ", courseEntireData)

      const currentSectionIndex = courseEntireData.courseContent.findIndex((data) => data?._id === sectionId)
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data?._id === subSectionId);
      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

      // set current section
      // console.log("courseSectionData : ", courseSectionData, currentSubSectionIndex)
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set current subSection
      setVideoBarActive(activeSubSectionId);

    })()
  }, [courseSectionData, courseEntireData, location.pathname])


  return (
    <div className='bg-richblack-900 py-5 px-3 h-max w-[500px] max-w-[500px]'>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between gap-3 items-center '>
          <span className='text-xl border p-2 rounded-full hover:bg-richblack-5 hover:text-richblack-900 transition-all duration-300 cursor-pointer' onClick={() => navigate("/dashboard/enrolled-courses")}>
            <MdArrowBack />
          </span>
          <div>
            <ActionButton active onClick={() => setReviewModal(true)} >Add review</ActionButton>
          </div>
        </div>

        <div className='flex flex-col gap-1 my-3'>
          <p className='text-2xl'>{courseEntireData?.courseTitle}</p>
          <p className='text-richblack-300'>{completedLectures.length} of {totalNoOfLectures} completed</p>
        </div>
      </div>

      <div className='py-3 flex flex-col gap-1'>
        {
          courseSectionData.map((section, index) => (
            <div
              className='bg-richblack-800 cursor-pointer'
              onClick={() => setActiveStatus(section._id)}
              key={index}
            >
              <div>
                <div className={` flex gap-3 items-center justify-between text-lg p-3` }>
                  <p className='line-clamp-1'>{section?.sectionName}</p>
                  <p className={`transition-all duration-300 ${activeStatus === section._id ? "rotate-180" : "rotate-0"}`}><IoMdArrowDropdown /></p>
                </div>

                {/* subsection  */}
                <div>
                  {
                    activeStatus === section._id && (
                      <div className='flex flex-col'>
                        {
                          section?.subSection?.map((subSection, index) => (
                            <div
                              key={index}
                              className={`px-3 py-2 transition-all duration-300 border border-transparent text-lg hover:border hover:border-richblack-5 ${videoBarActive === subSection._id ? "text-richblack-900 bg-yellow-100 " : "bg-richblack-600 text-richblack-5"}`}
                              onClick={() => {
                                navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subSection._id}`)
                                setVideoBarActive(subSection?._id)
                              }}
                            >
                              <span className={`line-clamp-1 ${completedLectures?.includes(subSection?._id) ? "bg-caribbeangreen-300" : ""}`}>
                                {
                                  subSection?.title
                                }
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default VideoSideBar