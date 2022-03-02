import { rootReducer } from "../reducers/index";

import { createStore } from "redux";

export const store = createStore(
  rootReducer
  //applyMiddleware(thunk)
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
