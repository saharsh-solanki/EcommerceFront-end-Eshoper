import { runApi } from "./base";

export async function runGetApi(url, data, auth = false) {
  console.log("working");
  const result = await runApi("get", url, data, auth);
  return result;
}

export async function runPostApi(url, data, auth = false) {
  const result = await runApi("post", url, data, auth);
  return result;
}

export async function runDeleteApi(url, data, auth = false) {
  const result = await runApi("delete", url, data, auth);
  return result;
}
