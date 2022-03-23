import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../../utils/base";
import Footer from "../home/footer";
import Header from "../home/header";
import { SingleProduct } from "./singleProduct";

export default function Favorite() {
  // Used to navigate to another route
  const navigate = useNavigate();

  // Method Used to Dispatch an action in reducer
  const dispatch = useDispatch();

  // Get CartData From Reducer
  const favoriteData = useSelector((state) => {
    return state.FavoriteReducer.favoriteData;
  });

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      {/* Products Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Favorite List </span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {favoriteData.length > 0 ? (
            favoriteData.map((favorite) => {
              return (
                <SingleProduct
                  colclass="col-lg-3"
                  product={favorite.product_detail}
                  fav="true"
                ></SingleProduct>
              );
            })
          ) : (
            <div className="d-flex">
              <center>
                <Link className="btn btn-primary" to="/shop">
                  Add an Product
                </Link>
              </center>
            </div>
          )}
        </div>
      </div>
      {/* Products End */}
      <Footer></Footer>
    </div>
  );
}
