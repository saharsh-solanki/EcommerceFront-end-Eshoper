import MaterialTable, { MTableEditField } from "@material-table/core";
import { TextField } from "@material-ui/core";
import { Snackbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FetchUserProfileApi } from "../../../api/account/profile/profile";
import {
  runDeleteApi,
  runGetApi,
  runPatchApi,
  runPostApi,
} from "../../../api/api";
import { GetAuthDetail } from "../../../utils/base";
import { CustomDataTable } from "../customDataTable/datatable";
import { tableIcons } from "../customDataTable/tableIcons";

export default function AdminUserView() {
  // const [userData, setUserData] = React.useState([]);

  // const [SnakBarState, setSnakBarState] = React.useState({
  //   isOpen: false,
  //   message: "",
  // });

  // /*
  // custom data table implemented using material-table liberey
  // Required Props that needs to be pass

  // either provide 1-4 or 5 th

  // 1) ListApi =      // pass api that required to get list of that model
  // 2) UpdateApi =    // pass api that is used to update that user like   /admin/user/<id> id is appended here
  // 3) DeleteApi =   // Same Used to delete an element   /admin/user/<id>    is appended here
  // 4) CreateApi   =       // pass api used to create ( post api is used )

  // 5) AllInOneApi  =   // Pass Api like /admin/user/   -> that single api used to perform all opration
  //                   like  to list all /admin/user/  and automatically same url is used to update and destroy and create
  //                   Note only the type of request is changed like get post delete patch ..

  // 6) columns  is a required props

  // */

  // const getApi = (props) => {
  //   if (props) {
  //     if ("AllInOneApi" in props) {
  //       var data = {
  //         get: props.AllInOneApi,
  //         post: props.AllInOneApi,
  //         delete: props.AllInOneApi,
  //         list: props.AllInOneApi,
  //         update: props.AllInOneApi,
  //       };
  //       // setApiDetail(data);
  //       return data;
  //     } else {
  //       var data = {
  //         get: props.GetApi ? props.GetApi : null,
  //         post: props.CreateApi ? props.CreateApi : null,
  //         delete: props.DeleteApi ? props.DeleteApi : null,
  //         list: props.ListApi ? props.ListApi : null,
  //         update: props.UpdateApi ? props.UpdateApi : null,
  //       };
  //       // setApiDetail(data);
  //       return data;
  //     }
  //   }
  // };

  // const BlackSmallToastForDataTable = (message) => {
  //   setSnakBarState({
  //     isOpen: true,
  //     message: message,
  //   });
  //   setTimeout(() => {
  //     setSnakBarState({
  //       isOpen: false,
  //       message: message,
  //     });
  //   }, 3000);
  // };

  // const apiDetail = getApi({ AllInOneApi: "api/admin/user/" });

  // // const getApiUrl = props.getApi;

  // const setDataForList = async () => {
  //   if (apiDetail) {
  //     if ("list" in apiDetail) {
  //       const response = await runGetApi(apiDetail.list, {}, true);
  //       if (response.status) {
  //         setUserData(response.data);
  //       }
  //     }
  //   }
  // };
  // const navigate = useNavigate();

  // var isAuth = GetAuthDetail();

  // const checkIsAdminUser = async () => {
  //   /* Check Whether the curret logged in user is and admin user or not  */

  //   if (isAuth) {
  //     const userApiResponse = await FetchUserProfileApi();

  //     if (userApiResponse.status) {
  //       if (userApiResponse.data.is_staff === true) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // };
  // const getConvertedDataToUpdateRecords = async (data, columns, oldData) => {
  //   // var newData = {};
  //   var FormData = require("form-data");
  //   var formData = new FormData();
  //   for (var i in columns) {
  //     if (oldData[columns[i].title] != data[columns[i].title]) {
  //       if (columns[i].type && columns[i].type == "image") {
  //         formData.append(columns[i].title, data[columns[i].title]);
  //       } else {
  //         // newData[columns[i].title] = data[columns[i].title];
  //         formData.append(columns[i].title, data[columns[i].title]);
  //       }
  //     }
  //   }
  //   return formData;
  // };

  // const GetConvertedDataToAddNewRecord = (data) => {
  //   // var newData = {};
  //   var FormData = require("form-data");
  //   var formData = new FormData();
  //   var keysList = Object.keys(data);
  //   for (var i in keysList) {
  //     formData.append([keysList[i]], data[keysList[i]]);
  //   }
  //   console.log(
  //     "🚀 ~ file: userView.js ~ line 149 ~ GetConvertedDataToAddNewRecord ~ formData",
  //     formData
  //   );
  //   return formData;
  // };
  // const getConvertedData = (ColoumnToConvert) => {
  //   /* convert provided list into required column formate  */

  //   var newList = [];

  //   for (var i in ColoumnToConvert) {
  //     if (ColoumnToConvert[i]["type"]) {
  //       if (ColoumnToConvert[i]["type"] == "image") {
  //         var x = {
  //           ...ColoumnToConvert[i],
  //           editable: "always",
  //           render: (rowData) => (
  //             <img
  //               src={rowData[ColoumnToConvert[i]["title"]]}
  //               style={{ width: 40, borderRadius: "50%" }}
  //             />
  //           ),
  //           // editComponent: () => <input type="file"></input>,
  //         };
  //         newList.push(x);
  //       } else {
  //         newList.push(ColoumnToConvert[i]);
  //       }
  //     } else {
  //       newList.push(ColoumnToConvert[i]);
  //     }
  //   }
  //   return newList;
  // };

  // const dataTableColumns = [
  //   { title: "id", field: "id" },
  //   { title: "name", field: "name" },
  //   { title: "email", field: "email" },
  //   { title: "mobile_number", field: "mobile_number", type: "number" },
  //   { title: "password", field: "password", type: "password" },
  //   {
  //     title: "profile_image",
  //     field: "profile_image",
  //     type: "image",
  //     // editComponent: (props) => (
  //     //   <div>
  //     //     <input type="file"></input>
  //     //   </div>
  //     // ),
  //   },
  // ];

  // React.useEffect(async () => {
  //   const validate = await checkIsAdminUser();
  //   if (validate) {
  //     await setDataForList();
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  // const getFileInBinary = (file) => {
  //   var R = new FileReader();
  //   R.readAsBinaryString(file);
  //   console.log(R);
  //   return R.result;
  // };
  // const getConvertedResposneMessage = (data) => {
  //   if (Array.isArray(data)) {
  //     if (data.length > 0) {
  //       return data[0][Object.keys(data[0])[0]];
  //     } else {
  //       return "An Unkown Server Error Occured Contact Support Team ";
  //     }
  //   } else {
  //     return data[Object.keys(data)[0]];
  //   }
  // };

  return (
    <div>
      <div class=" mb-3">
        <CustomDataTable
          AllInOneApi="api/admin/user/"
          title="Users"
          dataTableColumns={[
            { title: "id", field: "id" },
            { title: "name", field: "name" },
            { title: "email", field: "email" },
            {
              title: "mobile_number",
              field: "mobile_number",
              type: "number",
            },
            { title: "password", field: "password", type: "password" },
            {
              title: "profile_image",
              field: "profile_image",
              type: "image",
              // editComponent: (props) => (
              //   <div>
              //     <input type="file"></input>
              //   </div>
              // ),
            },
          ]}
        ></CustomDataTable>
      </div>

      {/* <div className="table table-hover">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={SnakBarState.isOpen}
          // onClose={handleClose}
          message={SnakBarState.message}
          key={"bottom" + "center"}
        />
        <MaterialTable
          icons={tableIcons}
          title="Users"
          columns={dataTableColumns ? getConvertedData(dataTableColumns) : ""}
          data={userData ? userData : []}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                new Promise(async (resolve1, reject1) => {
                  resolve1();
                }).then(async () => {
                  const datas = await GetConvertedDataToAddNewRecord(newData);
                  console.log(
                    "🚀 ~ file: userView.js ~ line 253 ~ newPromise ~ datas",
                    datas
                  );
                  const response = await runPostApi(
                    "api/admin/user/",
                    datas,
                    true
                  );
                  if (response.status) {
                    BlackSmallToastForDataTable("Data Updated Successfully");
                    resolve(setDataForList());
                  } else {
                    const responseMessgae = getConvertedResposneMessage(
                      response.data
                    );
                    BlackSmallToastForDataTable(responseMessgae);
                    reject();
                  }
                });

                // resolve(GetConvertedDataToAddNewRecord(newData));
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                new Promise(async (resolve1, reject1) => {
                  console.log("====>", newData);
                  resolve1(
                    getConvertedDataToUpdateRecords(
                      newData,
                      dataTableColumns,
                      oldData
                    )
                  );
                }).then(async (data) => {
                  const response = await runPatchApi(
                    "api/admin/user/" + newData.id,
                    data,
                    true
                  );

                  if (response.status) {
                    BlackSmallToastForDataTable("Data Updated Successfully");
                    resolve(setDataForList());
                  } else {
                    const responseMessgae = getConvertedResposneMessage(
                      response.data
                    );
                    console.log(
                      "🚀 ~ file: userView.js ~ line 257 ~ newPromise ~ responseMessgae",
                      responseMessgae
                    );
                    BlackSmallToastForDataTable(responseMessgae);
                    reject();
                  }
                });
                // setDataForList();
              }),
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                const response = await runDeleteApi(
                  "api/admin/user/" + oldData.id,
                  {},
                  true
                );
                if (response.status) {
                  BlackSmallToastForDataTable("Data Updated Successfully");
                  resolve(setDataForList());
                } else {
                  BlackSmallToastForDataTable("An Unkown server ever occured");
                  reject();
                }
                // setDataForList();
              }),
          }}
          EditRow={{}}
          components={{
            EditField: (props) => {
              return (
                <TextField
                  style={
                    (props.columnDef.type === "numeric"
                      ? { float: "right" }
                      : {},
                    props.columnDef.title == "id" ||
                    props.columnDef.title == "pk"
                      ? { borderBottom: "none" }
                      : {})
                  }
                  type={props.columnDef.type === "image" ? "file" : "text"}
                  placeholder={props.columnDef.title}
                  name={
                    props.columnDef.field
                      ? props.columnDef.field
                      : props.columnDef.title
                  }
                  value={
                    props.columnDef.type === "image"
                      ? ""
                      : props.value === undefined
                      ? ""
                      : props.value
                  }
                  onChange={(event) => {
                    // console.log(props.columnDef.type == "image");
                    // console.log(event.target.files[0]);
                    return props.onChange(
                      props.columnDef.type == "image"
                        ? event.target.files[0]
                        : event.target.value
                    );
                  }}
                  disabled={
                    props.columnDef.title == "id" ||
                    props.columnDef.title == "pk"
                      ? true
                      : false
                  }
                  error={props.validationError}
                />
                // <MTableEditField
                //   {...props}
                //   onEditingCanceled={(mode, rowData) => {
                //     this.resetForm();
                //     props.onEditingCanceled(mode);
                //   }}
                // ></MTableEditField>
                // <input type="file"></input>
              );
            },
          }}
        />
      </div> */}
    </div>
  );
}
