import { startPaytmPaymentApi } from "../../../../api/payment/paytm/pay";

export const startPayment = async (data) => {
  let bodyData = new FormData();

  // send data to the backend
  bodyData.append("address_id", data["address_id"]);
  const response = await startPaytmPaymentApi(data, "dispatch");
  return response;
};
