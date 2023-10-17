import axios from "axios";
import { Button1 } from "../util/Buttons";
import { useEffect, useState } from "react";
import CashbookWrite from "../cashbook/CashbookWrite";
import "./dateList.css";

const DateList = (props) => {
  const info = props.info;
  const setInfo = props.setInfo;
  const listOpen = props.listOpen;
  const closeListFrm = props.closeListFrm;
  const calendarEventArr = props.calendarEventArr;
  const datePick = props.datePick;
  const setDatePick = props.setDatePick;
  console.log(calendarEventArr);
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
        console.log(res.data.cashbookList);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [datePick]);
  console.log(calList);
  return (
    <div
      className="cashbook-modal"
      id="writeFrmModal"
      style={{ display: listOpen ? "flex" : "none" }}
    >
      <div className="cashbook-modal-content">
        <div className="cashbook-modal-title">{info.dateStr}</div>
        <p className="cal-list-label">내역</p>
        <div className="cashbook-modal-detail date-finance">
          {calendarEventArr.map((item) =>
            item.date === info.dateStr ? (
              item.cashbookFinance === 1 ? (
                <div className="date-list">
                  <span>수입</span>
                  <span> | </span>
                  <span style={{ color: " #323673" }}>{item.title}원</span>
                </div>
              ) : (
                <div className="date-list">
                  <span>지출</span>
                  <span> | </span>
                  <span style={{ color: "#e66eb2" }}>{item.title}원</span>
                </div>
              )
            ) : null
          )}
        </div>
        <div className="date-finance">
          {calList.map((item, index) => {
            <div key={"calList" + index}>
              <span>{item.cashbookCategory}</span>
              <div>
                <p>{item.cashbookContent}</p>
                <span>{item.cashbookAsset}</span>
              </div>
              <span>{item.cashbookMoney}원</span>
            </div>;
          })}
        </div>
        <div className="modalBtn-area">
          <Button1 text={"등록"} />
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
