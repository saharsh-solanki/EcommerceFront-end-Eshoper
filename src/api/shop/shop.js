import { runGetApi } from "../api";

export async function ProductApi(data) {
  var apiUrl = "api/products/";
  const result = await runGetApi(apiUrl, data);
  return result;
}

export async function SingleProductApi(pid) {
  var apiUrl = "api/products/" + pid;
  const result = await runGetApi(apiUrl, {});
  return result;
}
