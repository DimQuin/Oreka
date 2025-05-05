import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { base_url } from '../utils/base_url';
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  name: yup.string().required("Vui lòng nhập tên"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector(state => state.auth.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userState) {
        navigate('/');
      }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(`${base_url}auth/register`, values);
        if (res.data.success) {
          toast.success(res.data.message || "Đăng ký thành công");
          resetForm();
          setTimeout(() => {
            navigate('/dang-nhap');
          }, 1000);
        } else {
          toast.error(res.data.message || "Đăng ký thất bại");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Đã xảy ra lỗi.");
        } else if (error.request) {
          toast.error("Không thể kết nối đến server.");
        } else {
          toast.error("Đã xảy ra lỗi.");
        }
      }
    }
  });

  return (
    <section className='bg-[#f3f3f3]'>
      <div className='container flex py-5'>
        <div className="relative flex-1">
          <img className="mx-auto pt-16" src="https://static.oreka.vn/d/_next/static/images/banner_login-815970500699766c2df2ffbb98a94b27.png" alt="banner login" />
        </div>
        <div className="bg-white w-[400px] p-4 rounded-2xl">
          <form className='mx-auto w-[350px]' onSubmit={formik.handleSubmit}>
            <h6 className='text-center'>Đăng ký</h6>

            <div className="mb-3 relative">
              <label className="form-label">Nhập địa chỉ Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nhập địa chỉ email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Nhập tên</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nhập tên"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control pr-10 w-full"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            <div className="flex justify-center">
              <button type="submit" className="btn btn-ban text-white w-100">Đăng ký</button>
            </div>

            <div className="flex mt-4">
              <p className='me-2 text-[#999]'>Bạn đã có sẵn tài khoản?</p>
              <Link to="/dang-nhap" className='xem'>Đăng nhập</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
