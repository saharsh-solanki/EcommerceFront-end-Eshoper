import React from "react";
import PageHeader from "../../../utils/base";
import Footer from "../home/footer";
import Header from "../home/header";

export default function Login() {
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
                    placeholder="Your Email"
                    required="required"
                    data-validation-required-message="Please enter your email"
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
                  />
                  <p class="help-block text-danger"></p>
                </div>

                <div>
                  <button
                    class="btn btn-primary py-2 px-4"
                    type="submit"
                    id="sendMessageButton"
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
