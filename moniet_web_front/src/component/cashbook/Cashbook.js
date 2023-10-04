import React, { useEffect, useState } from "react";
import "./cashbook.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

const nameMapper = { ko: "korean" };

const Cashbook = () => {
  const [cashbookList, setCashbookList] = useState([]);
  useEffect(() => {
    axios
      .get("/cashbook/list")
      .then((res) => {
        console.log(res.data);
        setCashbookList(res.data.cashbookList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  });

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
      </div>
    </div>
  );
};

export default Cashbook;
