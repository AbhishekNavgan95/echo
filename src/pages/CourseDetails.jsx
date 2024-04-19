import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import avgRating from '../utils/avgRating';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/common/Modal';
import RatingStars from '../components/common/RatingStars'
import { formatDate } from "../services/formatDate"
import { MdOutlineLanguage } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import CoursePurchaseCard from '../components/cors/courseDetails/CoursePurchaseCard';
import WhatYouWillLearn from '../components/cors/courseDetails/WhatYouWillLearn';
import Requirements from '../components/cors/courseDetails/Requirements';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constants';
import { addToCart } from "../slices/CartSlice"
import Accordian from '../components/cors/courseDetails/Accordian';
import { buyCourse } from '../services/operations/StudentFeaturesAPI'
import { SyncLoader } from 'react-spinners'

const CourseDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile)

    const { courseId } = useParams();
    // console.log(courseId);
    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    const [totalNumberOflectures, setTotalNumberOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState();
    const [loading, setLoading] = useState();
    const [tags, setTags] = useState([]);

    const getFullCourseDetails = async () => {
        setLoading(true);
        try {
            const res = await fetchCourseDetails(courseId);
            setCourseData(res);
            // console.log('full course details : ', res);
        } catch (e) {
            navigate("/error")
            console.log("COULD NOT FETCH COURSE DETAILS!", e);
        }
        setLoading(false);
    }

    useEffect(() => {
        getFullCourseDetails();
    }, [courseId])

    useEffect(() => {
        if (courseData) {
            const count = avgRating(courseData?.ratingAndReviews);
            setAvgReviewCount(count)

            let lectures = 0;
            if (courseData) {
                courseData.courseContent?.forEach(sec => {
                    lectures += sec?.subSection?.length
                })
            }

            setTags(courseData?.tag.split(","));

            setTotalNumberOfLectures(lectures);
            // console.log("total lectures in this course : ", totalNumberOflectures)
        }
    }, [courseData])

    const handleBuyCourse = (courseId) => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }

        setConfirmationModal({
            heading: "You are not Logged in",
            subHeading: "Please Log in",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })

    }

    const handleAddToCart = (courseData) => {

        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("An Instructor cannot buy a course");
            return
        }

        if (!token) {
            toast.error("Please Login")
            navigate('/login')
            return
        }

        dispatch(addToCart(courseData))

    }

    const handleShare = () => {
        copy(window.location.href)
        toast.success("URL copied to clipboard")
    }

    return (
        <div className=" text-richblack-5">
            {
                !courseData
                    ? <div className='text-white flex items-center justify-center min-h-[calc(100vh-6rem)]'>
                        <SyncLoader color="#E7C009" />
                    </div>
                    : <div>
                        <div className='w-full bg-richblack-800 py-5 xl:py-10'>
                            <section className="py-5 md:py-14 px-3 relative  max-w-maxContent mx-auto">
                                <div className='flex flex-col'>
                                    <div className='flex flex-col items-center lg:items-start gap-y-5 relative text-xl'>
                                        <div className='flex flex-col items-center lg:items-start gap-2 lg:w-7/12'>
                                            <p className='text-3xl xl:text-4xl mb-1 line-clamp-2 text-center md:text-start'>{courseData?.courseTitle}</p>
                                            <p className=' text-richblack-300 text-lg text-center md:text-start line-clamp-4'>{courseData?.courseDescription} </p>
                                            <div className='flex gap-2 justify-center lg:justify-start flex-wrap my-3'>
                                                {
                                                    tags?.map((tag, index) => (
                                                        <span key={index} className='bg-yellow-100 rounded-lg text-richblack-900 px-3 py-1 text-sm'>{tag}</span>
                                                    ))
                                                }
                                            </div>

                                            <div className='flex gap-x-3 gap-y-1 flex-col items-center lg:items-start md:flex-row text-yellow-100 '>
                                                <div className='flex gap-x-3'>
                                                    <span className='flex items-center gap-2'>{avgReviewCount} <RatingStars reviewCount={avgReviewCount} /></span>
                                                    <span>{`( ${courseData?.ratingAndReviews?.length} Ratings)`}</span>
                                                </div>
                                                <span>{`${courseData?.studentsEnrolled?.length} Students`}</span>
                                            </div>

                                            <p className=''>
                                                {
                                                    ` Created by : ${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`
                                                }
                                            </p>
                                            <div className='flex gap-x-3 gap-y-1 flex-col items-center lg:items-start md:flex-row'>
                                                <span className='flex items-center gap-1 text-2xl'><IoMdInformationCircleOutline /> <span className='text-xl'>{`Created at : ${formatDate(courseData?.createdAt)}`}</span></span>
                                                <span className='flex items-center gap-1 text-2xl'><MdOutlineLanguage /> <span className='text-xl'> English </span></span>
                                            </div>
                                        </div>

                                        <div className='lg:absolute z-[3] right-0'>
                                            <CoursePurchaseCard
                                                handleAddToCart={handleAddToCart}
                                                handleBuyCourse={handleBuyCourse}
                                                courseData={courseData}
                                                setConfirmationModal={setConfirmationModal}
                                                handleShare={handleShare}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className='w-full py-5'>
                            <section className="bg-richblack-900 py-5 md:py-14 px-3 relative text-richblack-5 max-w-maxContent mx-auto">
                                <div className='flex flex-col gap-y-5'>
                                    <div className='lg:w-7/12 border border-richblack-600'>
                                        <WhatYouWillLearn benifit={courseData?.whatYouWillLearn} />
                                    </div>
                                    {
                                        courseData?.instructions && (
                                            <div className='lg:w-7/12 border border-richblack-600'>
                                                <Requirements instructions={courseData?.instructions} />
                                            </div>
                                        )
                                    }
                                </div>
                            </section>
                        </div>
                        <div className='w-full py-5 bg-richblack-800 text-richblack-5'>
                            <section className=" py-5 px-3 relative text-richblack-5 max-w-maxContent mx-auto flex flex-col gap-5">
                                <h4 className='text-3xl xl:text-4xl'>Course Content</h4>
                                <div className='w-full md:w-11/12 mx-auto'>
                                    <Accordian sections={courseData?.courseContent} />
                                </div>
                            </section>
                        </div>

                        <div className='w-full py-5 bg-richblack-900 text-richblack-5'>
                            <section className=" py-5 px-3 relative text-richblack-5 max-w-maxContent mx-auto flex flex-col gap-5">
                                <h4 className='text-3xl xl:text-4xl'>Instructor</h4>
                                <div className='w-full mx-auto border p-5 md:p-10  border-richblack-600'>
                                    <div className='my-5 flex flex-col gap-5'>
                                        <span className='flex items-center flex-col  md:flex-row gap-5'>
                                            <img className='w-[100px] h-[100px] rounded-full object-cover border border-richblack-600' src={courseData?.instructor?.image} alt="" />
                                            <div className='flex items-center md:items-start flex-col '>
                                                <p className='text-xl'>{`${courseData?.instructor.firstName} ${courseData?.instructor.lastName}`}</p>
                                                <p className='text-richblack-300'>{courseData?.instructor?.email}</p>
                                            </div>
                                        </span>
                                        <p className='text-xl line-clamp-5 text-center md:text-start text-richblack-300'>{courseData?.instructor?.additionalDetails.about}</p>
                                    </div>
                                </div>

                            </section>
                        </div>
                        {
                            confirmationModal && <Modal modalData={confirmationModal} />
                        }

                    </div>
            }
        </div>
    )
}

export default CourseDetails