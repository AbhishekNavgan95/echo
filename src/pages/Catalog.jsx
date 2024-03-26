import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from "../services/operations/PageAndComponentData"
import CourseSlider from '../components/cors/CatalogPage/CourseSlider';
import CourseCard from '../components/cors/CatalogPage/CourseCard';

const Catalog = () => {

    const [catalogPageData, setCatalogPageData] = useState();
    console.log("cataologPage data : ", catalogPageData)
    const [categoryId, setCategoryId] = useState(null);
    const { category } = useParams();
    const [coursesType, setCoursesType] = useState("most-popular");
    console.log("Current category : ", category)

    const getCategories = async () => {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const currentCategory = res?.data?.data?.filter(ct => ct?.name === category)[0]?._id
        setCategoryId(currentCategory);
    }

    const getCategoryDetails = async () => {
        try {
            const res = await getCatalogPageData(categoryId);
            console.log("res : ", res);
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
        if(categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])

    return (
        <div className="py-10">
            <section className="bg-richblack-900 py-5 md:py-14 px-3 text-white max-w-maxContent mx-auto">
                <div className="relative space-y-10">

                    <div className='text-2xl'>
                        <h4>Home / Catalog / <span className='text-yellow-100'>{`  ${category}`}</span></h4>
                    </div>

                    <div className='relative rounded-lg my-3 w-max overflow-hidden flex justify-between bg-richblack-300'>
                        <div className="py-2 cursor-pointer text-richblack-900 px-3" onClick={() => setCoursesType("most-popular")}>
                            <p className='relative z-[2]'>Most Popular</p>
                        </div>
                        <div className="py-2 cursor-pointer text-richblack-900 px-3" onClick={() => setCoursesType("new")}>
                            <p className='relative z-[2]'>Newly Launched</p>
                        </div>
                        <div className={`bg-yellow-100 rounded-lg absolute w-full top-0 bottom-0 transition-all duration-300 ${coursesType === "most-popular" ? "translate-x-[-55%]" : "translate-x-[45%]"}`}></div>
                    </div>

                    <div className='space-y-3'>
                        <p className='text-2xl'>{
                            coursesType === "new" ? "New Courses" : `Top Courses in ${category}`
                        }</p>
                        <CourseSlider courses={coursesType === "most-popular" ? catalogPageData?.selectedCategory?.courses : catalogPageData?.mostSellingCourses} />
                    </div>

                    <div className='space-y-3'>
                        <p className='text-2xl'>Courses to get you started</p>
                        <CourseSlider courses={catalogPageData?.differentCategory?.courses} />
                    </div>

                    <div className='space-y-3'>
                        <p className='text-2xl'>Frequently Bought</p>
                        <div className=''>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                {
                                    catalogPageData?.mostSellingCourses?.slice(0, 4)
                                        ?.map((course, index) => (
                                            <CourseCard key={index} course={course} />
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Catalog