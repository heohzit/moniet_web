import React, { useEffect, useState } from "react";
import "./cashbook.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Button5 } from "../util/Buttons";

const Cashbook = () => {
  const [cashbookList, setCashbookList] = useState([]);
  const [cashbookSum, setCashbookSum] = useState([]);
  useEffect(() => {
    axios
      .get("/cashbook/list")
      .then((res) => {
        setCashbookList(res.data.cashbookList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
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

  const [selectDate, setSelectDate] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  return (
    <div className="cashbook-all-wrap">
      <div className="cashbook-title">내역</div>
      <div className="cashbook-content">
        <div className="cashbook-date-range">
          <img className="date-range-icon" src="/icon/left-btn.png" />

          <img className="date-range-icon" src="/icon/right-btn.png" />
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
                <td>
                  <input type="checkbox" />
                </td>
                <td>날짜</td>
                <td>자산</td>
                <td>분류</td>
                <td>금액</td>
                <td>내용</td>
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
  const [asset, setAsset] = useState([
    { 1: 현금 },
    { 2: 신용카드 },
    { 3: 체크카드 },
    { 4: 이체 },
    { 5: 기타 },
  ]);
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{cashbook.cashbookDate}</td>
      <td>{cashbook.cashbookAsset}</td>
      <td>{cashbook.cashbookCategory}</td>
      <td>{cashbook.cashbookMoney}</td>
      <td>{cashbook.cashbookContent}</td>
    </tr>
  );
};
export default Cashbook;
