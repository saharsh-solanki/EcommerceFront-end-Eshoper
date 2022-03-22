import React from "react";
import { useDispatch } from "react-redux";
import { LoginApi } from "../../../api/auth/login";
import PageHeader from "../../../utils/base";
import {
  ClearAllToast,
  ErrorToast,
  PendingToast,
  SuccessToast,
  ToastToError,
} from "../../toast/base";
import Footer from "../home/footer";
import Header from "../home/header";

export default function Login() {
  const [FromData, setFromData] = React.useState({ loader: false });
  const dispatch = useDispatch();
  const HandleInputChange = (event) => {
    setFromData({ ...FromData, [event.target.name]: event.target.value });
  };

  const handleFromSubmit = async () => {
    if (FromData.email && FromData.password) {
      setFromData({ ...FromData, loader: true });
      var pendingToasts = await PendingToast("Validating  ....");
      const response = await LoginApi(
        {
          ...FromData,
        },
        dispatch
      );
      await ClearAllToast();
      if (response.status) {
        SuccessToast("Login Successfully..");
        window.location.href = "/";
      } else {
        var obj = Object.keys(response.data);
        for (var key in Object.keys(response.data)) {
          ErrorToast(obj[key] + " " + response.data[obj[key]]);
        }
      }
      setFromData({ ...FromData, loader: false });
    } else {
      ErrorToast("Please fill all form field");
    }
  };

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <div class="container-fluid pt-5">
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
      </div>
      <Footer></Footer>
    </div>
  );
}
