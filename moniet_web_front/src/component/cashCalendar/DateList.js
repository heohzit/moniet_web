import axios from "axios";
import { Button1 } from "../util/Buttons";
import { useEffect, useState } from "react";
import CashbookWrite from "../cashbook/CashbookWrite";
import "./dateList.css";
import CashbookModify from "../cashbook/CashbookModify";
import CashInputModal from "../cashModal/CashInputModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ModalFrm from "../cashModal/ModalFrm";
import useModal from "./useModal";

const DateList = (props) => {
  const onClose = props.onClose;
  const info = props.info;
  const setInfo = props.setInfo;
  const listOpen = props.listOpen;
  const closeListFrm = props.closeListFrm;
  const calendarEventArr = props.calendarEventArr;
  const datePick = props.datePick;
  const setDatePick = props.setDatePick;
  const select = props.select;
  const setSelect = props.setSelect;

  const [calList, setCalList] = useState([]);
  const obj = {
    startDate: datePick,
    endDate: datePick,
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/list", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCalList(res.data.cashbookList);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [datePick, select]);

  const assetList = ["현금", "신용카드", "체크카드", "이체", "기타"];
  const assetToString = (num) => {
    switch (num) {
      case 1:
        return "현금";
      case 2:
        return "신용카드";
      case 3:
        return "체크카드";
      case 4:
        return "이체";
      case 5:
        return "기타";
      //no default
    }
  };

  //write용
  const dateString = props.dateString;
  const [addFrmOpen, setAddFrmOpen] = useState(false);
  const [incomeCate, setIncomCate] = useState([]);
  const [spendingCate, setSpendingCate] = useState([]);
  const [challengeCate, setChallengeCate] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/categoryList", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setChallengeCate(res.data.challengeCategory);
        setIncomCate(res.data.incomeCategory);
        setSpendingCate(res.data.spendingCategory);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  {
    /**
  const isOpen = () => {
    setAddFrmOpen(true);
  };
  const closeFrm = (e) => {
    setAddFrmOpen(false);
    e.stopPropagation();
  };
 */
  }
  // modify용
  const [modifyFrmOpen, setModifyFrmOpen] = useState(false);

  const isModiOpen = (cashbookNo) => {
    console.log(cashbookNo);
    setModifyFrmOpen(true);
  };
  const modiClose = (e) => {
    setModifyFrmOpen(false);
    e.stopPropagation();
  };

  //스낵바 노출용
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
  const { isOpen, open, close } = useModal();
  return (
    <ModalFrm onClick={open}>
      <div className="cash-modal-title">{info.dateStr}</div>
      <div className="cal-title-zone">
        <div>
          <p className="cal-list-label">내역</p>
        </div>

        <CashbookWrite
          open={isOpen}
          dateString={dateString}
          assetList={assetList}
          challengeCate={challengeCate}
          setChallengeCate={setChallengeCate}
          incomeCate={incomeCate}
          spendingCate={spendingCate}
          select={select}
          setSelect={setSelect}
          modalClass={"flex-no-end"}
        />
      </div>
      <div className="cash-modal-detail date-finance">
        {calendarEventArr.map((item) =>
          item.date === info.dateStr ? (
            item.cashbookFinance === 1 ? (
              <div
                className="date-list total-box"
                key={"수입" + item.cashbookNo}
              >
                <span>수입</span>
                <span> | </span>
                <span style={{ color: " #323673" }}>{item.title}원</span>
              </div>
            ) : (
              <div
                className="date-list total-box"
                key={"지출" + item.cashbookNo}
              >
                <span>지출</span>
                <span> | </span>
                <span style={{ color: "#e66eb2" }}>{item.title}원</span>
              </div>
            )
          ) : null
        )}
      </div>
      <div className="date-finance date-list-over">
        {calList &&
          calList.map((cashbook, index) => {
            return (
              <DateCashItem
                cashbook={cashbook}
                dateString={dateString}
                onOpenClickHandler={onOpenClickHandler}
                select={select}
                setSelect={setSelect}
                assetToString={assetToString}
                assetList={assetList}
                challengeCate={challengeCate}
                setChallengeCate={setChallengeCate}
                incomeCate={incomeCate}
                spendingCate={spendingCate}
                showSnackbar={showSnackbar}
                onCloseClickHandler={onCloseClickHandler}
                key={"dateCash" + index}
              />
            );
          })}
      </div>
      <div className="modalBtn-area">
        <button
          className="closeModalBtn"
          id="closeModal"
          onClick={closeListFrm}
        >
          닫기
        </button>
      </div>
    </ModalFrm>
  );
};

export default DateList;

const DateCashItem = (props) => {
  const cashbook = props.cashbook;
  const dateString = props.dateString;
  const onOpenClickHandler = props.onOpenClickHandler;
  const select = props.select;
  const setSelect = props.setSelect;
  const checkItems = props.checkItems;
  const assetToString = props.assetToString;
  const assetList = props.assetList;
  const challengeCate = props.challengeCate;
  const setChallengeCate = props.setChallengeCate;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const showSnackbar = props.showSnackbar;
  const selectChecked = props.selectChecked;
  const onCloseClickHandler = props.onCloseClickHandler;

  //모달추가 / 수정용
  const [isOpen1, setIsOpen1] = useState(false);
  const onClickButton1 = (e) => {
    setIsOpen1(true);
    e.stopPropagation();
  };

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
          setIsOpen1(false);
          setSelect(!select);
        } else {
          console.log("등록 중 에러 발생");
        }
      })
      .catch((res) => {
        console.log(res.response);
      });
  };
  return (
    <div
      key={"달력" + cashbook.cashbookNo}
      className="date-list list-box"
      onClick={onClickButton1}
    >
      <div className="box-style">
        <span>{cashbook.categoryTitle}</span>
      </div>
      <div className="box-style">
        <p>{cashbook.cashbookContent}</p>
        <span>{assetToString(cashbook.cashbookAsset)}</span>
      </div>
      <div className="box-style">
        <p
          className={`${
            cashbook.cashbookFinance === 1
              ? "money-color"
              : "money-color-spending"
          }`}
        >
          {cashbook.cashbookMoney.toLocaleString("ko-KR")}원
        </p>

        {isOpen1 && (
          <CashInputModal
            open={isOpen1}
            onClose={(e) => {
              setIsOpen1(false);
              e.stopPropagation();
              setSelect(!select);
            }}
            title={"수정"}
            dateString={dateString}
            cashbook={cashbook}
            cashbookFinance={cashbook.cashbookFinance}
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
            delNo={cashbookNo}
            select={select}
            setSelect={setSelect}
          />
        )}
      </div>
      {showSnackbar && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
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
