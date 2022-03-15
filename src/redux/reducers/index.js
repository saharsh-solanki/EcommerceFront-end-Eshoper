import { HomePageReducer } from "./home/homePageReducer";
import { AccountReducer } from "./account/account";
import { CartReducer } from "./cart/cart";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  HomePageReducer,
  AccountReducer,
  CartReducer,
});
