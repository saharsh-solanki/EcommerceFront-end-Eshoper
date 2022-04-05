import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../../api/auth/login";
import PageHeader from "../../../utils/base";
import { $ } from "jquery";
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
import {
  UpdateProfileApi,
  UploadProfilePicture,
} from "../../../api/account/profile/profile";
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

  const HandleProfileChange = (event) => {
    UploadProfilePicture(event.target.files[0], dispatch);
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
                    <span className="profile-img-main d-block position-relative">
                      <input
                        type={"file"}
                        name="profile_image"
                        id={"profile_image"}
                        hidden={true}
                        onChange={HandleProfileChange}
                      ></input>
                      <img
                        src={data1.profile_image}
                        alt="Admin"
                        className="rounded-circle p-1 bg-primary"
                        width={110}
                      />
                      <span className="profile-img">
                        {/* <input type={}></input> */}
                        <i
                          class="fa fa-upload"
                          onClick={(event) => {
                            // $("#profile_image").click();
                            document.getElementById("profile_image").click();
                          }}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </span>
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
