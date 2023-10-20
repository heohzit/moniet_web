import { useState } from "react";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CashInputModal from "../cashModal/CashInputModal";

const CashbookModify = (props) => {
  const item = props.cashbook;
  //const isOpen = props.isOpen;
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
  //모달추가
  const isOpen2 = props.isOpen2;
  const setIsOpen2 = props.setIsOpen2;

  const [cashbookNo, setCashbookNo] = useState(item.cashbookNo);
  const [cashbookFinance, setCashbookFinance] = useState(item.cashbookFinance);
  const [cashbookDate, setCashbookDate] = useState(new Date(item.cashbookDate));
  const [cashbookLoop, setCashbookLoop] = useState(item.cashbookLoop);
  const [loopMonth, setLoopMonth] = useState(item.loopMonth);
  const [cashbookAsset, setCashbookAsset] = useState(item.cashbookAsset);
  const [cashbookCategory, setCashbookCategory] = useState(
    item.cashbookCategory
  );
  const [cashbookMoney, setCashbookMoney] = useState(item.cashbookMoney);
  const [cashbookContent, setCashbookContent] = useState(item.cashbookContent);
  const [cashbookMemo, setCashbookMemo] = useState(item.cashbookMemo);
  const [challengeNo, setChallengeNo] = useState(item.challengeNo);

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
      {isOpen2 && (
        <CashInputModal
          isOpen={isOpen2}
          onClose={() => {
            console.log(33);
            setIsOpen2(false);
            setSelect(!select);
          }}
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
          key={item.cashbookNo}
          clickEvent={modify}
          delNo={cashbookNo}
          select={select}
          setSelect={setSelect}
        />
      )}
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
              backgroundColor: "#323673",
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
