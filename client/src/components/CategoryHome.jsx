import React from 'react'
import { Link } from 'react-router-dom'

const listCategory =[
    {
        url :"Sách",
        img:"https://static.oreka.vn/d/_next/static/images/category-sach-5c531ee42562900188b7d3397919573d.jpg",
        text:"Sách"
    },
    {
        url :"Thời trang nữ",
        img:"https://static.oreka.vn/d/_next/static/images/category-thoi-trang-nu-316dde81baf1938a409891c01d265ca0.jpg",
        text:"Thời trang nữ"
    },
    {
        url :"Thời trang nam",
        img:"https://static.oreka.vn/d/_next/static/images/category-thoi-trang-nam-84294c1f8816973439b42f1dc77aa0dd.jpg",
        text:"Thời trang nam"
    },
    {
        url :"Đồ cho mẹ và bé",
        img:"https://static.oreka.vn/d/_next/static/images/category-cho-tre-em-6321ea9448fe9bd717caaac90c161eb9.jpg",
        text:"Đồ cho mẹ và bé"
    },
    {
        url :"Đồ chơi và trò chơi",
        img:"https://static.oreka.vn/d/_next/static/images/category-do-choi-tro-choi-0afdcc5a13614e6e742d7565acb1526c.jpg",
        text:"Đồ chơi và trò chơi"
    },
    {
        url :"Xe cộ",
        img:"https://static.oreka.vn/d/_next/static/images/category-xe-dap-dien-5654d792ac5fca0d84775777c7752c97.jpg",
        text:"Xe cộ"
    },
    {
        url :"Đồ dùng nhà cửa",
        img:"https://static.oreka.vn/d/_next/static/images/category-nha-cua-c44e03e1855f5db5fe8f1adffb255098.jpg",
        text:"Đồ dùng nhà cửa"
    },
    {
        url :"Giày nữ",
        img:"https://static.oreka.vn/d/_next/static/images/category-giay-nu-7f7cb1ede6d6bc9900766aca7fd421e1.jpg",
        text:"Giày nữ"
    },
    {
        url :"Giày nam",
        img:"https://static.oreka.vn/d/_next/static/images/category-giay-nam-88659d4352169abb7d7e61c06b6e074d.jpg",
        text:"Giày nam"
    },
    {
        url :"Đồ cho thú cưng",
        img:"https://static.oreka.vn/d/_next/static/images/category-thu-cung-e0ff2dfeee850474d73b642c6d5cd9c6.jpg",
        text:"Đồ cho thú cưng"
    },

    // 
    {
        url :"Thiết bị điện tử",
        img:"https://static.oreka.vn/d/_next/static/images/category-do-dien-tu-70e0ab6865bf49b10bfb1419030691ae.jpg",
        text:"Thiết bị điện tử"
    },
    {
        url :"Thể thao và dã ngoại",
        img:"https://static.oreka.vn/d/_next/static/images/category-the-thao-va-da-ngoai-567314dcf4244e5e315f7599e4aabe5e.jpg",
        text:"Thể thao và dã ngoại"
    },
    {
        url :"Văn phòng",
        img:"https://static.oreka.vn/d/_next/static/images/category-van-phong-3b743dcd6bff13b885dbe7ac90002045.jpg",
        text:"Văn phòng"
    },
    {
        url :"Trang sức và phụ kiện",
        img:"https://static.oreka.vn/d/_next/static/images/category-trang-suc-b9aff59cb720aa167ac8e1c7e8aa335d.jpg",
        text:"Trang sức và phụ kiện"
    },
    {
        url :"Máy ảnh",
        img:"https://static.oreka.vn/d/_next/static/images/category-may-anh-3c142ba1fbd1266df303df615d52f563.jpg",
        text:"Máy ảnh"
    },
    {
        url :"Thiết bị âm thanh",
        img:"https://static.oreka.vn/d/_next/static/images/category-am-thanh-3f34c71c707e699ba6dfa77522f88dae.jpg",
        text:"Thiết bị âm thanh"
    },
    {
        url :"Đồ âm nhạc và nghệ thuật",
        img:"https://static.oreka.vn/d/_next/static/images/category-am-nhac-75657142f06556c995eba6f155d9da14.jpg",
        text:"Đồ âm nhạc và nghệ thuật"
    },
    {
        url :"Nước hoa",
        img:"https://static.oreka.vn/d/_next/static/images/category-nuoc-hoa-843b765e14ed1a45a193284bff5a4a18.jpg",
        text:"Nước hoa"
    },
    {
        url :"Thiết bị ô tô",
        img:"https://static.oreka.vn/d/_next/static/images/category-phu-kien-xe-acca84a761f6b4b2c7767d89091596a3.jpg",
        text:"Thiết bị ô tô"
    },
    {
        url :"",
        img:"https://static.oreka.vn/d/_next/static/images/category-khac-de94d2862935cc3a103c02db9184ffbc.jpg",
        text:"Khác"
    },
]

export default function CategoryHome() {
  return (
    <section className='container bg-white py-4 px-2'>
        <h5>Danh mục đa dạng</h5>
        <p className='text-[#999]'>Danh mục sản phẩm đa dạng, từ mới đến đã qua sử dụng. Hơn 1.000 sản phẩm được cập nhật mỗi tuần</p>
        <div className="grid grid-rows-2 grid-cols-10 mt-5">
            {
                listCategory.map((e,index)=>(
                    <Link key={index} class="flex flex-col items-center rounded-md  category" to={`/tat-ca?category=${encodeURIComponent(e.url)}`}>
                        <img alt="Sách" loading="lazy" width="74" height="74" decoding="async" data-nimg="1" src={e.img}/>
                        <p class="text-center py-4">{e.text}</p>
                    </Link>
                ))
            }
        </div>
    </section>
  )
}
