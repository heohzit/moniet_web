import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
  GridLoadingOverlay,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiContext,
  useGridApiEventHandler,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import clsx from "clsx";
import CashbookDel from "./CashbookDel";
import axios from "axios";

const CashbookTable = (props) => {
  const cashbookList = props.cashbookList;
  const setCashbookList = props.setCashbookList;
  const assetList = props.assetList;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const assetToString = props.assetToString;

  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(cashbookList);
  }, [cashbookList]);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();
    const handleRowClick = () => {
      const delCashbookNo = "";
      {
        rowSelectionModel.map((item) => {
          return (delCashbookNo += item + ",");
        });
      }
      const token = window.localStorage.getItem("token");

      axios
        .post(
          "/cashbook/delete",
          { delCashbookNo: rowSelectionModel },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
        });
    };

    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridDeleteIcon onClick={handleRowClick} />
      </GridToolbarContainer>
    );
  };

  const columns = [
    {
      field: "cashbookDate",
      headerName: "날짜",
      width: 180,
      editable: true,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("ko-KR"),
      type: "date",
      headerAlign: "center",
    },
    {
      field: "cashbookAsset",
      headerName: "자산",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: assetList,
      valueGetter: (params) => assetToString(params.value),
      headerAlign: "center",
    },
    {
      field: "cashbookCateogory",
      headerName: "분류",
      width: 130,
      editable: true,
      headerAlign: "center",
      valueGetter: (params) => {
        if (params.row.cashbookFinance === 1) {
          const category = incomeCate.find(
            (item) => item.categoryNo === params.row.cashbookCategory
          );
          return category.categoryTitle;
        } else if (params.row.cashbookFinance === 2) {
          const category = spendingCate.find(
            (item) => item.categoryNo === params.row.cashbookCategory
          );
          return category.categoryTitle;
        } else {
          return null;
        }
      },
    },
    {
      field: "cashbookMoney",
      headerName: "금액",
      width: 130,
      editable: true,
      headerAlign: "center",
      valueFormatter: (params) => params.value?.toLocaleString("ko-KR"),
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        return clsx("moneyColor", {
          incomeNum: params.row.cashbookFinance === 1,
          spendingNum: params.row.cashbookFinance === 2,
        });
      },
    },
    {
      field: "cashbookContent",
      headerName: "내용",
      width: 260,
      editable: true,
      headerAlign: "center",
    },
  ];

  return (
    <div className="grid-content">
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .textPrimary": {
            color: "text.primary",
          },
          "& .moneyColor.incomeNum": {
            color: "",
            justifyContent: "flex-end",
          },
          "& .moneyColor.spendingNum": {
            color: "#323673",
            justifyContent: "flex-end",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rows={rows}
          columns={columns}
          getRowId={(row) => row.cashbookNo}
          slots={{ toolbar: CustomToolbar, loadingOverlay: LinearProgress }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
    </div>
  );
};

export default CashbookTable;
