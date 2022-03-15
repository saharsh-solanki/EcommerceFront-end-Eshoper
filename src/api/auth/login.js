import {
  FetchAndUpdateUserProfileApi,
  FetchUserProfileApi,
} from "../account/profile/profile";
import { runPostApi } from "../api";
import { SetAccessToken, SetRefreshToken } from "../base";

export async function LoginApi(data, dispatch) {
  const response = await runPostApi("api/token/", data);
  if (response.status) {
    const setaccess = await SetAccessToken(response.data.access);
    const setRefresh = await SetRefreshToken(response.data.refresh);
    const fetchprofile = await FetchAndUpdateUserProfileApi(dispatch);
  }
  return response;
}
