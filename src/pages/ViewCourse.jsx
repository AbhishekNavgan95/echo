import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoSideBar from '../components/cors/ViewCourse/VideoSideBar'
import { useSelector, useDispatch } from "react-redux";
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import ReviewModal from "../components/cors/ViewCourse/ReviewModal"

const ViewCourse = () => {

    const { token } = useSelector(state => state.auth);

    const [reviewModal, setReviewModal] = useState();
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const setCourseSpecificDetails = async () => {
        const courseData = await getFullDetailsOfCourse(courseId, token)
        // console.log("course Data", courseData)
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails))
        dispatch(setCompletedLectures(courseData?.completedVideos))

        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec?.subSection?.length
        })
        dispatch(setTotalNoOfLectures(lectures))
    }

    useEffect(() => {
        setCourseSpecificDetails();
    }, [])

    return (
        <div className='relative text-richblack-5'>
            <div className=' flex'>
                <VideoSideBar reviewModal={reviewModal} setReviewModal={setReviewModal} />
                <div className='w-full px-24 py-10 border-l border-richblack-600 bg-richblack-800'>
                    <Outlet />
                </div>
            </div>
            {
                reviewModal && <ReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} />
            }
        </div>
    )
}

export default ViewCourse