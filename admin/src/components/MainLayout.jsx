import React, {
  useEffect,
  useState,
} from "react";
import {
  Link,
  Outlet,
} from "react-router-dom";
import { SiBrandfolder } from "react-icons/si";
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiFileListFill } from "react-icons/ri";
import {
  Layout,
  Menu,
  Button,
  theme,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { base_url } from "../utils/base_url";

const { Header, Sider, Content } =
  Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] =
    useState(false);
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
    },
  } = theme.useToken();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth?.user
  );

  
  const [count,setCount] =useState(0)
  
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="logo">
          <h2 className="mb-0 w-100">
            <span className="sm-logo text-white">
              AD
            </span>
            <span className="lg-logo text-white">
              ADMIN
            </span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key); // di chuyen toi trang can toi nho key cua items
            }
          }}
          items={[
            {
              key: "",
              icon: (
                <AiOutlineDashboard className="fs-4" />
              ),
              label: "Trang chủ",
            },
            {
              key: "list-users",
              icon: (
                <CiUser className="fs-4" />
              ),
              label:
                "Quản lý người dùng",
            },
            // {
            //   key: "blog",
            //   icon: (
            //     <CiUser className="fs-4" />
            //   ),
            //   label: "Blog",
            //   children: [
            //     {
            //       key: "list-categoryblog",
            //       icon: (
            //         <CiShoppingCart className="fs-4" />
            //       ),
            //       label:
            //         "Danh mục blog",
            //     },
            //     {
            //       key: "list-blogs",
            //       icon: (
            //         <SiBrandfolder className="fs-4" />
            //       ),
            //       label: "Quản lý blog",
            //     },
            //   ],
            // },
            {
              key: "catalog",
              icon: (
                <CiShoppingCart className="fs-4" />
              ),
              label: "Catalog",
              // xổ ra các mục con
              children: [
                {
                  key: "list-product",
                  icon: (
                    <CiShoppingCart className="fs-4" />
                  ),
                  label:
                    "Danh sách sản phẩm",
                },
                {
                  key: "list-brand",
                  icon: (
                    <SiBrandfolder className="fs-4" />
                  ),
                  label:
                    "Danh sách nhãn hàng",
                },
                {
                  key: "list-category",
                  icon: (
                    <SiBrandfolder className="fs-4" />
                  ),
                  label:
                    "Danh sách danh mục",
                },
                {
                  key: "list-slide",
                  icon: (
                    <RiFileListFill className="fs-4" />
                  ),
                  label:
                    "Danh sách Slide",
                },
              ],
            },
            {
              key: "supplier",
              icon: (
                <FaClipboardList className="fs-4" />
              ),
              label: "Quản lý NSX",
            },
            {
              key: "package",
              icon: (
                <FaClipboardList className="fs-4" />
              ),
              label:
                "Quản lý nhập hàng",
            },
            {
              key: "orders",
              icon: (
                <FaClipboardList className="fs-4" />
              ),
              label: "Đơn đặt hàng",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between px-3 pe-5"
          style={{
            padding: 0,
            background:
              colorBgContainer,
          }}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <FiArrowRightCircle className="fs-5" />
              ) : (
                <FiArrowLeftCircle className="fs-5" />
              )
            }
            onClick={() =>
              setCollapsed(!collapsed)
            }
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex  align-items-center">
          <div className="d-flex gap-3 align-items-center dropdown">
              
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                className=""
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <img
                  style={{
                    width: "45px",
                    height: "45px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src="https://static.oreka.vn/wp-content/uploads/2023/11/30035130/Logo-2.png"
                  alt=""
                />
              </div>
              <div>
                {/* <h5 className='mb-0'>Xin chào : {user?.name}</h5> */}
              </div>
              <div className="dropdown-menu">
              {/* <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{
                      height: "auto",
                      lineHeight:
                        "20px",
                    }}
                    onClick={() => {
                     navigate('/admin/thongbao')
                    }}>
                      Thông báo
                  </button>
                </li> */}
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{
                      height: "auto",
                      lineHeight:
                        "20px",
                    }}
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.reload();
                    }}>
                    Đăng xuất
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background:
              colorBgContainer,
            borderRadius:
              borderRadiusLG,
          }}>
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
