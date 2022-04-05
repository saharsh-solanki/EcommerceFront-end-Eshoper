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

export default function AdminProductImagesView() {
  return (
    <div>
      <div class=" mb-3">
        <CustomDataTable
          AllInOneApi="api/admin/product/product_image/"
          title="Upload Product Images "
          dataTableColumns={[
            { title: "id", field: "id" },
            { title: "product_image_key", field: "product_image_key" },
            { title: "image", field: "image", type: "image" },
          ]}
        ></CustomDataTable>
      </div>
    </div>
  );
}
