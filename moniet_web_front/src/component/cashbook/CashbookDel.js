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
  const onOpenClickHandler = () => {
    setShowSnackbar(true);
  };
  const onCloseClickHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const deleteCashbook = () => {
    if (checkItems === null) {
      console.log("삭제할 거 없음");
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
          setSelect(!select); //첫번째는 잘되는데 두번째는 안됨(삭제도 안됨) 확인필요
          onOpenClickHandler();
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
            severity="success"
            sx={{
              width: "100%",
              backgroundColor: "#6a6da6",
            }}
          >
            가계부 삭제 성공!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default CashbookDel;
