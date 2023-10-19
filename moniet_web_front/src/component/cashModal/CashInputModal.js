import axios from "axios";
import ModalFrm from "./ModalFrm";
import { useState } from "react";
import { Button1, Button5 } from "../util/Buttons";
import Input from "../util/InputFrm";
import { Calendar } from "react-date-range";
import ko from "date-fns/locale/ko";

const CashInputModal = (props) => {
  const cashbook = props.cashbook;
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

  const [toggleOn, setToggleOn] = useState(false);

  const toggle = () => {
    setToggleOn(!toggleOn);
  };
  const selectFinance = (e) => {
    const financeBtn = document.querySelectorAll(".select-finance>.btn");
    financeBtn[0].classList.remove("finance-checked");
    financeBtn[1].classList.remove("finance-checked");
    if (e.currentTarget.innerText === "수 입") {
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
      <div className="cash-modal-title">{title}</div>
      <div className="modalBtn-area finance-zone">
        {cashbookFinance === 1 ? (
          <>
            <div className="select-finance">
              <Button5
                className={"finance-checked"}
                text={"수 입"}
                clickEvent={selectFinance}
              />
            </div>
            <div className="select-finance">
              <Button5 text={"지 출"} clickEvent={selectFinance} />
            </div>
          </>
        ) : (
          <>
            <div className="select-finance">
              <Button5 text={"수 입"} clickEvent={selectFinance} />
            </div>
            <div className="select-finance finance-checked">
              <Button5
                className={"finance-checked"}
                text={"지 출"}
                clickEvent={selectFinance}
              />
            </div>
          </>
        )}
      </div>
      <div className="cash-modal-detail">
        <div className="cash-modal-detail-content">
          <label htmlFor="add-date">날짜</label>
          <div className="cash-modal-detail-content" onClick={() => toggle()}>
            <Input
              data={dateString(cashbookDate)}
              setData={setCashbookDate}
              content={"add-date"}
              placeholder={dateString(cashbookDate)}
            />
          </div>
          <div
            className="calendar-div"
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
          <div className="cash-modal-detail-content select-div">
            <label htmlFor="add-loop">반복/할부</label>
            <span id="numChkMsg"></span>
            <div>
              <select
                name="cashbookLoop"
                value={cashbookLoop}
                onChange={changeLoop}
              >
                {cashbookLoopList.map((item, index) => (
                  <option value={index} key={"item" + index}>
                    {item}
                  </option>
                ))}
              </select>
              {cashbookLoop === "1" ? (
                <select
                  name="loopMonth"
                  defaultValue={loopMonth}
                  onChange={changeLoopMonth}
                  className="cashbook-select"
                >
                  <option value="">주기 선택</option>
                  {loopMonthMap.map((item, index) => (
                    <option value={item.i} key={"item" + index}>
                      {item.cycle + "마다"}
                    </option>
                  ))}
                </select>
              ) : null}
              {cashbookLoop === "2" ? (
                <Input
                  data={loopMonth}
                  setData={setLoopMonth}
                  placeholder={"개월 수"}
                  content={"installment"}
                  type={"number"}
                  min={0}
                  max={99}
                />
              ) : null}
            </div>
          </div>
          <div className="cash-modal-detail-content select-div">
            <label htmlFor="add-asset">자산</label>
            <div>
              <select
                name="cashbookAsset"
                id="add-asset"
                value={cashbookAsset}
                onChange={(e) => setCashbookAsset(e.currentTarget.value)}
              >
                {assetList.map((item, index) => (
                  <option value={index + 1} key={item + (index + 1)}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cash-detail-content select-div">
            <label htmlFor="add-category">분류</label>
            <div>
              <select
                name="cashbookCategory"
                id="add-category"
                onChange={changeCategory}
                value={cashbookCategory}
              >
                {cashbookFinance === 1
                  ? incomeCate.map((item, index) => (
                      <option value={item.categoryNo} key={"income" + index}>
                        {item.categoryTitle}
                      </option>
                    ))
                  : spendingCate.map((item, index) => (
                      <option value={item.categoryNo} key={"spending" + index}>
                        {item.categoryTitle}
                      </option>
                    ))}
              </select>
              {cashbookCategory === "21" ? (
                <select
                  name="challengeNo"
                  defaultValue={challengeNo}
                  onChange={(e) => setChallengeNo(e.currentTarget.value)}
                  className="cashbook-select"
                >
                  <option value="">챌린지 없음</option>
                  {challengeCate.map((item, index) =>
                    new Date(cashbookDate) >= new Date(item.challengeStart) &&
                    new Date(cashbookDate) <= new Date(item.challengeEnd) ? (
                      <option
                        value={item.challengeNo}
                        key={"challenge" + index}
                      >
                        {item.challengeTitle}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              ) : null}
            </div>
          </div>
          <label htmlFor="add-money">금액(원)</label>
          <Input
            data={cashbookMoney}
            setData={setCashbookMoney}
            content={"add-money"}
            type={"text"}
            placeholder={"숫자만 입력하세요."}
            keyUpEvent={dataOnlyNum}
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
            placeholder={"수입/지출에 대한 회고를 남겨보세요!"}
          />
        </div>
      </div>
      <div className="modalBtn-area">
        {title === "입력" ? (
          <>
            <Button1 text={"등 록"} clickEvent={clickEvent} />
            <button className="closeModalBtn" id="closeModal" onClick={onClose}>
              닫기
            </button>{" "}
          </>
        ) : (
          <>
            <Button1 text={"수 정"} clickEvent={clickEvent} />
            <Button5 text={"삭 제"} clickEvent={deleteOne} />
            <button className="closeModalBtn" id="closeModal" onClick={onClose}>
              닫 기
            </button>{" "}
          </>
        )}
      </div>
    </ModalFrm>
  );
};
export default CashInputModal;
