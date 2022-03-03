import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SiteDetailsApi } from "../../../api/home/home";
import { rootAction } from "../../../redux/actions";
import { GetConvertedImage } from "../../../utils/base";
import { BaseToastContainar } from "../../toast/base";

function TopBar() {
  return (
    <div class="container-fluid">
      <BaseToastContainar />
      <div class="row bg-secondary py-2 px-xl-5">
        <div class="col-lg-6 d-none d-lg-block">
          <div class="d-inline-flex align-items-center">
            <a class="text-dark" href="">
              FAQs
            </a>
            <span class="text-muted px-2">|</span>
            <a class="text-dark" href="">
              Help
            </a>
            <span class="text-muted px-2">|</span>
            <a class="text-dark" href="">
              Support
            </a>
          </div>
        </div>
        <div class="col-lg-6 text-center text-lg-right">
          <div class="d-inline-flex align-items-center">
            <a class="text-dark px-2" href="">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a class="text-dark px-2" href="">
              <i class="fab fa-twitter"></i>
            </a>
            <a class="text-dark px-2" href="">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a class="text-dark px-2" href="">
              <i class="fab fa-instagram"></i>
            </a>
            <a class="text-dark pl-2" href="">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
          <a href="" class="text-decoration-none">
            <h1 class="m-0 display-5 font-weight-semi-bold">
              <span class="text-primary font-weight-bold border px-3 mr-1">
                E
              </span>
              Shopper
            </h1>
          </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
          <form action="">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search for products"
              />
              <div class="input-group-append">
                <span class="input-group-text bg-transparent text-primary">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-3 col-6 text-right">
          <Link to={"/user/favorite"} class="btn border">
            <i class="fas fa-heart text-primary"></i>
            <span class="badge">0</span>
          </Link>
          <Link to={"/user/cart"} class="btn border">
            <i class="fas fa-shopping-cart text-primary"></i>
            <span class="badge">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header(props) {
  const data = useSelector((state) => {
    return state.HomePageReducer.data;
  });

  const dispatch = useDispatch();

  React.useEffect(async () => {
    const response = await SiteDetailsApi();

    if (response.status) {
      dispatch({
        type: rootAction.product.GetProductData,
        payload: response.data,
      });
    }
  }, []);

  return (
    <div>
      <TopBar></TopBar>
      <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
          <div class="col-lg-3 d-none d-lg-block">
            <a
              class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 class="m-0">Categories</h6>
              <i class="fa fa-angle-down text-dark"></i>
            </a>
            <nav
              className={
                " collapse  navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" +
                " " +
                (window.location.pathname === "/"
                  ? "show"
                  : " position-absolute ")
              }
              style={
                window.location.pathname === "/"
                  ? {}
                  : { width: "calc(100% - 30px", background: "white" }
              }
              id="navbar-vertical"
            >
              <div
                class="navbar-nav w-100 overflow-hidden"
                style={{ height: "410px" }}
              >
                {/* <div class="nav-item dropdown">
                  <a href="#" class="nav-link" data-toggle="dropdown">
                    Dresses <i class="fa fa-angle-down float-right mt-1"></i>
                  </a>
                  <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <a href="" class="dropdown-item">
                      Men's Dresses
                    </a>
                  </div>
                </div> */}

                {data.top_category
                  ? data.top_category.map((category) => {
                      if (category.sub_category.length === 0) {
                        return (
                          <a href="" class="nav-item nav-link">
                            {category.category}
                          </a>
                        );
                      } else {
                        return (
                          <div class="nav-item dropdown">
                            <a href="#" class="nav-link" data-toggle="dropdown">
                              {category.category}
                              <i class="fa fa-angle-down float-right mt-1"></i>
                            </a>

                            {category.sub_category ? (
                              <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                {category.sub_category.map((subcat) => {
                                  return (
                                    <a href="" class="dropdown-item">
                                      {subcat.category}
                                    </a>
                                  );
                                })}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      }
                    })
                  : " "}
              </div>
            </nav>
          </div>
          <div class="col-lg-9">
            <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="" class="text-decoration-none d-block d-lg-none">
                <h1 class="m-0 display-5 font-weight-semi-bold">
                  <span class="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </a>
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div class="navbar-nav mr-auto py-0">
                  <NavLink
                    to={"/"}
                    className={"nav-item nav-link " + ""}
                    ativeClassName="active"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    ativeClassName="active"
                    to={"/shop"}
                    className="nav-item nav-link"
                  >
                    Shop
                  </NavLink>
                  {/* <a href="detail.html" class="nav-item nav-link">
                    Shop Detail
                  </a> */}
                  <div class="nav-item dropdown">
                    <a
                      href="#"
                      class="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      More
                    </a>
                    <div class="dropdown-menu rounded-0 m-0">
                      <a href="#" class="dropdown-item">
                        Resell (Coming Soon)
                      </a>
                      <a href="#" class="dropdown-item">
                        Sell (Comming Soon)
                      </a>
                    </div>
                  </div>
                  <NavLink to={"/contact"} className="nav-item nav-link">
                    Contact
                  </NavLink>
                </div>
                <div class="navbar-nav ml-auto py-0">
                  <NavLink
                    ativeClassName="active"
                    to="/user/login"
                    className="nav-item nav-link"
                  >
                    Login
                  </NavLink>
                  <NavLink to={"/user/register"} className="nav-item nav-link">
                    Register
                  </NavLink>
                </div>
              </div>
            </nav>
            {window.location.pathname === "/" ? (
              <div
                id="header-carousel"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active" style={{ height: "410px" }}>
                    <img
                      class="img-fluid"
                      src="img/carousel-1.jpg"
                      alt="Image"
                    />
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div class="p-3" style={{ maxWidth: "700px" }}>
                        <h4 class="text-light text-uppercase font-weight-medium mb-3">
                          10% Off Your First Order
                        </h4>
                        <h3 class="display-4 text-white font-weight-semi-bold mb-4">
                          Fashionable Dress
                        </h3>
                        <a href="" class="btn btn-light py-2 px-3">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                  {data.slider_product
                    ? data.slider_product.map((item) => {
                        return (
                          <div
                            class="carousel-item"
                            style={{ height: "410px" }}
                          >
                            <img
                              class="img-fluid"
                              src={GetConvertedImage(item.image)}
                              alt="Image"
                            />
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                              <div class="p-3" style={{ maxWidth: "700px" }}>
                                <h4 class="text-light text-uppercase font-weight-medium mb-3">
                                  10% Off Your First Order
                                </h4>
                                <h3 class="display-4 text-white font-weight-semi-bold mb-4">
                                  Reasonable Price
                                </h3>
                                <a href="" class="btn btn-light py-2 px-3">
                                  Shop Now
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
                <a
                  class="carousel-control-prev"
                  href="#header-carousel"
                  data-slide="prev"
                >
                  <div
                    class="btn btn-dark"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <span class="carousel-control-prev-icon mb-n2"></span>
                  </div>
                </a>
                <a
                  class="carousel-control-next"
                  href="#header-carousel"
                  data-slide="next"
                >
                  <div
                    class="btn btn-dark"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <span class="carousel-control-next-icon mb-n2"></span>
                  </div>
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
