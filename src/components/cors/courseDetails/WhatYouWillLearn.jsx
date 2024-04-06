import React from 'react'

const WhatYouWillLearn = ({ benifit }) => {

    return (
        <div className='p-5 space-y-2'>
            <h4 className='text-2xl xl:text-3xl '>What You Will Learn?</h4>
            <div className='flex items-start gap-3'>
                <span className='relative top-[7px] min-w-[10px] min-h-[10px] rounded-full bg-yellow-100'></span>
                <p className='line-clamp-5'>{benifit}</p>
            </div>
        </div>
    )
}

export default WhatYouWillLearn