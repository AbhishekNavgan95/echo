import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = () => {

    const timeline = [
        {
            logo: Logo1,
            heading: "Leadershing",
            description: "Fully committed to the company success"
        },
        {
            logo: Logo2,
            heading: "Leadershing",
            description: "Fully committed to the company success"
        },
        {
            logo: Logo3,
            heading: "Leadershing",
            description: "Fully committed to the company success"
        },
        {
            logo: Logo4,
            heading: "Leadershing",
            description: "Fully committed to the company success"
        },
    ]

  return (
    <div className='my-20 group'>
        <div className="flex flex-col-reverse md:flex-row items-center gap-20 nd:gap-2 justify-between">
          {/* timeline */}
          <div className="flex flex-col items-center lg:items-start gap-10 w-full lg:w-2/5">
            {
                timeline.map((elem, index ) => {
                    return (
                        <div key={index} className='flex items-center gap-5 w-11/12 lg:w-full'>
                            <div className=''><img src={elem.logo} className='w-[30px]' alt="logo" /></div>
                            <div>
                                <h5 className='text-xl  text-richblack-900 font-bold'>{elem.heading}</h5>
                                <p className='text-lg  text-richblack-300'>{elem.description}</p>
                            </div>
                        </div>
                    )
                })
            }
          </div>
          {/* image */}
          <div className="flex  w-11/12 lg:w-3/5 relative">
            <div className='overflow-hidden rounded-3xl'>
                <img className='w-full group-hover:scale-105 transition-scale delay-100 duration-300 ' src={TimelineImage} alt="" />
            </div>
            <div className='w-auto lg:w-3/4 absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] flex justify-center  gap-2 lg:gap-4 bg-caribbeangreen-700 text-white uppercase py-5 px-5 rounded-xl '> 
                <div className='flex flex-col lg:flex-row  items-center gap-3 '>
                    <h3 className='text-4xl font-bold'>10+</h3>
                    <h4 className='text-caribbeangreen-300 text-sm text-center'>Years of Experience</h4>
                </div>
                <div className='flex flex-col lg:flex-row items-center gap-3 '>
                    <h3 className='text-4xl font-bold'>250+</h3>
                    <h4 className='text-caribbeangreen-300 text-sm text-center'>Types of Courses</h4>
                </div>
            </div>
          </div>
        </div> 
    </div>
  )
}

export default TimeLineSection