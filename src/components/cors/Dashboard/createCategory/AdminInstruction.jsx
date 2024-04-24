import React from 'react'

const AdminInstruction = () => {
    return (
        <div className=' h-full w-full rounded-lg flex flex-col gap-3'>
            <p className='text-3xl'>Instruction</p>
            <div className='text-lg flex flex-col gap-1'>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Ensure categories are directly related for relevance.</p>
                </span>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Use descriptive, concise names for clarity in labels.</p>
                </span>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Arrange categories sensibly for logical organization.</p>
                </span>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Limit the number of categories to keep it manageable.</p>
                </span>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Regularly update categories to stay current.</p>
                </span>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Simplify navigation with clear, concise category names.</p>
                </span>
                <span className='relative'>
                    <span className='w-[10px] translate-y-3 aspect-square rounded-full bg-yellow-100 absolute'></span>
                    <p className='ml-5'>Maintain relevance by ensuring categories directly relate to the platform's focus.</p>
                </span>
            </div>
        </div>
    )
}

export default AdminInstruction