import { rootAction } from "../../actions";

var initialState = { data: {} };
export function AccountReducer(state = initialState, action) {
  switch (action.type) {
    case rootAction.account.SetAccountData:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
