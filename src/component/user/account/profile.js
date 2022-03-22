import React, { useEffect } from "react";
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
import { LogOutAction } from "../../../api/base";
import { UpdateProfileApi } from "../../../api/account/profile/profile";
import { Link } from "react-router-dom";

export default function Profile() {
  const data1 = useSelector((state) => {
    return state.AccountReducer.data;
  });
  const [FromData, setFromData] = React.useState({ loader: false });
  const dispatch = useDispatch();
  useEffect(() => {
    setFromData({ ...FromData, ...data1 });
  }, [data1]);
  const HandleInputChange = (event) => {
    setFromData({ ...FromData, [event.target.name]: event.target.value });
  };

  const handleFromSubmit = async () => {
    setFromData({ ...FromData, loader: true });
    // var pendingToasts = await PendingToast("Updating  ....");
    const response = await UpdateProfileApi(
      {
        ...FromData,
      },
      dispatch
    );
    await ClearAllToast();
    if (response.status) {
      SuccessToast("Updated Successfully..");
      setFromData({ ...FromData, loader: false });
      //   window.location.href = "/";
    } else {
      var obj = Object.keys(response.data);
      for (var key in Object.keys(response.data)) {
        ErrorToast(obj[key] + " " + response.data[obj[key]]);
      }
      setFromData({ ...FromData, loader: false });
    }
    setFromData({ ...FromData, loader: false });
  };

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <div className="container">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={data1.profile_image}
                      alt="Admin"
                      className="rounded-circle p-1 bg-primary"
                      width={110}
                    />
                    <div className="mt-3">
                      <h4>{FromData.name}</h4>
                      <p className="text-dark mb-1">
                        +91{FromData.mobile_number}
                      </p>
                      <p className="text-muted font-size-sm">
                        {FromData.email}
                      </p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">
                        Message
                      </button>
                    </div>
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-globe me-2 icon-inline"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <line x1={2} y1={12} x2={22} y2={12} />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        Website
                      </h6>
                      <span className="text-secondary">
                        https://bootdey.com
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-github me-2 icon-inline"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Github
                      </h6>
                      <span className="text-secondary">bootdey</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-twitter me-2 icon-inline text-info"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                        Twitter
                      </h6>
                      <span className="text-secondary">@bootdey</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-instagram me-2 icon-inline text-danger"
                        >
                          <rect
                            x={2}
                            y={2}
                            width={20}
                            height={20}
                            rx={5}
                            ry={5}
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        Instagram
                      </h6>
                      <span className="text-secondary">bootdey</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-facebook me-2 icon-inline text-primary"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        Facebook
                      </h6>
                      <span className="text-secondary">bootdey</span>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={FromData.name}
                        onChange={HandleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={FromData.email}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        name="mobile_number"
                        value={FromData.mobile_number}
                        onChange={HandleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="button"
                        className="btn btn-primary px-4"
                        value={"Save Changes"}
                        onClick={handleFromSubmit}
                        disabled={FromData.loader}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="d-flex align-items-center mb-3">
                        Actions
                      </h5>
                      <ul class="list-group">
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/user/orders"
                          class="list-group-item"
                        >
                          Orders
                        </Link>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/user/address"}
                          class="list-group-item"
                        >
                          Address
                        </Link>
                        <li class="list-group-item">Favourite</li>
                        <li class="list-group-item">Need Help</li>
                        <button
                          onClick={() => {
                            successToast("logout successfully redirecting ..");
                            LogOutAction();
                            setTimeout(() => {
                              window.location.href = "/";
                            }, 1200);
                          }}
                          class="list-group-item"
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="container-fluid pt-5">
        <div class="text-center mb-4">
          <h2 class="section-title px-5">
            <span class="px-2">I am glad that you have an account</span>
          </h2>
        </div>
        <div class="row px-xl-5">
          <div class="col-lg-5 mb-5">
            <div className="container text-center">
              <img
                style={{ width: "70%" }}
                src={process.env.PUBLIC_URL + "/img/LoginUser.png"}
              ></img>
            </div>
          </div>
          <div class="col-lg-7 mb-5">
            <div class="contact-form">
              <div id="success"></div>
              <h5 class="font-weight-semi-bold mb-4 mt-4">
                Enter your details to get started
              </h5>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
                name="sentMessage"
                style={{ maxWidth: "400px" }}
                id="contactForm"
                novalidate="novalidate"
              >
                <div class="control-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    required="required"
                    data-validation-required-message="Please enter your email"
                    onChange={HandleInputChange}
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <input
                    type="password"
                    class="form-control"
                    id="subject"
                    placeholder="Your Password"
                    required="required"
                    name={"password"}
                    onChange={HandleInputChange}
                  />
                  <p class="help-block text-danger"></p>
                </div>

                <div>
                  <button
                    class="btn btn-primary py-2 px-4"
                    type="submit"
                    id="sendMessageButton"
                    onClick={handleFromSubmit}
                  >
                    Login <i className="fa fa-arrow"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <Footer></Footer>
    </div>
  );
}
