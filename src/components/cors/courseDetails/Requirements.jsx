import React from 'react'

const Requirements = ({ instructions }) => {

    const instructionsArr = instructions.split(",");

    return (
        <div className='p-5 space-y-2'>
            <h4 className='text-2xl xl:text-3xl '>Prerequisites / Requirements</h4>
            {
                instructionsArr.map((instruction, index) => (
                    <div key={index} className='flex items-center gap-3'>
                        <span className='w-[10px] h-[10px] rounded-full bg-yellow-100'></span>
                        <p >{instruction}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Requirements