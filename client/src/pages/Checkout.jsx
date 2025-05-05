import React, {
  useEffect,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  emptycart,
  getCart,
} from "../features/users/userSlice";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { config } from "../utils/axiosconfig";
import Paypal from "../components/Paypal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string().required(
    "Tên không được để trống"
  ),
  email: Yup.string()
  .email("Email không đúng định dạng")
  .required(
    "Email không được để trống"
  ),
  mobile: Yup.string()
  .matches(
    /^(0[3|5|7|8|9]{1}[0-9]{8})$/,
    "Số điện thoại không đúng định dạng"
  )
  .required(
    "Số điện thoại không được để trống"
  ),
  address: Yup.string().required(
    "Địa chỉ không được để trống"
  ),
});

const Checkout = () => {
  const [toggle, setToggle] =
    useState(false);
  const userState = useSelector(
    (state) => state.auth.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] =
    useState(0);
  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("");
  const cartState = useSelector(
    (state) => state.auth?.cartUser
  );
  
  // useEffect(() => {
  //   if (
  //     aProduct &&
  //     allProduct.length > 0
  //   ) {
  //     const filteredProducts =
  //       allProduct
  //         .filter(
  //           (product) =>
  //             product.category ===
  //               aProduct.category &&
  //             product._id !==
  //               aProduct._id
  //         )
  //         .slice(0, 4);
  //     setBrandProduct(filteredProducts);
  //   }
  // }, [aProduct, allProduct]);
  useEffect(() => {
    dispatch(getCart());
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    let sum = 0;
    cartState.forEach((item) => {
      sum +=
        item.quantity *
        (item.productId.priceSale ||
          item.productId.price);
    });
    setTotalAmount(sum);
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (
        paymentMethod ===
        "Chuyển khoản ngân hàng"
      ) {
        setToggle(true);
      } else {
        let payload = {
          shippingInfo: {
            name: formik.values.name,
            email: formik.values.email,
            mobile:
              formik.values.mobile,
            address:
              formik.values.address,
          },
          orderItems: cartState,
          totalPrice: totalAmount,
          paymentMethod:
            "Thanh toán tiền mặt",
        };
        axios
          .post(
            `${base_url}auth/cart/create-order`,
            payload,
            config
          )
          .then(() => {
            toast.success(
              "Đặt hàng thành công"
            );
            dispatch(emptycart());
            dispatch(getCart());
            navigate(
              "/checkout-success"
            );
          })
          .catch((error) => {
            toast.error(
              "Đặt hàng thất bại, vui lòng thử lại"
            );
            console.error(error);
          });
      }
    },
  });


  return (
    <div className="min-h-[900px]  text-black">
      {/* <Breadcrumd title="Giỏ hàng" />
      <Helmetz title='Thanh toán'/> */}
      <div className="container mt-5 pt-[155px]">
        <div className="py-4">
          <div className="">
            <h6>ĐƠN HÀNG CỦA BẠN</h6>
          </div>
          <div className="order-items py-2">
            {cartState &&
              cartState.map(
                (e, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        className="me-3 img-fluid"
                        width={50}
                        height={50}
                        src={
                          e?.productId
                            ?.images[0]
                            ?.url
                        }
                        alt="Product"
                      />
                      <div>
                        <h6
                          className="mb-0"
                          style={{
                            fontSize:
                              "14px",
                          }}>
                          {
                            e?.productId
                              ?.title
                          }
                        </h6>
                        <p className="mb-0">
                          {new Intl.NumberFormat(
                            "vi-VN",
                            {
                              style:
                                "currency",
                              currency:
                                "VND",
                            }
                          ).format(
                            e?.productId
                              ?.priceSale ||
                              e
                                ?.productId
                                ?.price
                          )}
                        </p>
                        <small className="text-muted">
                          Số lượng:{" "}
                          {e?.quantity}
                        </small>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-0">
                        {new Intl.NumberFormat(
                          "vi-VN",
                          {
                            style:
                              "currency",
                            currency:
                              "VND",
                          }
                        ).format(
                          (e?.productId
                            ?.priceSale ||
                            e?.productId
                              ?.price) *
                            e?.quantity
                        )}
                      </h6>
                    </div>
                  </div>
                )
              )}
          </div>
          <hr />
          <div className="mt-2 d-flex  justify-content-start gap-10">
            <h4 className="mb-1 title_pr">
              Tổng tiền :
            </h4>
            <h4 className="mb-1 title_pr">
              {new Intl.NumberFormat(
                "vi-VN",
                {
                  style: "currency",
                  currency: "VND",
                }
              ).format(totalAmount)}
            </h4>
          </div>
        </div>
        <div className="py-4">
          <form
            onSubmit={
              formik.handleSubmit
            }>
            <div className="">
              <h6>ĐỊA CHỈ GIAO HÀNG</h6>
            </div>
            <div className="mt-4">
              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label">
                  Họ và tên người nhận
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="staticEmail"
                    onChange={formik.handleChange(
                      "name"
                    )}
                    onBlur={formik.handleBlur(
                      "name"
                    )}
                    value={
                      formik.values.name
                    }
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched
                      .name &&
                      formik.errors
                        .name}
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputPassword"
                    onChange={formik.handleChange(
                      "email"
                    )}
                    onBlur={formik.handleBlur(
                      "email"
                    )}
                    value={
                      formik.values
                        .email
                    }
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched
                      .email &&
                      formik.errors
                        .email}
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label">
                  Số điện thoại
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    onChange={formik.handleChange(
                      "mobile"
                    )}
                    onBlur={formik.handleBlur(
                      "mobile"
                    )}
                    value={
                      formik.values
                        .mobile
                    }
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched
                      .mobile &&
                      formik.errors
                        .mobile}
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label">
                  Địa chỉ nhận hàng
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    onChange={formik.handleChange(
                      "address"
                    )}
                    onBlur={formik.handleBlur(
                      "address"
                    )}
                    value={
                      formik.values
                        .address
                    }
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched
                      .address &&
                      formik.errors
                        .address}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-3">
              <h6>
                PHƯƠNG THỨC VẬN CHUYỂN
              </h6>
            </div>
            <div className="">
              <div className="form-check mb-3">
                <input
                  className="form-check-input me-3"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="Thanh toán tiền mặt"
                  checked={
                    paymentMethod ===
                    "Thanh toán tiền mặt"
                  }
                  onChange={() => {
                    setPaymentMethod(
                      "Thanh toán tiền mặt"
                    );
                    setToggle(false);
                  }}
                />
                <div className="d-flex align-items-center">
                  <img
                    className="me-3"
                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=105699"
                    width="40px"
                    alt=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1">
                    Thanh toán bằng tiền
                    mặt khi nhận hàng
                  </label>
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input me-3"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="Chuyển khoản ngân hàng"
                  checked={
                    paymentMethod ===
                    "Chuyển khoản ngân hàng"
                  }
                  onChange={() => {
                    setPaymentMethod(
                      "Chuyển khoản ngân hàng"
                    );
                  }}
                />
                <div className="">
                  <img
                    className="me-3"
                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=105699"
                    width="40px"
                    alt=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2">
                    Thanh toán paypal
                  </label>
                </div>
              </div>
            </div>
            {toggle !== true ? (
              <button
                type="submit"
                className="button-res my-4">
                Xác nhận thanh toán
              </button>
            ) : (
              <div className="">
                <Paypal
                  amount={totalAmount}
                  payload={{
                    shippingInfo: {
                      name: formik
                        .values.name,
                      email:
                        formik.values
                          .email,
                      mobile:
                        formik.values
                          .mobile,
                      address:
                        formik.values
                          .address,
                    },
                    orderItems:
                      cartState,
                    totalPrice:
                      totalAmount,
                    paymentMethod:
                      "Chuyển khoản ngân hàng",
                  }}
                />
              </div>
            )}
            {/* <button
              type="submit"
              className="button-res my-4">
              Xác nhận thanh toán
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
