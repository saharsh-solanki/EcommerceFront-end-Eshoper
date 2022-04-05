import { runGetApi } from "../api";

export async function GetKeysForDataTables() {
  const response = await runGetApi("api/list/keys/", {});
  return response;
}
