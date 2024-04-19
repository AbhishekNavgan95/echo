import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, resetCourseState } from "../../../../../slices/CourseSlice"
import { editCourseStatus } from '../../../../../services/operations/courseDetailsAPI';
import { COURSE_STATUS } from '../../../../../utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {

    const { register, handleSubmit, setValue, getValues } = useForm();
    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    // const [checked, setChecked] = useState(false); // for costom checkbox

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("../my-courses");
    }

    const handleCoursePublish = async () => {

        // check if form has been updated or not
        if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ) {
            // no updation in form 
            toast.success("Course has been marked as Draft");
            goToCourses();
            return;
        }

        // form updated here
        const formData = new FormData();
        formData.append("courseId", course?._id);

        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseStatus(formData, token);

        if (result) {
            goToCourses();
            toast.success("Course Published Successfully");
        }

        setLoading(false);
    }

    const submitHandler = () => {
        handleCoursePublish();
    }

    return (
        <div className="flex flex-col text-xl gap-5 w-full">
            <form className='flex flex-col items-center justify-center gap-3' onSubmit={handleSubmit(submitHandler)}>
                <div className='flex gap-3 items-center'>
                    <input type="checkbox" id='public'
                        {...register("public")}
                        className='h-5 w-5 rounded-full'
                    />
                    <label
                        // onClick={() => setChecked(!checked)}
                        className="cursor-pointer relative select-none"
                        // costom checkbox
                        // className={` ${checked ? "checkbox" : "checkbox-ticked"} cursor-pointer relative select-none`}
                        htmlFor="public">Make this course as Public?
                    </label>
                </div>
                <div className='self-end flex gap-3'>
                    <button 
                        disabled={loading}
                        type="button"
                        onClick={goBack}
                        className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-richblack-600 hover:bg-richblack-700 focus:hover:bg-richblack-700 text-richblack-5 active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-2"
                    >
                        Back
                    </button>
                    <button
                        disabled={loading}
                        className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PublishCourse