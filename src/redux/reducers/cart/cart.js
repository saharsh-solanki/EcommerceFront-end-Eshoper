import { rootAction } from "../../actions";

var initialState = { cartdata: [] };
export function CartReducer(state = initialState, action) {
  switch (action.type) {
    case rootAction.cart.SetCartData:
      return { ...state, cartdata: action.payload };
    default:
      return state;
  }
}
