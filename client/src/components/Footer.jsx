import React from 'react'
import footer from "../assets/footer.png"
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="img">
          <img className='w-100' src={footer} alt="" />
        </div>
      </div>
      <div className="container">
        <div className="flex justify-between mb-5">
          <div className="w-[30%] px-4">
            <img className='mb-3' src={logo} alt="" />
            <p>Oreka - Nền tảng mua và bán đồ cũ uy tín và có đảm bảo tại Việt Nam.</p>
          </div>
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Chứng nhận</h5>
            <img src="https://static.oreka.vn/d/_next/static/images/dadangky-87ad36d72b86471dda80744bb5a0329c.png" alt="" />
          </div>
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Phương thức thang toán</h5>
            <div className="flex gap-6">
              <img loading="lazy" src="https://static.oreka.vn/d/_next/static/images/visa-58401bb56c50049a3e4b928c8d562fd2.svg" alt="visa"/>
              <img loading="lazy" src="https://static.oreka.vn/d/_next/static/images/vnpay-0f841d0b4c8157965bf02ffb2f56c17a.svg" alt="vnpay"/>
              <img loading="lazy" src="https://static.oreka.vn/d/_next/static/images/momo-545c294f2ea7209254359efdfcbb4933.svg" alt="momo"/>
              <img loading="lazy" src="https://static.oreka.vn/d/_next/static/images/ngan-luong-565f89d40d9b43985e3cf6cee661c997.svg" alt="ngân lượng"/>
              </div>
          </div>
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Dịch vụ giao hàng</h5>
            <img src="https://static.oreka.vn/d/_next/static/images/ninjavan-47a8597cfd26db9245475f63c1fa21cb.svg" alt="" />
          </div>
        </div>


        <div className="flex justify-between mb-5">
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Liên hệ với chúng tôi</h5>
            <div className="flex items-center mb-2">
              <FaPhone className='w-[30px]'/>
              <span className='text-[14px] text-[#6d6d6d]'>0379661878</span>
            </div>
            <div className="flex items-center mb-2">
              <MdEmail className='w-[30px]'/>
              <span className='text-[14px] text-[#6d6d6d]'>minmaxtuan@gmail.com</span>
            </div>
            <div className="flex items-center mb-2">
              <FaLocationDot className='w-[30px] me-2'/>
              <span className='text-[14px] text-[#6d6d6d]'>Số nhà B2.25 Vinhomes Gardenia, Hàm Nghi, P. Cầu Diễn, Q. Nam Từ Liêm, TP. Hà Nội</span>
            </div>
          </div>
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Về OREKA</h5>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Giới thiệu về OREKA</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Các câu hỏi thường gặp</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Điều khoản dịch vụ</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Quy chế hoạt động</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Hướng dẫn an toàn sử dụng</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Hướng dẫn bán hàng</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Blog</Link>
          </div>
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Chính sách</h5>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Chính sách bảo mật</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Chính sách bảo vệ người mua</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Chính sách giải quyết trang chấp</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Chính sách giao tiếp</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Những món đồ bị cấm</Link>
            <Link to="/" className='d-block mb-2 text-[14px] text-[#6d6d6d]'>Hành vi bị cấm</Link>
          </div>
          <div className="w-[30%] px-4">
            <h5 className='mb-3'>Tải ứng dụng</h5>
            <img src="data:image/png;base64,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" alt="" />
          </div>
        </div>
      </div>
      <div className="bg-[#f9f9f9]">
        <div className="container">
          <p className='text-center py-2 text-[15px] text-[#999]'>
            Nơi cấp: Phòng Đăng Ký Kinh Doanh - Sở Kế Hoạch và Đầu Tư Hà Nội - Ngày cấp: 17/12/2020
          </p>
        </div>
      </div>
    </footer>
  )
}
