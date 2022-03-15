import { UpdateCartApi } from "../account/cart/cart";
import { runDeleteApi, runPostApi } from "../api";

export async function AddProductToCartApi(productID, dispatch) {
  const response = await runPostApi("api/cart/", { product: productID }, true);
  const updateCart = UpdateCartApi(dispatch);
}

export async function UpdatePorductQuantityInCartApi(data, dispatch) {
  const response = await runPostApi("api/cart/", data, true);
  const updateCart = UpdateCartApi(dispatch);
}

export async function DeletePorductFromCartApi(productID, dispatch) {
  const response = await runDeleteApi("api/cart/" + productID, {}, true);
  const updateCart = UpdateCartApi(dispatch);
}
