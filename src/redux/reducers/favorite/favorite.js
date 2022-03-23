import { rootAction } from "../../actions";

var initialState = { favoriteData: [] };
export function FavoriteReducer(state = initialState, action) {
  switch (action.type) {
    case rootAction.favorite.setfavoriteData:
      return { ...state, favoriteData: action.payload };
    default:
      return state;
  }
}
