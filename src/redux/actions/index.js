import { GetProductData, SetAccountData, SetCartData } from "./action";

export const rootAction = {
  product: { GetProductData: GetProductData },
  account: { SetAccountData: SetAccountData },
  cart: { SetCartData: SetCartData },
};
