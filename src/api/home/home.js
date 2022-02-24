import { runGetApi } from "../api";

export async function SiteDetailsApi() {
  const result = await runGetApi("api/site/detail/", {});
  return result;
}
