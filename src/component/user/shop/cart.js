import React from "react";
import PageHeader, { GetConvertedImage } from "../../../utils/base";
import Header from "../home/header";
import Footer from "../home/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePorductFromCartApi,
  ProccedToCheckoutApi,
  UpdatePorductQuantityInCartApi,
} from "../../../api/shop/cart";
import { Link, useNavigate } from "react-router-dom";
import { BaseToastContainar, ErrorToast } from "../../toast/base";
export default function Cart() {
  const cartdata = useSelector((state) => {
    return state.CartReducer.cartdata;
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateQuantity = async (productId, qyt) => {
    if (qyt < 1) {
    } else {
      var data = { product: productId, quantity: qyt };
      const res = await UpdatePorductQuantityInCartApi(data, dispatch);
    }
  };

  const ValidateCart = async () => {
    const check = await ProccedToCheckoutApi();
    if (check.status) {
      return navigate("/user/cart/checkout");
    } else {
      ErrorToast(check.data["details"]);
    }
  };

  const updateExtraDetail = async (event) => {
    var pid = event.target.attributes.productId.value;
    var index = event.target.attributes.index.value;
    var extra = cartdata.data[index].extra_info;

    var data = {
      product: pid,
      extra_info: { ...extra, [event.target.name]: event.target.value },
    };
    console.log(data);
    const res = await UpdatePorductQuantityInCartApi(data, dispatch);
  };

  const deletProductFromCart = async (productId) => {
    const res = await DeletePorductFromCartApi(productId, dispatch);
  };
  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <BaseToastContainar></BaseToastContainar>
      <div class="container-fluid pt-5">
        <div class="row px-xl-5">
          <div class="col-lg-8 table-responsive mb-5">
            <table class="table table-bordered text-center mb-0">
              <thead class="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                {cartdata.data ? (
                  cartdata.data.length > 0 ? (
                    cartdata.data.map((cart, index) => {
                      return (
                        <tr>
                          <td class="align-middle">
                            {/* {console.log(cartdata)} */}
                            <img
                              src={
                                cart.product_detail.images.image.image
                                  ? GetConvertedImage(
                                      cart.product_detail.images.image.image
                                    )
                                  : "img/product-1.jpg"
                              }
                              alt=""
                              style={{ height: "35px" }}
                            />{" "}
                            {cart.product_detail.product_name}
                          </td>
                          <td class="align-middle">
                            {" "}
                            Rs.{cart.product_detail.price}
                          </td>
                          <td class="align-middle">
                            <div
                              class="input-group quantity mx-auto"
                              style={{ width: "100px" }}
                            >
                              <div class="input-group-btn">
                                <button
                                  onClick={() => {
                                    updateQuantity(
                                      cart.product_detail.id,
                                      cart.quantity - 1
                                    );
                                  }}
                                  class="btn btn-sm btn-primary btn-minus"
                                >
                                  <i class="fa fa-minus"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                class="form-control form-control-sm bg-secondary text-center"
                                value={cart.quantity}
                              />
                              <div class="input-group-btn">
                                <button
                                  onClick={() => {
                                    updateQuantity(
                                      cart.product_detail.id,
                                      cart.quantity + 1
                                    );
                                  }}
                                  class="btn btn-sm btn-primary btn-plus"
                                >
                                  <i class="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td class="align-middle">
                            <select
                              index={index}
                              productId={cart.product.id}
                              onChange={updateExtraDetail}
                              style={{ minWidth: "80px" }}
                              className="form-control"
                              name="size"
                            >
                              <option
                                selected={cart.extra_info.size ? false : true}
                                disabled={true}
                              >
                                Size
                              </option>
                              {cart.product.size
                                ? cart.product.size.map((sizes) => {
                                    return (
                                      <option
                                        selected={
                                          cart.extra_info.size
                                            ? cart.extra_info.size === sizes
                                              ? true
                                              : false
                                            : false
                                        }
                                        value={sizes}
                                      >
                                        {sizes}
                                      </option>
                                    );
                                  })
                                : ""}
                            </select>
                          </td>
                          <td class="align-middle">
                            <select
                              index={index}
                              productId={cart.product.id}
                              onChange={updateExtraDetail}
                              style={{ minWidth: "80px" }}
                              className="form-control"
                              name="color"
                            >
                              <option
                                selected={cart.extra_info.color ? false : true}
                                disabled={true}
                              >
                                Color
                              </option>
                              {cart.product.color
                                ? cart.product.color.map((colors) => {
                                    return (
                                      <option
                                        selected={
                                          cart.extra_info.color
                                            ? cart.extra_info.color === colors
                                              ? true
                                              : false
                                            : false
                                        }
                                        value={colors}
                                      >
                                        {colors}
                                      </option>
                                    );
                                  })
                                : ""}
                            </select>
                          </td>
                          <td class="align-middle">
                            Rs.{cart.product_detail.totalPrice}
                          </td>
                          <td class="align-middle">
                            <button
                              onClick={(event) => {
                                event.target.style.transition =
                                  "opacity 2000ms;";

                                deletProductFromCart(cart.product_detail.id);
                              }}
                              class="btn btn-sm btn-primary"
                            >
                              <i class="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td class="align-middle" colSpan={5}>
                        <div className="pt-5 pb-5">
                          <center>
                            <img
                              className="mt-4 "
                              style={{ height: "100px" }}
                              src={
                                process.env.PUBLIC_URL + "/img/trash-can.png"
                              }
                            ></img>
                            <h4 className="mb-5p"> Cart is empty</h4>
                          </center>
                        </div>
                      </td>
                    </tr>
                  )
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
          <div class="col-lg-4">
            <form class="mb-5" action="">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control p-4"
                  placeholder="Coupon Code"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <div class="card border-secondary mb-5">
              <div class="card-header bg-secondary border-0">
                <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              {cartdata.data ? (
                cartdata.data.length > 0 ? (
                  <div>
                    <div class="card-body">
                      <div class="d-flex justify-content-between mb-3 pt-1">
                        <h6 class="font-weight-medium">Subtotal</h6>
                        <h6 class="font-weight-medium">
                          Rs. {cartdata.subtotal}
                        </h6>
                      </div>
                      <div class="d-flex justify-content-between">
                        <h6 class="font-weight-medium">Shipping</h6>
                        <h6 class="font-weight-medium">
                          Rs. {cartdata.shipping}
                        </h6>
                      </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                      <div class="d-flex justify-content-between mt-2">
                        <h5 class="font-weight-bold">Total</h5>
                        <h5 class="font-weight-bold">
                          Rs. {cartdata.totalProductPrice}
                        </h5>
                      </div>
                      <button
                        // to={"/user/cart/checkout"}
                        onClick={ValidateCart}
                        class="btn btn-block btn-primary my-3 py-3"
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
