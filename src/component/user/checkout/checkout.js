import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../../api/auth/login";
import PageHeader from "../../../utils/base";
import {
  ClearAllToast,
  ErrorToast,
  PendingToast,
  successToast,
  SuccessToast,
  ToastToError,
} from "../../toast/base";
import Footer from "../home/footer";
import Header from "../home/header";
import {
  AddNewAddressApi,
  DeleteAddressApi,
  GetUserAddressApi,
} from "../../../api/address/address";
import { codPaymentApi } from "../../../api/payment/cod";
import { Link, useNavigate } from "react-router-dom";
import { startPayment } from "../payment/paytm/pay";
import { handleSuccess } from "../payment/paytm/handleSuccess";
import { ProccedToCheckoutApi } from "../../../api/shop/cart";

export default function Checkout() {
  const cartdata = useSelector((state) => {
    return state.CartReducer.cartdata;
  });

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addressState, setaddressState] = React.useState({});

  const [loaders, setloaders] = React.useState({ mainLoader: true });

  const [AddressData, setAddressData] = useState([]);

  const [paymentType, setpaymentType] = useState();

  const dispatch = useDispatch();

  const getAndSetAddress = async () => {
    const response = await GetUserAddressApi();
    if (response.status) {
      setAddressData(response.data);
      return response.data;
    } else {
      ErrorToast("Got Error While Retriving Your address");
    }
  };

  const ValidateCart = async () => {
    const check = await ProccedToCheckoutApi();
    if (check.status) {
      setloaders({ ...loaders, mainLoader: false });
      await getAndSetAddress();
    } else {
      setTimeout(() => {
        ErrorToast(check.data["details"]);
      }, 1500);
      return navigate("/user/cart/");
    }
  };

  useEffect(async () => {
    const check = await ValidateCart();
  }, []);

  const handlePaymentChange = async (event) => {
    const dhf = await setpaymentType(event.target.value);
    console.log(paymentType);
  };

  const HandleInputChange = (event) => {
    // if (event.target.name === "paymentType") {
    //   setpaymentType(event.target.value);
    // } else {
    setaddressState({
      ...addressState,
      [event.target.name]: event.target.value,
    });
    // }
    console.log(addressState);
  };

  const handlePayment = async () => {
    // addressState.address ? () : alert("Select Address");
    // var pendingToasts = await PendingToast("Updating  ....");

    var data = { paymentType: paymentType, address_id: addressState.address };

    if (addressState.address) {
      if (paymentType) {
        if (paymentType === "COD") {
          const response = await codPaymentApi(data, dispatch);
          if (response.status) {
            successToast("Product ordered Successfully .. Redirecting");
            setTimeout(() => {
              window.location.href = "/user/orders/" + response.data.id;
            }, 1500);
          } else {
            var obj = Object.keys(response.data);
            for (var key in Object.keys(response.data)) {
              ErrorToast(obj[key] + " " + response.data[obj[key]]);
            }
          }
        } else if (paymentType === "paytm") {
          // ErrorToast("Currently We Dont Accept online payment ");
          const resposne = await startPayment(data);
          if (resposne.status) {
            await handleSuccess(resposne.data);
          }
        } else if (paymentType === "online") {
          ErrorToast("Currently We Dont Accept online payment ");
        } else {
          ErrorToast("Invalid Payment method ");
        }
      } else {
        ErrorToast("select a payment method ");
      }
    }

    // await ClearAllToast();
    // if (response.status) {
    //   SuccessToast("Address Added Successfully ..");
    //   setFromData({ ...FromData, loader: false });
    //   getAndSetAddress();
    // } else {
    //   var obj = Object.keys(response.data);
    //   for (var key in Object.keys(response.data)) {
    //     ErrorToast(obj[key] + " " + response.data[obj[key]]);
    //   }
    //   setFromData({ ...FromData, loader: false });
    // }
    // setFromData({ ...FromData, loader: false });
  };

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      {loaders.mainLoader ? (
        <></>
      ) : (
        <>
          <div
            id="paymentFrm"
            className="container"
            style={{ marginTop: "20vh" }}
          ></div>
          <div className="container">
            <div className="row">
              <div className=" col-lg-7">
                <h4 class="font-weight-semi-bold mb-4">Billing Address</h4>

                <div className="row">
                  {AddressData
                    ? AddressData.length > 0
                      ? AddressData.map((useraddress) => {
                          return (
                            <div className="col-lg-4">
                              <div className="custom-control custom-radio p-4  card">
                                <input
                                  type="radio"
                                  class="custom-control-input"
                                  name="address"
                                  id={"address" + useraddress.id}
                                  onChange={HandleInputChange}
                                  value={useraddress.id}
                                />
                                <label
                                  style={{ right: "-11px", top: "-21px" }}
                                  class="custom-control-label"
                                  for={"address" + useraddress.id}
                                ></label>
                                <b className="bold">{useraddress.full_name}</b>
                                {useraddress.address} <br></br>{" "}
                                {useraddress.address_line1},
                                {useraddress.pincode}
                                <br></br>
                                {useraddress.address_type}
                                <br></br>{" "}
                                <div className="input-group mt-2">
                                  <button
                                    //   style={{ bottom: "0" }}
                                    className="btn text-warning"
                                  >
                                    <img
                                      style={{ height: "25px" }}
                                      src="https://img.icons8.com/cute-clipart/64/000000/edit.png"
                                    />
                                  </button>
                                  &nbsp;
                                  {/* <button
                              onClick={() => {
                                DeleteAddress(useraddress.id);
                              }}
                              className="btn text-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button> */}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : "Please add addrss to get started"
                    : ""}
                </div>
              </div>

              <div className="col-lg-5">
                <div className="card border-secondary mb-5">
                  <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="font-weight-medium mb-3 justify-content-between">
                      Products
                    </h5>
                    {cartdata.data
                      ? cartdata.data.length > 0
                        ? cartdata.data.map((cart) => {
                            return (
                              <div className="d-flex justify-content-between">
                                <p>{cart.product_detail.product_name}</p>
                                <p>
                                  Rs.{cart.product_detail.price} *{" "}
                                  {cart.quantity} =
                                </p>
                                <p>Rs. {cart.product_detail.totalPrice}</p>
                              </div>
                            );
                          })
                        : ""
                      : ""}

                    <hr className="mt-0" />
                    {cartdata.data ? (
                      cartdata.data.length > 0 ? (
                        <div>
                          <div className="d-flex justify-content-between mb-3 pt-1">
                            <h6 className="font-weight-medium">Subtotal</h6>
                            <h6 className="font-weight-medium">
                              Rs. {cartdata.subtotal}
                            </h6>
                          </div>
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">
                              Rs. {cartdata.shipping}
                            </h6>
                          </div>
                        </div>
                      ) : (
                        <Link to={"/shop/"} className="btn btn-primary">
                          Add Product
                        </Link>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {cartdata.data ? (
                    cartdata.data.length > 0 ? (
                      <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                          <h5 className="font-weight-bold">Total</h5>
                          <h5 className="font-weight-bold">
                            Rs. {cartdata.totalProductPrice}
                          </h5>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="card border-secondary mb-5">
                  <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0">Payment</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="paymentType"
                          onChange={handlePaymentChange}
                          value="paytm"
                          id="paytm"
                        />
                        <label className="custom-control-label" htmlFor="paytm">
                          pay by paytm
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="paymentType"
                          onChange={handlePaymentChange}
                          value="COD"
                          id="COD"
                        />
                        <label className="custom-control-label" htmlFor="COD">
                          Cash on delivery
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="paymentType"
                          onChange={handlePaymentChange}
                          value="online"
                          id="online"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="online"
                        >
                          Pay Online
                        </label>
                      </div>
                    </div>
                    <div className>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="payment"
                          id="banktransfer"
                          disabled={true}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="banktransfer"
                        >
                          Bank Transfer ( unavailable )
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer border-secondary bg-transparent">
                    <button
                      onClick={handlePayment}
                      disabled={
                        addressState.address && cartdata.data
                          ? cartdata.data.length > 0
                            ? false
                            : true
                          : true
                      }
                      className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"
                    >
                      {addressState.address && cartdata.data
                        ? cartdata.data.length > 0
                          ? "Place Order"
                          : "Cart empty"
                        : "Select an Address"}
                      {/* {addressState.address ? (onclick = { HandlePayment }) : ""} */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer></Footer>
    </div>
  );
}
