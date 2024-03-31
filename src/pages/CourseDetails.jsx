import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import avgRating from '../utils/avgRating';
import { useDispatch, useSelector } from 'react-redux';
import Error from "./Error"
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
import {addToCart} from "../slices/CartSlice"

const CourseDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile)

    const courseId = useParams()?.courseId;
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
            console.log('full course details : ', res);
        } catch (e) {
            console.log("COULD NOT FETCH COURSE DETAILS!");
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
        console.log("Course id in handle buy course : ", courseId);
        if (token) {

            // buyCourse(token, [courseId], user, navigate, dispatch)
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
        console.log("course id in add to cart : ", courseId);

        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("An Instructor cannot buy a course");
            return
        }
        
        if(!token) {
            toast.error("Please Login")
            navigate('/login')
            return
        }

        dispatch(addToCart(courseData))

    }

    const handleShare = () => {
        console.log("course id in share : ", courseId);
        copy(window.location.href)
        toast.success("URL copied to clipboard")
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!courseData) {
        return (
            <div>
                <Error />
            </div>
        )
    }



    return (
        <div className="">
            <div className='w-full bg-richblack-800 py-5 xl:py-10'>
                <section className="py-5 md:py-14 px-3 relative text-richblack-5 max-w-maxContent mx-auto">
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-y-5 relative text-xl'>
                            <div className='flex flex-col gap-2 lg:w-7/12'>
                                <p className='text-3xl xl:text-4xl mb-1'>{courseData?.courseTitle}</p>
                                <p className=' text-richblack-300 text-lg'>{courseData?.courseDescription} </p>
                                <div className='flex gap-2 flex-wrap my-3'>
                                    {
                                        tags?.map((tag, index) => (
                                            <span key={index} className='bg-yellow-100 rounded-lg text-richblack-900 px-3 py-1 text-sm'>{tag}</span>
                                        ))
                                    }
                                </div>

                                <div className='flex gap-x-3 gap-y-1 flex-col md:flex-row text-yellow-100 '>
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
                                <div className='flex gap-x-3 gap-y-1 flex-col md:flex-row'>
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
            {
                confirmationModal && <Modal modalData={confirmationModal} />
            }
        </div>
    )
}

export default CourseDetails