import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GoDash } from "react-icons/go";

const AccordianElement = ({ section, subSection }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [timeDuration, setTimeDuration] = useState(0);


    useEffect(() => {
        let totalDuration = section?.subSection?.map((section) => parseInt(section.timeDuration))
            ?.reduce((acc, duration) => acc + duration, 0);

        setTimeDuration(totalDuration);

    }, [])

    return (
        <>
            <button
                className={`${section && "text-xl bg-richblack-900"} flex justify-between items-center w-full h-auto px-5 py-3 text-lg border border-richblack-600`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex items-center gap-5'>
                    {
                        section &&
                        <p className={`text-sm ${isOpen ? "rotate-180 transition-rotate duration-300" : "rotate-0 transition-rotate duration-300"}`}><FaAngleDown /></p>
                    }
                    <div className='flex items-center justify-between gap-x-3 text-start'>
                        {section &&
                            <span className='line-clamp-1'>
                                {section?.sectionName}
                            </span>
                        }
                        {subSection && 
                            <MdOutlineOndemandVideo className='' />
                        }
                        {subSection &&
                            <span className='line-clamp-1 w-full'>{subSection?.title} </span>
                        }
                    </div>
                </div>
                <div className='flex items-center'>
                    {
                        subSection &&
                        <span className='flex items-center gap-3 text-yellow-100'>
                            {
                                subSection?.timeDuration
                            }
                            <p className={`text-sm text-richblack-5 ${isOpen ? "rotate-180 transition-rotate duration-300" : "rotate-0 transition-rotate duration-300"}`}><FaAngleDown /></p>
                        </span>
                    }
                    {
                        section &&
                        <div className='flex items-center gap-3 text-lg'>
                            <p className='flex gap-1 text-yellow-100'>
                                {section?.subSection?.length}
                                <span>lectures</span>
                            </p>
                            <p className=''>{timeDuration}min</p>
                        </div>
                    }
                </div>
            </button >
            <div className={`${isOpen ? "transition-all min-h-[100%] duration-300 origin-top overflow-hidden " : " overflow-hidden max-h-0 transition-all duration-300 origin-top"}`}>
                {
                    section &&
                    section?.subSection?.map((subsection, index) => (
                        <div className='' key={index}>
                            <AccordianElement key={index} subSection={subsection} />
                        </div>
                    ))
                }
                {
                    subSection &&
                    <div className='px-4 text-richblack-5 bg-richblack-600 text-start text-lg py-2'>
                        <p className='flex gap-3 items-start justify-between'>
                            <GoDash className='translate-y-1 ' />
                            <span className='line-clamp-3 w-full'>
                                {
                                    subSection?.description
                                }
                            </span>
                        </p>
                    </div>
                }
            </div>
        </>
    )
}

export default AccordianElement