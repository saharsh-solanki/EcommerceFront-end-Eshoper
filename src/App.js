import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Index from "./component/user/home";
import Header from "./component/user/home/header";
import Footer from "./component/user/home/footer";
import Login from "./component/user/account/login";
import Shop from "./component/user/shop/shop";
import Cart from "./component/user/shop/cart";
import ProductDetail from "./component/user/shop/productDetail";
import Register from "./component/user/account/register";
import ContactUs from "./component/pages/conatctUs";
import Favorite from "./component/user/shop/favorite";
import { GetAccessToken } from "./api/base";
import Profile from "./component/user/account/profile";
import Address from "./component/user/address/address";
import Checkout from "./component/user/checkout/checkout";
import Orders from "./component/user/orders/orders";
import OrderDetail from "./component/user/orders/orderDetail";
import { NotFound } from "./component/pagenotfound/notfound";
import AdminUserView from "./component/admin/user/userView";
import AdminHeader from "./component/admin/adminHeader";
import AdminProductView from "./component/admin/product/product";
import AdminDashboardView from "./component/admin/dashboard/dashboard";
import AdminProductCategoryView from "./component/admin/product/category";
import AdminProductImagesView from "./component/admin/product/product_image";
import AdminOrderView from "./component/admin/orders/order";

function App() {
  const access = GetAccessToken();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound></NotFound>} />
          <Route exact path="/" element={<Index></Index>} />
          <Route exact path="/shop" element={<Shop></Shop>} />
          <Route exact path="/contact" element={<ContactUs></ContactUs>} />
          <Route
            exact
            path="/shop/:productid"
            element={<ProductDetail></ProductDetail>}
          />
          {access ? (
            <>
              <Route
                exact
                path="admin/user"
                element={<AdminHeader component={AdminUserView}></AdminHeader>}
              />
              <Route
                exact
                path="admin/product_category"
                element={
                  <AdminHeader
                    component={AdminProductCategoryView}
                  ></AdminHeader>
                }
              />
              <Route
                exact
                path="admin/product_images"
                element={
                  <AdminHeader component={AdminProductImagesView}></AdminHeader>
                }
              />
              <Route
                exact
                path="admin/orders"
                element={<AdminHeader component={AdminOrderView}></AdminHeader>}
              />
              <Route
                exact
                path="admin/dashboard"
                element={
                  <AdminHeader
                    title="Dashboard"
                    component={AdminDashboardView}
                  ></AdminHeader>
                }
              />
              <Route
                exact
                path="admin/product"
                element={
                  <AdminHeader component={AdminProductView}></AdminHeader>
                }
              />
              <Route exact path="user/cart" element={<Cart></Cart>} />
              <Route
                exact
                path="user/cart/checkout"
                element={<Checkout></Checkout>}
              />
              <Route exact path="user/orders" element={<Orders></Orders>} />
              <Route
                exact
                path="user/orders/:id"
                element={<OrderDetail></OrderDetail>}
              />
              <Route
                exact
                path="user/favorite"
                element={<Favorite></Favorite>}
              />
              <Route exact path="/user" element={<Profile></Profile>} />
              <Route exact path="/user/address" element={<Address></Address>} />
            </>
          ) : (
            <>
              <Route exact path="user/login" element={<Login></Login>} />
              <Route
                exact
                path="user/register"
                element={<Register></Register>}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
