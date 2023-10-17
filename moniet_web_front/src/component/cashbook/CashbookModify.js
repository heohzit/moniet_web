import { useState } from "react";
import CashbookFrm from "./CashbookFrm";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CashbookModify = (props) => {
  const cashbook = props.cashbook;
  const isOpen = props.isOpen;
  const closeFrm = props.closeFrm;
  const title = props.title;
  const dateString = props.dateString;
  const select = props.select;
  const setSelect = props.setSelect;
  const assetList = props.assetList;
  const challengeCate = props.challengeCate;
  const setChallengeCate = props.setChallengeCate;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const modifyFrmOpen = props.modifyFrmOpen;
  const modalClass = props.modalClass;

  const [cashbookNo, setCashbookNo] = useState(cashbook.cashbookNo);
  const [cashbookFinance, setCashbookFinance] = useState(
    cashbook.cashbookFinance
  );
  const [cashbookDate, setCashbookDate] = useState(
    new Date(cashbook.cashbookDate)
  );
  const [cashbookLoop, setCashbookLoop] = useState(cashbook.cashbookLoop);
  const [loopMonth, setLoopMonth] = useState(cashbook.loopMonth);
  const [cashbookAsset, setCashbookAsset] = useState(cashbook.cashbookAsset);
  const [cashbookCategory, setCashbookCategory] = useState(
    cashbook.cashbookCategory
  );
  const [cashbookMoney, setCashbookMoney] = useState(cashbook.cashbookMoney);
  const [cashbookContent, setCashbookContent] = useState(
    cashbook.cashbookContent
  );
  const [cashbookMemo, setCashbookMemo] = useState(cashbook.cashbookMemo);
  const [challengeNo, setChallengeNo] = useState(cashbook.challengeNo);
  const modify = () => {
    const token = window.localStorage.getItem("token");
    const cashbook = {
      cashbookNo: cashbookNo,
      cashbookFinance: cashbookFinance,
      cashbookDate: dateString(cashbookDate),
      cashbookLoop: cashbookLoop,
      loopMonth: loopMonth,
      cashbookAsset: cashbookAsset,
      cashbookCategory: cashbookCategory,
      cashbookMoney: cashbookMoney,
      cashbookContent: cashbookContent,
      cashbookMemo: cashbookMemo,
      challengeNo: challengeNo,
    };

    axios
      .post("/cashbook/update", cashbook, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          onOpenClickHandler();
          closeFrm();
          setSelect(!select);
        } else {
          console.log("등록 중 에러 발생");
        }
      })
      .catch((res) => {
        console.log(res.response);
      });
  };

  //스낵바 띄워야돼
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

  return (
    <div>
      <CashbookFrm
        isOpen={modifyFrmOpen}
        closeFrm={closeFrm}
        title={title}
        dateString={dateString}
        cashbookFinance={cashbookFinance}
        setCashbookFinance={setCashbookFinance}
        cashbookDate={cashbookDate}
        setCashbookDate={setCashbookDate}
        cashbookLoop={cashbookLoop}
        setCashbookLoop={setCashbookLoop}
        loopMonth={loopMonth}
        setLoopMonth={setLoopMonth}
        cashbookAsset={cashbookAsset}
        setCashbookAsset={setCashbookAsset}
        assetList={assetList}
        cashbookCategory={cashbookCategory}
        setCashbookCategory={setCashbookCategory}
        cashbookMoney={cashbookMoney}
        setCashbookMoney={setCashbookMoney}
        cashbookContent={cashbookContent}
        setCashbookContent={setCashbookContent}
        cashbookMemo={cashbookMemo}
        setCashbookMemo={setCashbookMemo}
        challengeNo={challengeNo}
        setChallengeNo={setChallengeNo}
        challengeCate={challengeCate}
        setChallengeCate={setChallengeCate}
        incomeCate={incomeCate}
        spendingCate={spendingCate}
        key={cashbook.cashbookNo}
        clickEvent={modify}
        className={modalClass}
        delNo={cashbookNo}
        select={select}
        setSelect={setSelect}
      />
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
            가계부 수정 성공!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default CashbookModify;
