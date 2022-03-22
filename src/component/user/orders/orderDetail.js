import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LoginApi } from "../../../api/auth/login";
import { OrderDetailApi, OrdersApi } from "../../../api/order/orders";
import PageHeader, { GetConvertedImage } from "../../../utils/base";
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

export default function OrderDetail() {
  const [orderData, setorderData] = React.useState(null);
  let { id } = useParams();
  useEffect(async () => {
    const response = await OrderDetailApi(id);
    if (response.status) {
      await setorderData(response.data);
    } else {
      ErrorToast(response.data.detail);
    }
  }, []);

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <div className="container">
        {orderData ? (
          <div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card border-secondary mb-5">
                  <div className="card-header bg-secondary border-0 ">
                    <h4 class="font-weight-semi-bold m-0">Order Detail</h4>
                  </div>
                  <div className="card-body ">
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <b>Order ID : </b> {orderData.order_id}{" "}
                      </div>
                      <div className="col-lg-6">
                        <b>order date : </b> {orderData.order_date}{" "}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <b>Payment Type : </b> {orderData.paymentType}{" "}
                      </div>
                      <div className="col-lg-6">
                        <b>Amount : </b>Rs. {orderData.TotalPaidAmount}{" "}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <b>Payment Status : </b> {orderData.status}{" "}
                      </div>
                      <div className="col-lg-6">
                        <b>discount : </b>Rs. {orderData.discount}{" "}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <b>Delihvery Status : </b> {orderData.deliveryStatus}{" "}
                      </div>
                      <div className="col-lg-6">
                        <b>dehliveryId : </b> {orderData.dehliveryId}{" "}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <b>transection_id : </b> {orderData.transection_id}{" "}
                      </div>
                      <div className="col-lg-6">
                        <b>Unique id : </b> {orderData.id}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div classname="col-lg-6">
                <div className="card border-secondary mb-5">
                  <div
                    classname="card-body "
                    style={{
                      display: "block",
                      width: "100%",
                      overflowX: "auto",
                    }}
                  >
                    <table className="table table-bordered text-center mb-0">
                      <thead className="bg-secondary text-dark">
                        <tr>
                          <th>Product Name </th>
                          <th>Amount</th>
                          <th>Extra Info</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="align-middle">
                        {orderData.cartdata.map((cart) => {
                          return (
                            <tr>
                              <td className="align-middle">
                                <img
                                  src={
                                    cart.product.images.image.image
                                      ? GetConvertedImage(
                                          cart.product.images.image.image
                                        )
                                      : "img/product-1.jpg"
                                  }
                                  style={{ height: "50px" }}
                                ></img>{" "}
                                &nbsp;
                                <span>{cart.product.product_name}</span>
                              </td>
                              <td className="align-middle">
                                Rs. {cart.product.price}{" "}
                              </td>
                              <td>
                                {cart.extra_info
                                  ? Object.keys(cart.extra_info).map((key) => {
                                      return (
                                        <span>
                                          {key} : {cart.extra_info[key]}
                                          <br></br>
                                        </span>
                                      );
                                    })
                                  : ""}
                              </td>
                              <td>*{cart.quantity ? cart.quantity : ""}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-secondary mb-5 ">
                <div className="card-header bg-secondary border-0 ">
                  <h4 class="font-weight-semi-bold m-0">Address</h4>
                </div>
                <div className="card-body">
                  {orderData.address.full_name},<br></br>
                  {orderData.address.address},<br></br>
                  {orderData.address.city_name} , {orderData.address.state_name}
                  <br></br>
                  +91 {orderData.address.phone_number}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            Hey Your order history is empty ..
            <br>{/* <br></br> */}</br>
            <br></br>
            <Link to="/shop" className="btn btn-primary">
              Buy Products
            </Link>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
