import { useState } from "react";

import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CashInputModal from "../cashModal/CashInputModal";

const CashbookWrite = (props) => {
  //const isOpen = props.isOpen;
  const addFrmOpen = props.addFrmOpen;
  const closeFrm = props.closeFrm;
  const dateString = props.dateString;
  const assetList = props.assetList;
  const challengeCate = props.challengeCate;
  const setChallengeCate = props.setChallengeCate;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const select = props.select;
  const setSelect = props.setSelect;
  const className = props.className;
  const modalClass = props.modalClass;
  const datePick = props.datePick;

  const [cashbookFinance, setCashbookFinance] = useState(2);
  const [cashbookDate, setCashbookDate] = useState(
    datePick !== null && datePick !== undefined
      ? new Date(datePick)
      : new Date()
  );
  const [cashbookLoop, setCashbookLoop] = useState(0);
  const [loopMonth, setLoopMonth] = useState(0);
  const [cashbookAsset, setCashbookAsset] = useState(1);
  const [cashbookCategory, setCashbookCategory] = useState(11);
  const [cashbookMoney, setCashbookMoney] = useState(0);
  const [cashbookContent, setCashbookContent] = useState("");
  const [cashbookMemo, setCashbookMemo] = useState("");
  const [challengeNo, setChallengeNo] = useState(0);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const onOpenClickHandler = (e) => {
    setShowSnackbar(true);
  };
  const onCloseClickHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const write = () => {
    const token = window.localStorage.getItem("token");
    const cashbook = {
      cashbookFinance: cashbookFinance,
      cashbookDate: dateString(cashbookDate),
      cashbookLoop:
        cashbookLoop !== 0
          ? loopMonth === 0
            ? 0
            : cashbookLoop
          : cashbookLoop,
      loopMonth: loopMonth,
      cashbookAsset: cashbookAsset,
      cashbookCategory: cashbookCategory,
      cashbookMoney: cashbookMoney,
      cashbookContent: cashbookContent,
      cashbookMemo: cashbookMemo,
      challengeNo: challengeNo,
    };
    axios
      .post("/cashbook/insert", cashbook, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1 || -1) {
          setCashbookFinance(2);
          setCashbookDate(new Date());
          setCashbookLoop(0);
          setLoopMonth(0);
          setCashbookAsset(1);
          setCashbookCategory(11);
          setCashbookMoney(0);
          setCashbookContent("");
          setCashbookMemo("");
          onOpenClickHandler();
          setIsOpen1(false);
          setSelect(!select);
        } else {
          //console.log("등록 중 에러 발생");
        }
      })
      .catch((res) => {
        //console.log(res.response);
      });
  };

  //모달추가
  //const [isOpen, setIsOpen] = useState(false);
  //const { openModal } = useModal();
  const [isOpen1, setIsOpen1] = useState(false);
  const onClickButton1 = () => {
    setIsOpen1(true);
  };
  {
    /**모달추가 일단생략
  const onClickButton = () => {
    setIsOpen(true);
  };
   */
  }

  return (
    <div className="add-btn">
      <AddIcon onClick={onClickButton1} />
      {isOpen1 && (
        <CashInputModal
          open={isOpen1}
          onClose={() => {
            setIsOpen1(false);
            setSelect(!select);
          }}
          title={"입력"}
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
          clickEvent={write}
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
            가계부 등록 성공!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default CashbookWrite;
