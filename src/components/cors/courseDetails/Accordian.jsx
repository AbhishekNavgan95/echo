import React, { useState } from 'react'
import AccordianElement from './AccordianElement'

const Accordian = ({sections}) => {
  return (
    <div className='w-full mx-auto '>
        {
            sections?.map((section, index) => (
                <div key={index} className='border border-richblack-600 overflow-hidden my-3 rounded-lg '>
                    <AccordianElement section={section} />
                </div>
            ))
        }
    </div>
  )
}

export default Accordian