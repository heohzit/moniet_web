import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./cashbook.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import ko from "date-fns/locale/ko";
import { Button4, Button5 } from "../util/Buttons";
import AddComma from "./AddComma";
import Input from "../util/InputFrm";
import { NextMonth, PrevMonth } from "./MoveMonth";
import CashbookWrite from "./CashbookWrite";
import CashbookTable from "./CashbookTable";

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
  const assetList = ["현금", "신용카드", "체크카드", "이체", "기타"];
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

  //카테고리셋팅
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

  const addComma = (num) => {
    if (num >= 1000) {
      const numAddComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return numAddComma;
    }
    return num;
  };

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
    console.log(cashbookList);
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
    <div>
      <div className="date-range-icon">
        <PrevMonth
          dateRange={dateRange}
          setDateRange={setDateRange}
          select={select}
          setSelect={setSelect}
        />

        <div onClick={() => toggle()}>
          <Input
            data={
              dateString(dateRange[0].startDate) +
              " ~ " +
              dateString(dateRange[0].endDate)
            }
          />
        </div>

        <NextMonth
          dateRange={dateRange}
          setDateRange={setDateRange}
          select={select}
          setSelect={setSelect}
        />
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
        />
        <div className="cashbook-btn-zone">
          <Button5
            text={
              "합계(" +
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
          <CashbookTable
            cashbookList={cashbookList}
            setCashbookList={setCashbookList}
            assetList={assetList}
            incomeCate={incomeCate}
            spendingCate={spendingCate}
            assetToString={assetToString}
          />

          <table>
            <thead>
              <tr>
                <td width={"5%"}>
                  <input type="checkbox" className="cashbook-checkbox" />
                </td>
                <td width={"20%"}>날짜</td>
                <td width={"15%"}>자산</td>
                <td width={"15%"}>분류</td>
                <td width={"15%"}>금액</td>
                <td width={"30%"}>내용</td>
              </tr>
            </thead>
            <tbody>
              {cashbookList &&
                cashbookList.map((cashbook, index) => {
                  return (
                    <CashbookItem
                      key={"cashbook" + index}
                      cashbook={cashbook}
                      assetToString={assetToString}
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
  const assetToString = props.assetToString;

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
