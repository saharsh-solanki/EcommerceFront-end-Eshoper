import {
  GetProductData,
  SetAccountData,
  SetCartData,
  setfavoriteData,
} from "./action";

export const rootAction = {
  product: { GetProductData: GetProductData },
  account: { SetAccountData: SetAccountData },
  cart: { SetCartData: SetCartData },
  favorite: { setfavoriteData: setfavoriteData },
};
