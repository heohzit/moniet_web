import { useState } from "react";
import CashbookFrm from "./CashbookFrm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CashbookWrite = (props) => {
  const isOpen = props.isOpen;
  const addFrmOpen = props.addFrmOpen;
  const closeFrm = props.closeFrm;
  const dateString = props.dateString;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const select = props.select;
  const setSelect = props.setSelect;
  const [cashbookFinance, setCashbookFinance] = useState(0);
  const [cashbookDate, setCashbookDate] = useState(new Date());
  const [cashbookLoop, setCashbookLoop] = useState(0);
  const [loopMonth, setLoopMonth] = useState(0);
  const [cashbookAsset, setCashbookAsset] = useState(1);
  const [cashbookCategory, setCashbookCategory] = useState(11);
  const [cashbookMoney, setCashbookMoney] = useState(0);
  const [cashbookContent, setCashbookContent] = useState("");
  const [cashbookMemo, setCashbookMemo] = useState("");

  const write = () => {
    {
      /*
    console.log(cashbookFinance);
    console.log(dateString(cashbookDate)); //string
    console.log(cashbookLoop);
    console.log(loopMonth);
    console.log(cashbookAsset);
    console.log(cashbookCategory);
    console.log(cashbookMoney);
    console.log(cashbookContent);
    console.log(cashbookMemo);
 */
    }
    const token = window.localStorage.getItem("token");
    const cashbook = {
      cashbookFinance: cashbookFinance,
      cashbookDate: dateString(cashbookDate),
      cashbookLoop: cashbookLoop,
      loopMonth: loopMonth,
      cashbookAsset: cashbookAsset,
      cashbookCategory: cashbookCategory,
      cashbookMoney: cashbookMoney,
      cashbookContent: cashbookContent,
      cashbookMemo: cashbookMemo,
    };
    axios
      .post("/cashbook/insert", cashbook, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          closeFrm();
          setSelect(!select);
        } else {
          console.log("등록 중 에러 발생");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <div className="add-btn">
      <img src="icon/add-btn.png" alt="add" onClick={isOpen} />
      <CashbookFrm
        isOpen={addFrmOpen}
        closeFrm={closeFrm}
        title={"입력"}
        dateString={dateString}
        cashbookFinance={cashbookFinance}
        setCashbookFinance={setCashbookFinance}
        cashbookDate={cashbookDate}
        setCashbookDate={setCashbookDate}
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
        incomeCate={incomeCate}
        spendingCate={spendingCate}
        clickEvent={write}
      />
    </div>
  );
};

export default CashbookWrite;
