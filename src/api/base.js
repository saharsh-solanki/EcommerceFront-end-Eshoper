import { ErrorToast } from "../component/toast/base";

const axios = require("axios").default;
const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

function Response(status, data, status_code) {
  /* respose function to return same resposse objet each time api make a call  */

  return {
    status: status,
    data: data,
    statusCode: status_code,
  };
}

export function SetAccessToken(token) {
  localStorage.setItem("AccessToken", token);
}

export function GetAccessToken() {
  return localStorage.getItem("AccessToken");
}

export function SetRefreshToken(token) {
  localStorage.setItem("RefreshToken", token);
}
export function GetRefreshToken() {
  return localStorage.getItem("RefreshToken");
}

export async function LogOutAction() {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("RefreshToken");
  localStorage.removeItem("UserData");
}

export async function runApiBase(method, url, data, auth) {
  /* Funtion used to run get request with data 
  Usage :- Take argument as url and concate it with base url 
           check if token available in data then run it token
            and add it to headers 
  */
  var responseStatus = false;
  var ResponseData = "";
  var statusCode = "";
  var obj = "";
  var header = {};

  if (data.token) {
    /* Checking if token is avaiable in data or not */
    header = { Authorization: "Bearer " + data.token };

    // deleting token object from object
    delete data.token;
  }

  /* Configuarations for runnning API */
  var config = {
    method: method,
    url: baseUrl + url,
    headers: header,
    params: data,
  };

  /* Make Api request */
  const response = await axios(config)
    .then((response) => {
      /* Runs on Success */
      responseStatus = true;
      obj = response;
    })
    .catch((error) => {
      /* runs on error */
      responseStatus = false;
      obj = error.response;
    });

  if (obj) {
    var ResponseData = obj.data;
    statusCode = obj.request.status;
  } else {
    var ResponseData = {};
    statusCode = 4000;
  }

  return Response(responseStatus, ResponseData, statusCode);
}

async function UpdateAccessToken() {
  /* Update the  accessd token from refresh token */
  var token = GetRefreshToken();
  const GetToken = await runApiBase("get", "api/token/refresh/", {
    refresh: token,
  });
  if (GetToken.statusCode === 401) {
    LogOutAction();
    return GetToken;
  } else {
    SetAccessToken(GetToken.data.access);
    return GetToken.data.access;
  }
}

async function checkAndUpdateAccessToken() {
  /* Retrive the access token and check if access token is valid or not and 
  if access token is exppired then it will use refresh token to update the access token 
  and if the refresh token is already expired then it prefrom logout 
  */
  var token = GetAccessToken();
  const CheckToken = await runApiBase("get", "api/token/verify/", {
    token: token,
  });
  if (CheckToken.statusCode == 401) {
    const UpdateToken = await UpdateAccessToken();
    return UpdateToken;
  }
}

export async function runApi(method, url, data, auth = false) {
  /* A base for calling all api  
  Usage :- Take  Method argument example get post put patch delete
            url is the api url that need to be called 
            data is Request data that will passed to api 
            suppose if you not want to use authetication the auth should be false 
            for example a product is visiable to all so no need auth
            but a profile need auth 
  */
  if (auth) {
    const check = await checkAndUpdateAccessToken();
    data["token"] = GetAccessToken();
  }
  const Result = await runApiBase(method, url, data, auth);
  if (Result.statusCode === 4000) {
    ErrorToast("Server down please try after some time ");
  }
  return Result;
}
