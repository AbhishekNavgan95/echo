import React from 'react'

const CatalogCourseCardSkeleton = () => {

    return <div className='flex flex-col gap-3 w-full my-2'>
        <div className='lg:min-w-[400px] rounded-lg aspect-video bg-richblack-100 animate-pulse'></div>
        <div className='flex flex-col gap-3'>
            <div className='py-2 bg-richblack-100 max-w-[300px] animate-pulse text-white'></div>
            <div className='py-2 bg-richblack-100 max-w-[100px] animate-pulse'></div>
            <div className='py-1 bg-richblack-100 max-w-[200px] animate-pulse' animate-pulse></div>
            <div className='py-2 bg-richblack-100 max-w-[70px] animate-pulse'></div>
        </div>
    </div>
}

export default CatalogCourseCardSkeleton