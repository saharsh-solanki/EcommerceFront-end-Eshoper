import { rootAction } from "../../actions";
import { GetProductData } from "../../actions/action";
const initialData = { data: [], check: 1 };

export function HomePageReducer(state = initialData, action) {
  switch (action.type) {
    case rootAction.product.GetProductData:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
