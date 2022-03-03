import { runGetApi } from "../api";

export async function ProductApi(data) {
  var apiUrl = "api/products/";
  const result = await runGetApi(apiUrl, data);
  return result;
}
