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
import { Button5 } from "../util/Buttons";
import AddComma from "./AddComma";
import Input from "../util/InputFrm";
import moment from "moment/moment";

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

  const obj = {
    startDate: dateRange[0].startDate,
    endDate: dateRange[0].endDate,
  };
  useEffect(() => {
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/cashbook/list/", obj, {
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
    }
  }, [obj]);
  useEffect(() => {
    axios.get("/cashbook/total").then((res) => {
      setCashbookSum(res.data);
    });
  }, []);

  const addComma = (num) => {
    if (num >= 1000) {
      const numAddComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return numAddComma;
    }
    return num;
  };

  const changeDate = (e) => {
    setDateRange([e.selection]);
  };

  return (
    <div className="cashbook-all-wrap">
      <div className="cashbook-title">내역</div>
      <div className="cashbook-content">
        <DateRangePicker
          onChange={changeDate}
          months={1}
          editableDateInputs={true}
          minDate={addDays(new Date(), -300)}
          maxDate={addDays(new Date(), 900)}
          direction="vertical"
          scroll={{ enabled: true }}
          ranges={dateRange}
          locale={ko}
          dateDisplayFormat="yyyy년 MMM d일"
          rangeColors={["#6a6da6", "#3ecf8e", "#fed14c"]}
          monthDisplayFormat="yyyy년 MMM"
        />
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
                  <input type="checkbox" />
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
        <input type="checkbox" />
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
