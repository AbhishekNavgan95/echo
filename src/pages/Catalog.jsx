import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from "../services/operations/PageAndComponentData"
import CourseSlider from '../components/cors/CatalogPage/CourseSlider';
import CourseCard from '../components/cors/CatalogPage/CourseCard';
import CatalogCourseCardSkeleton from '../components/Skeletons/CatalogCourseCardSkeleton';
import { SyncLoader } from "react-spinners"

const Catalog = () => {

    const [catalogPageData, setCatalogPageData] = useState();
    // console.log("cataologPage data : ", catalogPageData)
    const [categoryId, setCategoryId] = useState(null);
    const { category } = useParams();
    const [coursesType, setCoursesType] = useState("most-popular");
    const [loading, setLoading] = useState(false);
    // console.log("Current category : ", category)

    const getCategories = async () => {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const currentCategory = res?.data?.data?.filter(ct => ct?.name === category)[0]?._id
        setCategoryId(currentCategory);
    }

    const getCategoryDetails = async () => {
        try {
            setLoading(true)
            const res = await getCatalogPageData(categoryId);
            // console.log("res : ", res);        
            setLoading(false)
            setCatalogPageData(res);

        } catch (e) {
            console.log("error : ", e);
        }

    }

    useEffect(() => {
        getCategories();
        setCoursesType("most-popular")
    }, [category])

    useEffect(() => {
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])

    return (
        <div className="py-5 w-11/12 mx-auto">
            <section className="bg-richblack-900 py-5 md:py-14 text-richblack-5 max-w-maxContent mx-auto">
                <div className="relative">
                    {
                        !categoryId
                            ? <div className='text-white flex items-center justify-center min-h-[calc(100vh-6rem)]'>
                                <SyncLoader color="#E7C009" />
                            </div>
                            :
                            <div className='space-y-10'>
                                <div className='flex flex-col gap-y-5 md:flex-row items-center justify-between'>
                                    <h4 className='text-2xl text-center md:text-start'>Home / Catalog / <span className='text-yellow-100'>{`  ${category}`}</span></h4>
                                    <div className='relative rounded-lg w-max overflow-hidden flex justify-between bg-richblack-300'>
                                        <div className="py-2 cursor-pointer text-richblack-900 px-3" onClick={() => setCoursesType("most-popular")}>
                                            <p className='relative z-[2]'>Most Popular</p>
                                        </div>
                                        <div className="py-2 cursor-pointer text-richblack-900 px-3" onClick={() => setCoursesType("new")}>
                                            <p className='relative z-[2]'>Newly Launched</p>
                                        </div>
                                        <div className={`bg-yellow-100 rounded-lg absolute w-full top-0 bottom-0 transition-all duration-300 ${coursesType === "most-popular" ? "translate-x-[-55%]" : "translate-x-[45%]"}`}></div>
                                    </div>
                                </div>
                                <div className='space-y-3 w-full'>
                                    <p className='text-2xl border-b pb-5 border-richblack-600 mb-5 text-center md:text-start'>{
                                        coursesType === "new" ? "New Courses" : `Top Courses in ${category}`
                                    }</p>
                                    {
                                        // why the skeleton is not showing?
                                        loading
                                            ? <div className='max-w-[100%] sm:max-w-[300px] md:w-[400px]'>
                                                <CatalogCourseCardSkeleton />
                                            </div>
                                            : coursesType === "most-popular"
                                                ? <CourseSlider courses={catalogPageData?.selectedCategory?.courses} />
                                                : <CourseSlider courses={catalogPageData?.mostSellingCourses} />
                                    }
                                </div>

                                <div className='space-y-3'>
                                    <p className='text-2xl border-b pb-5 border-richblack-600 mb-5 text-center md:text-start'>Courses to get you started</p>
                                    {
                                        loading
                                            ? <div className='w-[100%] sm:max-w-[300px] md:max-w-[400px]'><CatalogCourseCardSkeleton /> </div>
                                            : <CourseSlider courses={catalogPageData?.differentCategory?.courses} />
                                    }
                                </div>

                                <div className='space-y-3'>
                                    <p className='text-2xl border-b pb-5 border-richblack-600 mb-5 text-center md:text-start'>Frequently Bought</p>
                                    <div className=''>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5'>
                                            {
                                                loading
                                                    ? <div><CatalogCourseCardSkeleton /></div>
                                                    : catalogPageData?.mostSellingCourses?.slice(0, 4)
                                                        ?.map((course, index) => (
                                                            <CourseCard key={index} course={course} />
                                                        ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default Catalog