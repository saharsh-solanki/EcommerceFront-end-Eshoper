import { runPostApi } from "../../api";

export async function startPaytmPaymentApi(data, dispatch) {
  const result = await runPostApi("api/payment/pay/", data, true);
  //   UpdateCartApi(dispatch);
  return result;
}
