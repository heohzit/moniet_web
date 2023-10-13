import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

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
  const [rowModesModel, setRowModesModel] = useState({});
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (cashbookNo) => () => {
    setRowModesModel({
      ...rowModesModel,
      [cashbookNo]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (cashbookNo) => () => {
    setRowModesModel({
      ...rowModesModel,
      [cashbookNo]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (cashbookNo) => () => {
    setRows(rows.filter((row) => row.cashbookNo !== cashbookNo));
  };

  const handleCancelClick = (cashbookNo) => () => {
    setRowModesModel({
      ...rowModesModel,
      [cashbookNo]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.cashbookNo === cashbookNo);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.cashbookNo !== cashbookNo));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row) =>
        row.cashbookNo === newRow.cashbookNo ? updatedRow : row
      )
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "cashbookDate",
      headerName: "날짜",
      width: 180,
      editable: true,
    },
    {
      field: "cashbookAsset",
      headerName: "자산",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: assetList,
    },
    {
      field: "cashbookCateogory",
      headerName: "분류",
      width: 130,
      editable: true,
    },
    {
      field: "cashbookMoney",
      headerName: "금액",
      width: 130,
      editable: true,
    },
    {
      field: "cashbookContent",
      headerName: "내용",
      width: 260,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ cashbookNo }) => {
        const isInEditMode =
          rowModesModel[cashbookNo]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(cashbookNo)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(cashbookNo)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(cashbookNo)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(cashbookNo)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "cashbookNo",
      headerName: "번호",
      width: 50,
    },
  ];

  return (
    <div className="grid-content">
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          getRowId={(row) => row.cashbookNo}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </div>
  );
};

export default CashbookTable;
