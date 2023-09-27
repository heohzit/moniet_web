import { useEffect, useState } from "react";
import "./cashbook.css";
import axios from "axios";
const Cashbook = () => {
  const [cashbookList, setCashbookList] = useState([]);
  useEffect(() => {
    axios
      .get("/cashbook/list")
      .then((res) => {
        setCashbookList(res.data.cashbookList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  });
  return (
    <div className="cashbook-all-wrap">
      <div className="cashbook-title">내역</div>
    </div>
  );
};

export default Cashbook;
