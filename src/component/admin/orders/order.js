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

export default function AdminOrderView() {
  return (
    <div>
      <div class="mb-3">
        <CustomDataTable
          AllInOneApi="api/admin/orders/"
          title="Orders History "
          dataTableColumns={[
            { title: "id", field: "id" },
            { title: "TotalPaidAmount", field: "TotalPaidAmount" },
            { title: "deliveryStatus", field: "deliveryStatus" },
            { title: "order_date", field: "order_date" },
            { title: "paymentType", field: "paymentType" },
            { title: "status", field: "status" },
          ]}
        ></CustomDataTable>
      </div>
    </div>
  );
}
