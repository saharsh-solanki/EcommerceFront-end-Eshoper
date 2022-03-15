import React from "react";
import { CreateAccountApi } from "../../../api/auth/register";
import PageHeader from "../../../utils/base";
import {
  BaseToastContainar,
  ClearAllToast,
  ErrorToast,
  PendingToast,
  successToast,
  SuccessToast,
  ToastToError,
  ToastToSuccess,
} from "../../toast/base";
import Footer from "../home/footer";
import Header from "../home/header";

export default function Register() {
  const [FromData, setFromData] = React.useState({ loader: false });

  const HandleInputChange = (event) => {
    setFromData({ ...FromData, [event.target.name]: event.target.value });
  };

  const handleFromSubmit = async () => {
    if (
      FromData.name &&
      FromData.email &&
      FromData.password &&
      FromData.mobile_number
    ) {
      setFromData({ ...FromData, loader: true });
      var pendingToasts = await PendingToast("Create Account ....");
      const response = await CreateAccountApi({
        ...FromData,
      });
      await ClearAllToast();
      if (response.status) {
        successToast("Account created Successfully..");
        // ToastToSuccess(pendingToasts, "Account Created Successfully");
      } else {
        ToastToError(pendingToasts, "Error While Creating Your Account ");
        var obj = Object.keys(response.data);
        for (var key in Object.keys(response.data)) {
          ErrorToast(obj[key] + " " + response.data[obj[key]][0]);
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
      {/* <BaseToastContainar></BaseToastContainar> */}
      <div class="container-fluid pt-5">
        <div class="text-center mb-4">
          <h2 class="section-title px-5">
            <span class="px-2">Let's get started by creating your account</span>
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
                Create your account within 1 minute
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
                    type="text"
                    class="form-control"
                    placeholder="Enter Your  Name"
                    required="required"
                    data-validation-required-message="Please enter your name"
                    name="name"
                    onChange={HandleInputChange}
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Your Email"
                    required="required"
                    data-validation-required-message="Please enter your email"
                    name="email"
                    onChange={HandleInputChange}
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter Your  Name"
                    required="required"
                    min={611111111}
                    max={9999999999}
                    data-validation-required-message="Please enter your number"
                    name="mobile_number"
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
                    name="password"
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
                    disabled={FormData.loader}
                  >
                    {FormData.loader ? (
                      "Creating Your Account ..."
                    ) : (
                      <>
                        Create an Account <i className="fa fa-arrow"></i>
                      </>
                    )}
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
