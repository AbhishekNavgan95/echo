import React from 'react'

const WhatYouWillLearn = ({ benifit }) => {

    return (
        <div className='p-5 space-y-2'>
            <h4 className='text-2xl xl:text-3xl '>What You Will Learn?</h4>
            <div className='flex items-center gap-3'>
                <span className='w-[10px] h-[10px] rounded-full bg-yellow-100'></span>
                <p>{benifit}</p>
            </div>
        </div>
    )
}

export default WhatYouWillLearn