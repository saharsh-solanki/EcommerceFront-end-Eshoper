import { UpdateCartApi } from "../account/cart/cart";
import { runDeleteApi, runGetApi, runPatchApi, runPostApi } from "../api";

export async function GetUserAddressApi() {
  const response = await runGetApi("api/address/", {}, true);
  return response;
}

export async function AddNewAddressApi(data) {
  const response = await runPostApi("api/address/", data, true);
  return response;
}

export async function updateAddressApi(id) {
  const response = await runPatchApi("api/address/" + id, {}, true);
  return response;
}

export async function DeleteAddressApi(id) {
  const response = await runDeleteApi("api/address/" + id, {}, true);
  return response;
}
