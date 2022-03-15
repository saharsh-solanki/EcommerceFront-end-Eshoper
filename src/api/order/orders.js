import { runGetApi } from "../api";

export async function OrdersApi() {
  const result = await runGetApi("api/user/orders", {}, true);
  return result;
}

export async function OrderDetailApi(id) {
  const result = await runGetApi("api/user/orders/" + id, {}, true);
  return result;
}
