import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProductToCartApi } from "../../../api/shop/cart";
import { GetAuthDetail, GetConvertedImage } from "../../../utils/base";
import $ from "jquery";
import { ErrorToast } from "../../toast/base";
import { useQuery } from "../../../utils/base";
// import  "../../../../public/fly/lib/fly.min.js";
import { Link, useNavigate } from "react-router-dom";
import {
  AddProductToFavoriteApi,
  DeletePorductFromFavoriteApi,
} from "../../../api/favorite/favorite";
function rocketcss(t, o, e) {
  var a = $(t).clone(),
    i = $(o).offset(),
    s = $(t).offset();
  var heightto = $(t).offset().top - 400;
  return (
    setTimeout(() => {
      window.scrollTo(0, heightto / 2);
      window.scrollTo(0, heightto / 4);
      window.scrollTo(0, heightto / 6);
      window.scrollTo(0, 10);
    }, 700),
    a.insertAfter(t),
    console.log($(t)),
    // $(t).css({ opacity: "0" }),
    $(a).css({ fontSize: "100px" }),
    a
      .css({
        position: "fixed",
        "z-index": "999999",
        top: s.top + "px",
        left: s.left + "px",
        right: "auto",
        bottom: "auto",
        margin: "auto",
        padding: "auto",
        opacity: "1",
      })
      .animate({ top: i.top + "px", left: i.left + "px" }, 1500),
    a.addClass("mover " + (e || "rocketPulseHole")),
    setTimeout(function() {
      a.fadeOut(300);
    }, 1500),
    $(t).attr("class", "fa fa-check-circle mr-1"),
    setTimeout(function() {
      $(t).attr("class", "fas fa-shopping-cart text-primary mr-1");
      $(".target-class-cart").removeClass("targetPulse");
      window.scrollTo(0, heightto);
    }, 3000),
    a,
    true
  );
}

export function SingleProduct(props) {
  // Get CartData From Reducer
  const favoriteData = useSelector((state) => {
    return state.FavoriteReducer.favoriteData;
  });

  // convert a favorite product list in the list of product id so we can check
  const getFavoriteProduct = () => {
    var prod = [];
    favoriteData.map((prods) => {
      prod.push(prods.product_detail.id);
    });
    return prod;
  };

  // calling the function
  const FavoriteProduct = getFavoriteProduct();

  const dispatch = useDispatch();
  const product = props.product;

  var isAuth = GetAuthDetail();
  const navigate = useNavigate();

  // const history = useHistor();

  return (
    <div className={"pb-1 " + (props.colclass ? props.colclass : "col-lg-4")}>
      {isAuth ? (
        props.fav ? (
          <i
            className={
              "fa fa-trash text-danger " +
              (FavoriteProduct.includes(product.id) ? "text-primary" : "")
            }
            style={{
              border: "",
              top: "7.8%",
              left: "88%",
              position: "relative",
              zIndex: "999",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={(event) => {
              if (isAuth) {
                if (FavoriteProduct.includes(product.id)) {
                  // $(event.target).removeClass("text-primary");
                  DeletePorductFromFavoriteApi(product.id, dispatch);
                } else {
                  // $(event.target).addClass("text-primary");
                  AddProductToFavoriteApi(product.id, dispatch);
                }
              } else {
                navigate("/user/login");
              }
            }}
            aria-hidden="true"
          ></i>
        ) : (
          <i
            className={
              "fas fa-heart " +
              (FavoriteProduct.includes(product.id) ? "text-primary" : "")
            }
            style={{
              border: "",
              top: "7.8%",
              left: "88%",
              position: "relative",
              zIndex: "999",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={(event) => {
              if (isAuth) {
                if (FavoriteProduct.includes(product.id)) {
                  $(event.target).removeClass("text-primary");
                  DeletePorductFromFavoriteApi(product.id, dispatch);
                } else {
                  $(event.target).addClass("text-primary");
                  AddProductToFavoriteApi(product.id, dispatch);
                }
              } else {
                navigate("/user/login");
              }
            }}
            aria-hidden="true"
          ></i>
        )
      ) : (
        ""
      )}

      <div
        className="card product-item border-0 mb-4"
        style={{ maxHeight: "500px" }}
      >
        <div className="  card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <img
            className="img-fluid w-100"
            src={
              product.images.image.image
                ? GetConvertedImage(product.images.image.image)
                : "img/product-1.jpg"
            }
            alt
          />
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3">{product.product_name}</h6>
          <div className="d-flex justify-content-center">
            <h6>Rs.{product.price}</h6>
            <h6 className="text-muted ml-2">
              <del>Rs.{product.price}</del>
            </h6>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          <Link to={"/shop/" + product.id} className="btn btn-sm text-dark p-0">
            <i className="fas fa-eye text-primary mr-1" />
            View Detail
          </Link>
          <button
            onClick={(event) => {
              if (isAuth) {
                AddProductToCartApi(product.id, dispatch);
                console.log(event);
                const data = rocketcss(
                  event.target.childNodes[0],
                  ".target-class-cart",
                  "rocketPulse"
                );
                const chec = data ? (
                  () => {
                    var newDiv = document.createElement("i");
                    newDiv.setAttribute(
                      "className",
                      "fas fa-shopping-cart text-primary mr-1"
                    );
                  }
                ) : (
                  <></>
                );
                $(".target-class-cart").addClass("targetPulse");
              } else {
                navigate("/user/register");
                window.scroll(0, 600);
              }
            }}
            className="btn btn text-dark p-0 ButtonForCart"
          >
            <i className="fas fa-shopping-cart text-primary mr-1" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
