import { useState } from "react";
import "./addCashbook.css";
import { Button1, Button5 } from "../util/Buttons";
import Input from "../util/InputFrm";
import { Calendar } from "react-date-range";
import ko from "date-fns/locale/ko";
import Select from "../util/Select";

const AddCashbook = (props) => {
  const isOpen = props.isOpen;
  const closeFrm = props.closeFrm;
  const dateString = props.dateString;

  const cashbookFinance = props.cashbookFinance;
  const setCashbookFinance = props.setCashbookFinance;

  const cashbookLoop = props.cashbookLoop;
  const setCashbookLoop = props.setCashbookLoop;
  const loopMonth = props.setLoopMonth;
  const setLoopMonth = props.setLoopMonth;
  const cashbookAsset = props.cashbookAsset;
  const setCashbookAsset = props.setCashbookAsset;
  const cashbookCategory = props.cashbookCategory;
  const setCashbookCategory = props.setCashbookCategory;
  const cashbookMoney = props.cashbookMoney;
  const setCashbookMoney = props.setCashbookMoney;
  const cashbookContent = props.cashbookContent;
  const setCashbookContent = props.setCashbookContent;
  const cashbookMemo = props.cashbookMemo;
  const setCashbookMemo = props.setCashbookMemo;
  const clickEvent = props.clickEvent;
  const [toggleOn, setToggleOn] = useState(false);
  const toggle = () => {
    setToggleOn(!toggleOn);
  };
  const selectFinance = (e) => {
    const financeBtn = document.querySelectorAll(".select-finance>.btn");
    financeBtn[0].classList.remove("finance-checked");
    financeBtn[1].classList.remove("finance-checked");
    e.currentTarget.innerText === "수입"
      ? setCashbookFinance(1)
      : setCashbookFinance(2);
    console.log(e);
    e.currentTarget.classList.add("finance-checked");
  };

  const selectDate = (item) => {
    setCashbookDate(item);
    toggle();
  };
  const [cashbookDate, setCashbookDate] = useState(new Date());
  const changeLoop = (e) => {
    setCashbookLoop(e.currentTarget.value);
    const loop = document.querySelectorAll(".loop-div");
  };
  return (
    <div
      className="modal"
      id="writeFrmModal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="modal-content">
        <div className="modal-title">입력</div>
        <div className="modalBtn-area finance-zone">
          <div className="select-finance">
            <Button5 text={"수입"} clickEvent={selectFinance} />
          </div>
          <div className="select-finance">
            <Button5 text={"지출"} clickEvent={selectFinance} />
          </div>
        </div>
        <div className="modal-detail">
          <div className="modal-detail-content">
            <label htmlFor="add-date">날짜</label>

            <div className="modal-detail-content" onClick={() => toggle()}>
              <Input
                data={dateString(cashbookDate)}
                setData={setCashbookDate}
                content={"add-date"}
                placeholder={dateString(cashbookDate)}
              />
            </div>
            <div
              className="calenadr-div"
              style={{ display: toggleOn ? "flex" : "none" }}
            >
              <Calendar
                locale={ko}
                dateDisplayFormat="yyyy년 MMM d일"
                monthDisplayFormat="yyyy년 MMM"
                onChange={(item) => selectDate(item)}
                date={cashbookDate}
                color="#010440"
              />
            </div>
            <div className="modal-detail-content loop-div">
              <label htmlFor="add-loop">반복/할부</label>
              <select
                name="cashbookLoop"
                value={cashbookLoop}
                onChange={changeLoop}
              >
                <option value="0">없음</option>
                <option value="1">반복</option>
                <option value="2">할부</option>
              </select>

              <Input
                data={cashbookLoop}
                setData={setCashbookLoop}
                content={"add-loop"}
              />
            </div>
            <label htmlFor="add-asset">자산</label>
            <Input
              data={cashbookAsset}
              setData={setCashbookAsset}
              content={"add-asset"}
            />
            <label htmlFor="add-category">분류</label>
            <Input
              data={cashbookCategory}
              setData={setCashbookCategory}
              content={"add-category"}
            />
            <label htmlFor="add-money">금액(원)</label>
            <Input
              data={cashbookMoney}
              setData={setCashbookMoney}
              content={"add-money"}
            />
            <label htmlFor="add-content">내용</label>
            <Input
              data={cashbookContent}
              setData={setCashbookContent}
              content={"add-content"}
            />
            <hr />
            <label htmlFor="add-memo">메모</label>
            <Input
              data={cashbookMemo}
              setData={setCashbookMemo}
              content={"add-memo"}
            />
          </div>
        </div>
        <div className="modalBtn-area">
          <Button1 text={"등록"} clickEvent={clickEvent} />
          <button className="closeModalBtn" id="closeModal" onClick={closeFrm}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddCashbook;
