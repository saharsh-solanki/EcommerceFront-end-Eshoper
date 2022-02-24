import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index></Index>} />
          <Route exact path="/shop" element={<Shop></Shop>} />
          <Route exact path="/contact" element={<ContactUs></ContactUs>} />
          <Route
            exact
            path="/shop/:productid"
            element={<ProductDetail></ProductDetail>}
          />
          <Route exact path="user/login" element={<Login></Login>} />
          <Route exact path="user/register" element={<Register></Register>} />
          <Route exact path="user/cart" element={<Cart></Cart>} />
          <Route exact path="user/favorite" element={<Favorite></Favorite>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
