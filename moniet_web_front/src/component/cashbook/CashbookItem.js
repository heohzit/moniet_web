import axios from "axios";
import { useState } from "react";
import CashbookFrm from "./CashbookFrm";
import CashbookModify from "./CashbookModify";

const CashbookItem = (props) => {
  const cashbook = props.cashbook;
  const assetToString = props.assetToString;
  const selectChecked = props.selectChecked;
  const checkItems = props.checkItems;
  const dateString = props.dateString;
  const assetList = props.assetList;
  const challengeCate = props.challengeCate;
  const setChallengeCate = props.setChallengeCate;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const select = props.select;
  const setSelect = props.setSelect;

  const [addFrmOpen, setAddFrmOpen] = useState(false);

  const isOpen = () => {
    setAddFrmOpen(true);
  };
  const closeFrm = (e) => {
    setAddFrmOpen(false);
    e.stopPropagation();
  };
  const checkClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <tr className="cashbook-item" onClick={isOpen}>
        <td onClick={checkClick}>
          <input
            type="checkbox"
            className="cashbook-checkbox cash-chk"
            name="cashbookNo"
            value={cashbook.cashbookNo}
            onChange={(e) =>
              selectChecked(e.target.checked, cashbook.cashbookNo)
            }
            checked={checkItems.includes(cashbook.cashbookNo) ? true : false}
          />
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
          {cashbook.cashbookMoney.toLocaleString("ko-KR")}
        </td>
        <td className="content-text">{cashbook.cashbookContent}</td>
        <td>
          <CashbookModify
            cashbook={cashbook}
            isOpen={isOpen}
            closeFrm={closeFrm}
            title={"수정"}
            dateString={dateString}
            select={select}
            setSelect={setSelect}
            addFrmOpen={addFrmOpen}
            assetList={assetList}
            challengeCate={challengeCate}
            incomeCate={incomeCate}
            spendingCate={spendingCate}
          />
        </td>
      </tr>
    </>
  );
};

export default CashbookItem;
