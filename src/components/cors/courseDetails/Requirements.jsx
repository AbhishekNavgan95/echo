import React from 'react'

const Requirements = ({ instructions }) => {

    const instructionsArr = instructions.split(",");

    return (
        <div className='p-5 space-y-2'>
            <h4 className='text-2xl xl:text-3xl '>Prerequisites / Requirements</h4>
            {
                instructionsArr.map((instruction, index) => (
                    <div key={index} className='flex items-start gap-3'>
                        <span className='relative top-[7px] min-w-[10px] min-h-[10px] rounded-full bg-yellow-100'></span>
                        <p className='line-clamp-2'>{instruction} </p>
                    </div>
                ))
            }
        </div>
    )
}

export default Requirements