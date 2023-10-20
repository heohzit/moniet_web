import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const CashbookDel = (props) => {
  const checkItems = props.checkItems;
  const setCheckItems = props.setCheckItems;
  const select = props.select;
  const setSelect = props.setSelect;

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarResult, setSnackbarResult] = useState("");
  const onOpenClickHandler = (msg, result) => {
    setShowSnackbar(true);
    setSnackbarMsg(msg);
    setSnackbarResult(result);
  };
  const onCloseClickHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const deleteCashbook = () => {
    if (checkItems.length === 0) {
      onOpenClickHandler("삭제할 항목이 없습니다.", "info");
      return;
    } else {
      const no = new Array();
      {
        checkItems.map((item) => {
          const cashbookNo = item;
          no.push(cashbookNo);
        });
      }
      const cashbookNos = no.join("-");
      const token = window.localStorage.getItem("token");
      axios
        .post("/cashbook/delete", cashbookNos, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCheckItems([]);
          setSelect(!select);
          onOpenClickHandler("가계부 삭제 성공!", "success");
        })
        .catch((res) => {
          console.log(cashbookNos);
          console.log(res.response.status);
        });
    }
  };
  return (
    <div className="add-btn etc-btn">
      <DeleteOutlineOutlined onClick={deleteCashbook} />
      {showSnackbar && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open //갑자기 에러나서 open 함수 삭제함
          autoHideDuration={1000}
          onClose={onCloseClickHandler}
        >
          <Alert
            variant="filled"
            onClose={onCloseClickHandler}
            severity={snackbarResult}
            sx={{
              width: "100%",
              backgroundColor: "#323673",
            }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default CashbookDel;
