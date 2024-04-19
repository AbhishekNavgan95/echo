import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../addCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/CourseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const courseId = useParams();
    const { course } = useSelector(state => state.course);
    const [loading, setLoading] = useState();
    const { token } = useSelector(state => state.auth);

    const populateCourseDetails = async () => {
        setLoading(true)
        const result = await getFullDetailsOfCourse(courseId.id, token);
        if(result) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false);
    }

    useEffect(() => {
        populateCourseDetails();
    }, [])

    return (
        <>
            <div className="w-full">
                <div className="flex flex-col w-11/12 md:w-9/12 gap-10 justify-center mx-auto py-10 xl:py-20">
                    <h2 className="text-3xl xl:text-4xl font bold">Add Course</h2>
                    <div>
                        {
                            course
                                ? <RenderSteps />
                                : <p>Course Not Found</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCourse