import React, { useEffect } from 'react'
import SliderHome from '../components/SliderHome'
import CategoryHome from '../components/CategoryHome'
import Product from '../components/Product'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../features/users/userSlice'
import { getAllProduct } from '../features/products/productSlice';
import { getAllSlide } from '../features/slide/slideSlice';

export default function Homepage() {
  const dispatch = useDispatch()
  const slideState = useSelector(state=>state.slide?.slides)

  useEffect(()=>{
    window.scroll(0,0)
    dispatch(getCart())
    dispatch(getAllSlide())
    dispatch(getAllProduct())
  },[])
  const allProduct =useSelector((state) => state.product?.products) || [];
  return (
    <div className='min-h-[500px] bg-[#F7F7F7]'>
      <SliderHome slideState={slideState}/>
      <CategoryHome/>
      <div className="container bg-white mt-5">
        <div className="flex justify-between">
          <h5>Gợi ý cho bạn hôm nay</h5>
          <Link className='xem' to='/tat-ca'>Xem tất cả</Link>
        </div>
        <div className="flex mt-4">
          <Swiper
              slidesPerView={5}
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
              {Array.isArray(allProduct) && allProduct.map((e, index) => (
              <SwiperSlide key={index}>
                  <Product product={e}/>
              </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
