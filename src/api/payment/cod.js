import { UpdateCartApi } from "../account/cart/cart";
import { runGetApi, runPostApi } from "../api";

export async function codPaymentApi(data, dispatch) {
  const result = await runPostApi("api/payment/pay/cod", data, true);
  UpdateCartApi(dispatch);
  return result;
}
