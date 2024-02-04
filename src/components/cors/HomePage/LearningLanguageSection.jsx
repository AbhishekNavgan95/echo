import React from 'react'
import HighlightText from './HighlightText'
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CtaButton from './ctaButton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[10rem] mb-10'>
        <div className=''>
            <h3 className='text-4xl font-bold text-center'>Your swiis knife for <HighlightText text={"learning any language."}/></h3>
            <p className='text-center w-full lg:w-2/3 mx-auto text-xl mt-3 font-semibold'>Using spin making learning multiple language easy. with 20+ languages realistic voice-over, Progress tracking, custom schedule and more...</p>
        </div>
        <div className='flex flex-col md:flex-row justify-center my-10 relative'>
            <img src={Know_your_progress}  className='-mb-36 md:mb-0 md:-mr-32'  alt="" />
            <img src={Compare_with_others}  alt="" />
            <img src={Plan_your_lessons} className='-mt-36 md:mt-0 md:-ml-32' alt="" />
        </div>
        <div className='flex justify-center'>
            <CtaButton active={true} linkTo={"/signup"}>
                <div>Learn more</div>
            </CtaButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection