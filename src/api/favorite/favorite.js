import { rootAction } from "../../redux/actions";
import { runDeleteApi, runGetApi, runPostApi } from "../api";

export async function UpdateFavoriteApi(dispatch) {
  const response = await runGetApi("api/wishlist/", {}, true);
  if (response.status) {
    dispatch({
      type: rootAction.favorite.setfavoriteData,
      payload: response.data,
    });
  }
  return response;
}

export async function AddProductToFavoriteApi(productID, dispatch, data = {}) {
  const response = await runPostApi(
    "api/wishlist/",
    { product: productID, ...data },
    true
  );
  const updateFavorite = UpdateFavoriteApi(dispatch);
  return response;
}

export async function DeletePorductFromFavoriteApi(productID, dispatch) {
  const response = await runDeleteApi("api/wishlist/" + productID, {}, true);
  const updateCart = UpdateFavoriteApi(dispatch);
  return response;
}
