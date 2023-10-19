import axios from "axios";
import ModalFrm from "./ModalFrm";
import { useState } from "react";

const CashInputModal = (props) => {
  const onClose = props.onClose;
  const title = props.title;
  const dateString = props.dateString;
  const assetList = props.assetList;
  const cashbookFinance = props.cashbookFinance;
  const setCashbookFinance = props.setCashbookFinance;
  const className = props.className;
  const cashbookDate = props.cashbookDate;
  const setCashbookDate = props.setCashbookDate;
  const cashbookLoop = props.cashbookLoop;
  const setCashbookLoop = props.setCashbookLoop;
  const cashbookLoopList = ["없음", "반복", "할부"];
  const loopMonth = props.loopMonth;
  const setLoopMonth = props.setLoopMonth;
  const loopMonthMap = [
    { i: 1, cycle: "1개월" },
    { i: 2, cycle: "2개월" },
    { i: 3, cycle: "3개월" },
    { i: 4, cycle: "4개월" },
    { i: 6, cycle: "6개월" },
    { i: 12, cycle: "1년" },
  ];

  const cashbookAsset = props.cashbookAsset;
  const setCashbookAsset = props.setCashbookAsset;
  const cashbookCategory = props.cashbookCategory;
  const setCashbookCategory = props.setCashbookCategory;
  const challengeNo = props.challengeNo;
  const setChallengeNo = props.setChallengeNo;
  const cashbookMoney = props.cashbookMoney;
  const setCashbookMoney = props.setCashbookMoney;
  const cashbookContent = props.cashbookContent;
  const setCashbookContent = props.setCashbookContent;
  const cashbookMemo = props.cashbookMemo;
  const setCashbookMemo = props.setCashbookMemo;
  const challengeCate = props.challengeCate;
  const setChallengeCate = props.setChallengeCate;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const clickEvent = props.clickEvent;
  const cashbook = props.cashbook;
  const [toggleOn, setToggleOn] = useState(false);

  const toggle = () => {
    setToggleOn(!toggleOn);
  };
  const selectFinance = (e) => {
    const financeBtn = document.querySelectorAll(".select-finance>.btn");
    financeBtn[0].classList.remove("finance-checked");
    financeBtn[1].classList.remove("finance-checked");
    if (e.currentTarget.innerText === "수입") {
      setCashbookFinance(1);
      setCashbookCategory(3);
    } else {
      setCashbookFinance(2);
      setCashbookCategory(11);
    }
    e.currentTarget.classList.add("finance-checked");
    const loop = document.querySelector("select[name='cashbookLoop']");
    loop.value = 0;
    setCashbookLoop(0);
  };

  const selectDate = (item) => {
    setCashbookDate(item);
    console.log(challengeCate);
    toggle();
  };

  const changeLoop = (e) => {
    setCashbookLoop(e.currentTarget.value);
  };
  const changeLoopMonth = (e) => {
    if (e.currentTargetValue === "") {
      setCashbookLoop(0);
    } else {
      setLoopMonth(e.currentTarget.value);
    }
  };
  const dataOnlyNum = (e) => {
    const regNumber = /^[0-9]+$/;
    let value = e.currentTarget.value;
    if (!regNumber.test(value)) {
      document.querySelector("#add-money").value = "";
      setCashbookMoney("");
    }
  };
  const changeCategory = (e) => {
    setCashbookCategory(e.currentTarget.value);
  };

  //삭제 이벤트
  const delNo = props.delNo;
  const select = props.select;
  const setSelect = props.setSelect;
  const deleteOne = () => {
    const token = window.localStorage.getItem("token");
    const cashbookNos = delNo;
    axios
      .post("/cashbook/delete", cashbookNos, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        onClose();
        setSelect(!select);
        onOpenClickHandler();
      })
      .catch((res) => {
        console.log(cashbookNos);
        console.log(res);
      });
  };
  //삭제 스낵바
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
    <ModalFrm onClose={onClose}>
      <div className="cashbook-modal-content">
        <div className="cashbook-modal-title">{title}</div>
      </div>
    </ModalFrm>
  );
};
export default CashInputModal;
