import React from "react";
import { useSelector } from "react-redux";
import { runPostApi } from "../api";

export async function CreateAccountApi(data) {
  const response = await runPostApi("api/user/", data);
  return response;
}
