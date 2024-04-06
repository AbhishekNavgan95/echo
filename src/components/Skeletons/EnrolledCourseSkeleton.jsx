import React from 'react';

const EnrolledCourseSkeleton = ({ count }) => {
    // Generate an array of undefined values with the length equal to the count
    const skeletonArray = Array.from({ length: count });

    // Map over the array to create instances of the skeleton component
    const skeletonInstances = skeletonArray.map((_, index) => (
        <div key={index} className="flex gap-3 flex-col w-full divide-y divide-richblack-600">
            <div className="flex justify-between items-center flex-col md:flex-row py-5 gap-3">
                <div className="flex gap-5 items-center w-full">
                    <div className="aspect-square bg-richblack-100 w-[100px] rounded-lg animate-pulse duration-100" alt="" />
                    <div className="flex flex-col justify-center gap-1">
                        <h3 className="bg-richblack-100 py-3 w-[200px] animate-pulse duration-100"></h3>
                        <p className="bg-richblack-200 py-2 min-w-[250px] animate-pulse duration-100"></p>
                    </div>
                </div>
                <div className='w-full flex md:justify-center'>
                  <div className="bg-richblack-100 w-[100px] py-2 animate-pulse duration-100"></div>
                </div>
                <div className="flex md:items-end self-center w-full flex-col gap-3">
                    <p className="hidden md:block bg-richblack-100 py-2 min-w-[100px] animate-pulse duration-100"></p>
                    <span className="bg-richblack-100 py-2 w-[500px] animate-pulse duration-100"></span>
                </div>
            </div>
        </div>
    ));

    return skeletonInstances;
};

export default EnrolledCourseSkeleton;
