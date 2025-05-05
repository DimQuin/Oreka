import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';

function SliderHome({slideState}) {
  return (
    <section className='py-4'>
      <div className="container">
        <div className="flex h-[250px]">
            <div className="w-[70%] pe-4">
            <Swiper
                slidesPerView={1}
                spaceBetween={40}
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation,Autoplay]}
                className="mySwiper"
                >
                {Array.isArray(slideState) && slideState.map((e, index) => (
                <SwiperSlide key={index}>
                    <img width="100%" className='h-[250px] rounded' src={e?.images[0]?.url} alt="" />
                </SwiperSlide>
                ))}
            </Swiper>
            </div>
            <div className="w-[30%] flex flex-col gap-[1.2rem]">
                <img className='block h-1/2 relative rounded-lg overflow-hidden ratio-[375/179]' src="https://static.oreka.vn/d/_next/static/images/new-refund-banner-fcf635b6f76e3280dad57f2d9b61207b.webp" alt="" />
                <img className='block h-1/2 relative rounded-lg overflow-hidden ratio-[375/179]' src="https://static.oreka.vn/d/_next/static/images/new-download-app-banner-71e326b70e915798d388eab9ebdd1ee4.webp" alt="" />
            </div>
        </div>
      </div>
    </section>
  )
}

export default SliderHome
