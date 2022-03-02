import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader() {
  let url = window.location.pathname;
  const urlPaths = url.split("/");
  var currentPath = "/";
  return (
    <div class="container-fluid bg-secondary mb-5">
      <div
        class="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "300px" }}
      >
        <h1 class="font-weight-semi-bold text-uppercase mb-3">
          {NamesForBreadCamp[url]}
        </h1>
        <div class="d-inline-flex">
          <p class="m-0">
            <Link to="/">Home</Link>
          </p>
          {urlPaths.slice(1, urlPaths.length - 1).map((urlPath) => {
            var todo = currentPath;
            currentPath = currentPath + urlPath + "/";
            return (
              <div>
                <p class="m-0">
                  &nbsp;&nbsp;- <Link to={todo + urlPath}>{urlPath}</Link>
                </p>
              </div>
            );
          })}
          <p class="m-0 px-2">-</p>
          <p class="m-0">{urlPaths[urlPaths.length - 1]}</p>
        </div>
      </div>
    </div>
  );
}

export const NamesForBreadCamp = {
  "/": "Home",
  "/shop": "Shop",
  "/contact": "Contact Us",
  "/user/login": "Login  ",
  "/user/register": "Create an account",
};

export function GetConvertedImage(image) {
  if (typeof image === "string") {
    if (image.slice(0, 1) == "/")
      return (
        process.env.REACT_APP_BACKEND_API_URL + image.slice(1, image.length)
      );
    else {
      return (
        process.env.REACT_APP_BACKEND_API_URL +
        "media/" +
        image.slice(0, image.length)
      );
    }
  } else {
    return process.env.PUBLIC_URL + "img/cat-1.jpg";
  }
}
