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

export default function AdminProductCategoryView() {
  return (
    <div>
      <div class=" mb-3">
        <CustomDataTable
          AllInOneApi="api/admin/product/category/"
          title="Product Category"
          dataTableColumns={[
            { title: "id", field: "id" },
            {
              title: "category",
              field: "category",
            },
            {
              title: "icon",
              field: "icon",
              type: "image",
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
