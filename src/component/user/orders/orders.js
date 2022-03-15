import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoginApi } from "../../../api/auth/login";
import { OrdersApi } from "../../../api/order/orders";
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

export default function Orders() {
  //   const cartdata = useSelector((state) => {
  //     return state.CartReducer.cartdata;
  //   });

  const [orderData, setorderData] = React.useState(null);
  console.log("🚀 ~ file: orders.js ~ line 23 ~ Orders ~ orderData", orderData);
  //   console.log(
  //     "🚀 ~ file: checkout.js ~ line 27 ~ Checkout ~ addressState",
  //     addressState
  //   );

  //   //   const data1 = useSelector((state) => {
  //   //     return state.AccountReducer.data;
  //   //   });
  //   //   const [FromData, setFromData] = React.useState({ loader: false });
  //   const [AddressData, setAddressData] = useState([]);
  //   const dispatch = useDispatch();

  //   const getAndSetAddress = async () => {
  //     const response = await GetUserAddressApi();
  //     if (response.status) {
  //       setAddressData(response.data);
  //       return response.data;
  //     } else {
  //       ErrorToast("Got Error While Retriving Your address");
  //     }
  //   };

  useEffect(async () => {
    const data = await OrdersApi();
    await setorderData(data.data);
  }, []);

  //   const DeleteAddress = async (id) => {
  //     const response = await DeleteAddressApi(id);
  //     if (response.status) {
  //       getAndSetAddress();
  //       SuccessToast("Deleted Successfully !");
  //     } else {
  //       ErrorToast("Cant delete");
  //     }
  //   };

  //   const HandleInputChange = (event) => {
  //     setaddressState({
  //       ...addressState,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   const handleFromSubmit = async () => {
  //     setFromData({ ...FromData, loader: true });
  //     // var pendingToasts = await PendingToast("Updating  ....");
  //     const response = await AddNewAddressApi(FromData);
  //     await ClearAllToast();
  //     if (response.status) {
  //       SuccessToast("Address Added Successfully ..");
  //       setFromData({ ...FromData, loader: false });
  //       getAndSetAddress();
  //     } else {
  //       var obj = Object.keys(response.data);
  //       for (var key in Object.keys(response.data)) {
  //         ErrorToast(obj[key] + " " + response.data[obj[key]]);
  //       }
  //       setFromData({ ...FromData, loader: false });
  //     }
  //     setFromData({ ...FromData, loader: false });
  //   };

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <div className="container">
        <div className="col-lg-12 table-responsive mb-5">
          {orderData ? (
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>OrderId</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Delivery status</th>
                  <th>Payment Type</th>
                  <th>View Detail</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {orderData.map((order) => {
                  return (
                    <tr>
                      <td className="align-middle">
                        {/* <img
                          src="img/product-1.jpg"
                          alt
                          style={{ width: 50 }}
                        />{" "}
                        Colorful Stylish Shirt */}
                        {order.order_id}
                      </td>
                      <td className="align-middle">
                        Rs. {order.TotalPaidAmount}
                      </td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: 100 }}
                        >
                          {order.status}
                        </div>
                      </td>
                      <td className="align-middle">{order.order_date}</td>
                      <td className="align-middle">{order.deliveryStatus}</td>
                      <td className="align-middle">{order.paymentType}</td>
                      <td>
                        <Link
                          to={"/user/orders/" + order.id}
                          // onClick={() => {
                          //   console.log(order.id);
                          // }}
                          className="btn btn-primary"
                        >
                          View Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            "Did not purchase any product yet"
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
