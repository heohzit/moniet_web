import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./cashbook.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { DateRange, DateRangePicker, DefinedRange } from "react-date-range";
import { addDays } from "date-fns";
import ko from "date-fns/locale/ko";
import { Button4, Button5 } from "../util/Buttons";
import AddComma from "./AddComma";
import Input from "../util/InputFrm";
import AddCashbook from "./AddCashbook";

const Cashbook = (props) => {
  const isLogin = props.isLogin;

  const [cashbookList, setCashbookList] = useState([]);
  const [cashbookSum, setCashbookSum] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      key: "selection",
    },
  ]);
  const [select, setSelect] = useState(false);
  const obj = {
    startDate: dateString(dateRange[0].startDate),
    endDate: dateString(dateRange[0].endDate),
  };
  function dateString(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/list", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCashbookList(res.data.cashbookList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [select]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/total", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCashbookSum(res.data);
      });
  }, [select]);
  const addComma = (num) => {
    if (num >= 1000) {
      const numAddComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return numAddComma;
    }
    return num;
  };

  const [cashbookFinance, setCashbookFinance] = useState(0);
  const [cashbookLoop, setCashbookLoop] = useState(0);
  const [loopMonth, setLoopMonth] = useState(0);
  const [cashbookAsset, setCashbookAsset] = useState("");
  const [cashbookCategory, setCashbookCategory] = useState([]);
  const [cashbookMoney, setCashbookMoney] = useState(0);
  const [cashbookContent, setCashbookContent] = useState("");
  const [cashbookMemo, setCashbookMemo] = useState("");
  const clickEvent = () => {
    console.log(cashbookFinance);
  };

  const applyDate = () => {
    setSelect(!select);
    setToggleOn(!toggleOn);
  };
  const resetDate = () => {
    const thisMonth = document.querySelector(".rdrStaticRange:nth-of-type(5)");
    thisMonth.click();
    setSelect(!select);
    setToggleOn(!toggleOn);
  };
  //날짜 범위 토글용
  const [toggleOn, setToggleOn] = useState(false);
  const toggle = () => {
    setToggleOn(!toggleOn);
  };

  //addFrm
  const [addFrmOpen, setAddFrmOpen] = useState(false);
  const isOpen = () => {
    setAddFrmOpen(true);
  };
  const closeFrm = () => {
    setAddFrmOpen(false);
  };

  return (
    <div className="cashbook-all-wrap">
      <div className="cashbook-title">내역</div>
      <div className="date-range-icon">
        <img src="icon/left-btn.png" alt="prev" />
        <div onClick={() => toggle()}>
          <Input
            data={
              dateString(dateRange[0].startDate) +
              " ~ " +
              dateString(dateRange[0].endDate)
            }
          />
        </div>
        <img src="icon/right-btn.png" alt="next" />
      </div>
      <div
        className={
          toggleOn ? "date-range-area toggle-on" : "date-range-area toggle-off"
        }
      >
        <DateRangePicker
          onChange={(item) => setDateRange([item.selection])}
          months={1}
          editableDateInputs={true}
          minDate={addDays(new Date(), -300)}
          maxDate={addDays(new Date(), 900)}
          direction="vertical"
          //scroll={{ enabled: true }}
          ranges={dateRange}
          locale={ko}
          dateDisplayFormat="yyyy년 MMM d일"
          rangeColors={["#6a6da6", "#3ecf8e", "#fed14c"]}
          monthDisplayFormat="yyyy년 MMM"
        />
        <div className="range-chg rdrDateRangePickerWrapper">
          <Button4 text={"apply"} clickEvent={applyDate} />
          <Button5 text={"reset"} clickEvent={resetDate} />
        </div>
      </div>

      <div className="cashbook-content">
        <div className="add-btn">
          <img src="icon/add-btn.png" alt="add" onClick={isOpen} />
          <AddCashbook
            isOpen={addFrmOpen}
            closeFrm={closeFrm}
            dateString={dateString}
            cashbookFinance={cashbookFinance}
            setCashbookFinance={setCashbookFinance}
            cashbookLoop={cashbookLoop}
            setCashbookLoop={setCashbookLoop}
            loopMonth={loopMonth}
            setLoopMonth={setLoopMonth}
            cashbookAsset={cashbookAsset}
            setCashbookAsset={setCashbookAsset}
            cashbookCategory={cashbookCategory}
            setCashbookCategory={setCashbookCategory}
            cashbookMoney={cashbookMoney}
            setCashbookMoney={setCashbookMoney}
            cashbookContent={cashbookContent}
            setCashbookContent={setCashbookContent}
            cashbookMemo={cashbookMemo}
            setCashbookMemo={setCashbookMemo}
            clickEvent={clickEvent}
          />
        </div>
        <div className="cashbook-btn-zone">
          <Button5
            text={
              "전체(" +
              addComma(cashbookSum.totalCount) +
              "건) " +
              addComma(cashbookSum.total) +
              "원"
            }
          />
          <Button5
            text={
              "수입(" +
              addComma(cashbookSum.countIn) +
              "건) " +
              addComma(cashbookSum.income) +
              "원"
            }
          />
          <Button5
            text={
              "지출(" +
              addComma(cashbookSum.countOut) +
              "건) " +
              addComma(cashbookSum.spending) +
              "원"
            }
          />
        </div>
        <div className="cashbook-detail">
          <table>
            <thead>
              <tr>
                <td width={"5%"}>
                  <input type="checkbox" className="cashbook-checkbox" />
                </td>
                <td width={"20%"}>날짜</td>
                <td width={"20%"}>자산</td>
                <td width={"20%"}>분류</td>
                <td width={"20%"}>금액</td>
                <td width={"20%"}>내용</td>
              </tr>
            </thead>
            <tbody>
              {cashbookList &&
                cashbookList.map((cashbook, index) => {
                  return (
                    <CashbookItem
                      key={"cashbook" + index}
                      cashbook={cashbook}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CashbookItem = (props) => {
  const cashbook = props.cashbook;
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

  return (
    <tr>
      <td>
        <input type="checkbox" className="cashbook-checkbox" />
      </td>
      <td>{cashbook.cashbookDate}</td>
      <td>{assetToString(cashbook.cashbookAsset)}</td>
      <td>{cashbook.categoryTitle}</td>
      <td
        className={`${
          cashbook.cashbookFinance === 1
            ? "money-color"
            : "money-color-spending"
        }`}
      >
        <AddComma num={cashbook.cashbookMoney} />
      </td>
      <td>{cashbook.cashbookContent}</td>
    </tr>
  );
};
export default Cashbook;
