import { useDispatch } from "react-redux";
import { rootAction } from "../../../redux/actions";
import { runGetApi, runPatchApi } from "../../api";

export async function FetchUserProfileApi() {
  const response = await runGetApi("api/user/", {}, true);
  return response;
}

export async function FetchAndUpdateUserProfileApi(dispatch) {
  //   const dispatch = useDispatch();
  const response = await FetchUserProfileApi("api/user/", {}, true);
  if (response.status) {
    dispatch({
      type: rootAction.account.SetAccountData,
      payload: response.data,
    });
  }
  return response;
}

export async function UpdateProfileApi(data, dispatch) {
  const response = await runPatchApi("api/user/", data, true);
  const up = await FetchAndUpdateUserProfileApi(dispatch);
  return response;
}

export async function UploadProfilePicture(file, dispatch) {
  var FormData = require("form-data");
  var formData = new FormData();
  formData.append("profile_image", file);
  const response = await runPatchApi(
    "api/user/upload_profile_image/",
    formData,
    true
  );
  FetchAndUpdateUserProfileApi(dispatch);
  return response;
}
