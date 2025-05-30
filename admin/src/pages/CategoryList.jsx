import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategory } from '../feature/pcategory/pcategorySlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';

const { Search } = Input;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [searchText, setSearchText] = useState(""); // State lưu trữ từ khóa tìm kiếm

  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const stateCategory = useSelector(state => state.category.categories);
  const clonedCategory = [...stateCategory];
  const mapCategory = clonedCategory.slice().reverse();

  // Hàm lọc danh sách category dựa trên từ khóa tìm kiếm
  const filteredData = mapCategory.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const data1 = [];
  for (let i = 0; i < filteredData.length; i++) {
    data1.push({
      key: i + 1,
      title: filteredData[i].title,
      action: (
        <>
          <Link to={`/admin/category/${filteredData[i]._id}`}><FaEdit className='fs-5 text-secondary' /></Link>
          <button
            className='bg-transparent border-0'
            onClick={() => {
              showModal(filteredData[i]._id);
            }}
          >
            <MdDelete className='ms-3 fs-5 text-danger' />
          </button>
        </>
      )
    });
  }

  const deleteCt = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategory());
    }, 100);
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        Category List
      </h3>
      <div className="row">
        <div className="col-4">
          <button className='btn btn-primary mt-2 mb-2'>
            <Link to='/admin/category' className='text-decoration-none text-white'>
              Add Category
            </Link>
          </button>
        </div>
        <div className="col-8">
          {/* Thêm trường nhập dữ liệu để nhập từ khóa tìm kiếm */}
          <Search
            placeholder="Tìm kiếm danh mục"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%"}}
          />
        </div>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteCt(categoryId) }}
        title="Are you sure you want to delete this category ?" />
    </div>
  );
}

export default CategoryList;
