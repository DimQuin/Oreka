import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { IoEyeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; // để lấy token từ auth nếu cần
import { base_url } from '../utils/base_url';

const { Search } = Input;

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'title',
  },
  {
    title: 'Thương hiệu',
    dataIndex: 'brand',
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
  },
//   {
//     title: 'Chi tiết',
//     dataIndex: 'action',
//   },
];

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const user = useSelector(state => state.auth.user);
  const token = user?.token;

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await axios.get(`${base_url}product/my-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.products);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm của bạn", err);
      }
    };

    fetchMyProducts();
  }, [token]);
  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase()) ||
    item.price.toString().includes(searchText.toLowerCase())
  );

  const dataSource = filtered.map((item, index) => ({
    key: index + 1,
    title: item.title,
    brand: item.brand,
    category: item.category,
    price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price),
    // action: (
    //   <Link to={`/product/${item._id}`} className='text-primary'>
    //     <IoEyeSharp className='fs-5' />
    //   </Link>
    // ),
  }));

  return (
    <div className='container my-5'>
      <h3 className='mb-4'>Sản phẩm bạn đã đăng</h3>
      <div className="mb-3">
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default MyProducts;
