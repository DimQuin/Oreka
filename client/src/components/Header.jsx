import React from 'react'
import { GiWorld } from "react-icons/gi";
import logo from "../assets/logo.png"
import { IoShieldCheckmark } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import {Link} from "react-router-dom"
import { MdBorderAll } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaRegUserCircle } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";

export default function Header() {
  const userState = useSelector(
    (state) => state.auth.user
  );
  const cartUser = useSelector(state=>state.auth.cartUser)
  console.log(userState)
  return (
    <div className='relative'>
        <div className="bg-[#f5faf3]">
            <div className="container flex items-center py-2">
                <GiWorld className='me-2 text-[#3a9c18]'/>
                <p className='text-[14px]'>Oreka - nền tảng mua bán đồ cũ vì một trái đất xanh hơn</p>
                <TbPointFilled className='mx-2 text-[#3a9c18]'/>
                <IoShieldCheckmark className='mx-2 text-[#3a9c18]'/>
                <p className='text-[14px]'>Cam kết hoàn tiền 100% nếu sản phẩm không đúng mô tả!</p>
            </div>
        </div>
        <div className="bg-white ">
          <div className="container py-4 flex justify-between">
            <div className="flex items-center">
              <div className="logo me-3">
                <Link to='/'>
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="search flex w-[700px] items-center">
                <input type="text" placeholder='Tìm trên Oreka' className='input-search border-none outline-none' 
                />
                <CiSearch className='text-[24px] pe-1'/>
              </div>
            </div>
            {userState !== null ? (
              <>
                <div
                  className="dropdown flex gap-3"
                  >
                <div className="rounded-[50%] bottom-1 p-3 me-3 border cursor-pointer relative">
                  <Link to='/cart'>
                    <HiShoppingCart className='text-[18px] hover:text-red'/>
                    <p className="absolute top-0 right-0  px-[8px] rounded-[50%]">{cartUser ? cartUser?.length : 0  ` `}</p>
                  </Link>
                </div>
                  <button
                    className="dropdown-toggle d-flex align-items-center"
                    type="button"
                    style={{
                      border: "none",
                    }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false relative">
                    <div className="text-center hover:text-main">
                      <FaRegUserCircle className='text-[24px] flex justify-center'/>
                      <p className='text-[12px]'>{userState?.name}</p>
                      {/* hiển thị thông báo */}
                      
                    </div>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item cursor-pointer"
                        to="/my-order">
                        Đơn hàng của tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item cursor-pointer"
                        to="/my-products">
                       Sản phâm của tôi
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item cursor-pointer"
                        onClick={() => {
                          sessionStorage.clear();
                          localStorage.clear();
                          toast.success("Đăng xuất thành công")
                          window.location.reload();
                          navigate("/");
                        }}>
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
                <button className='btn btn-ban hover:cursor-pointer'>
                  <Link to="/dang-ban">Đăng bán</Link>
                </button>
              </>
                  ) : (
                    <>
                      <div className="action">
                        <Link className='p-4 hover:cursor-pointer' to='/dang-ky'>Đăng ký</Link>
                        <Link className='p-4 hover:cursor-pointer' to='/dang-nhap'>Đăng nhập</Link>
                        <button className='btn btn-ban hover:cursor-pointer'>
                          <Link to="/dang-ban">Đăng bán</Link>
                        </button>
                      </div>
                    </>
                  )} 
          </div>
          <div className="container">
            <div className="flex items-center gap-2 justify-between">
              
              <div className="p-2 flex items-center text-[16px] hover:cursor-pointer">
                <Link className=' flex items-center ' to='/tat-ca'>
                  <MdBorderAll className='me-1'/>
                  Tất cả danh mục
                </Link>
                </div>
                <div className="w-px h-6 bg-[#ddd]"></div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=sach`} className='p-2 d-block'>
                  Sách
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Đồ cho nam')}`} className='p-2 d-block'>
                  Đồ cho nam
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Thời trang nữ')}`} className='p-2 d-block'>
                  Thời trang nữ
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Đồ làm đẹp')}`} className='p-2 d-block'>
                  Đồ làm đẹp
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Đồ cho mẹ và bé')}`} className='p-2 d-block'>
                  Đồ cho mẹ và bé
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Đồ chơi và trò chơi')}`} className='p-2 d-block'>
                  Đồ chơi & trò chơi
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Đồ dùng nhà cửa')}`} className='p-2 d-block'>
                  Đồ dùng nhà cửa
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Thiết bị điện tử')}`} className='p-2 d-block'>
                  Thiết bị điện tử
                </Link>
                </div>
              <div className="text-[16px] hover:cursor-pointer">
                <Link to={`/tat-ca?category=${encodeURIComponent('Đồ văn phòng')}`} className='p-2 d-block'>
                  Đồ văn phòng
                </Link>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
