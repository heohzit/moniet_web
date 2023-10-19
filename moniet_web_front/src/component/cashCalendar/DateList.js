import axios from "axios";
import { Button1 } from "../util/Buttons";
import { useEffect, useState } from "react";
import CashbookWrite from "../cashbook/CashbookWrite";
import "./dateList.css";
import CashbookModify from "../cashbook/CashbookModify";

const DateList = (props) => {
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
  }, [datePick]);

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

  const isOpen = () => {
    setAddFrmOpen(true);
  };
  const closeFrm = (e) => {
    setAddFrmOpen(false);
    e.stopPropagation();
  };

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

  return (
    <div
      className="cashbook-modal"
      id="writeFrmModal"
      style={{ display: listOpen ? "flex" : "none" }}
    >
      <div className="cashbook-modal-content">
        <div className="cashbook-modal-title">{info.dateStr}</div>
        <div className="cal-title-zone">
          <div>
            <p className="cal-list-label">내역</p>
          </div>

          <CashbookWrite
            isOpen={isOpen}
            addFrmOpen={addFrmOpen}
            closeFrm={closeFrm}
            dateString={dateString}
            assetList={assetList}
            challengeCate={challengeCate}
            setChallengeCate={setChallengeCate}
            incomeCate={incomeCate}
            spendingCate={spendingCate}
            select={select}
            setSelect={setSelect}
            className={"small-add"}
            modalClass={"flex-no-end"}
          />
        </div>
        <div className="cashbook-modal-detail date-finance">
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
          {calList.map((item, index) => {
            return (
              <div
                key={"달력" + item.cashbookNo}
                className="date-list list-box"
                onClick={isModiOpen}
              >
                <div className="box-style">
                  <span>{item.categoryTitle}</span>
                </div>
                <div className="box-style">
                  <p>{item.cashbookContent}</p>
                  <span>{assetToString(item.cashbookAsset)}</span>
                </div>
                <div className="box-style">
                  <p
                    className={`${
                      item.cashbookFinance === 1
                        ? "money-color"
                        : "money-color-spending"
                    }`}
                  >
                    {item.cashbookMoney.toLocaleString("ko-KR")}원
                  </p>
                </div>
                <CashbookModify
                  key={"수정" + item.cashbookNo}
                  cashbook={item}
                  isOpen={modifyFrmOpen}
                  closeFrm={modiClose}
                  title={"수정"}
                  dateString={dateString}
                  select={select}
                  setSelect={setSelect}
                  modifyFrmOpen={modifyFrmOpen}
                  setModifyFrmOpen={setModifyFrmOpen}
                  assetList={assetList}
                  challengeCate={challengeCate}
                  incomeCate={incomeCate}
                  spendingCate={spendingCate}
                  modalClass={"flex-no-end"}
                />
              </div>
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
      </div>
    </div>
  );
};

export default DateList;
