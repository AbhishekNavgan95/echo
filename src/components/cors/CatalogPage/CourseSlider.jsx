import React from 'react'
import CourseCard from './CourseCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

const CourseSlider = ({ courses }) => {
  
  return (
    <div>
      {
        courses?.length > 0
          ? (
            <Swiper
              // slidesPerView={3}
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              freeMode={true}
              breakpoints={{
                '@0.00': {
                  // centeredSlides: true,
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                '@0.75': {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                '@1.00': {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper"
            >
              {
                courses?.map((course, index) => (
                  <SwiperSlide key={index}>
                    <CourseCard course={course} height={"h-[250px]"} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          )
          : <div className='md:text-lg text-center my-2'> No courses Found </div>
      }
    </div>
  )
}

export default CourseSlider