import { useDispatch } from "react-redux";
import { rootAction } from "../../../redux/actions";
import { runGetApi } from "../../api";

// export async function getCartData =

export async function UpdateCartApi(dispatch) {
  const response = await runGetApi("api/cart/", {}, true);
  if (response.status) {
    dispatch({
      type: rootAction.cart.SetCartData,
      payload: response.data,
    });
  }
  return response;
}
