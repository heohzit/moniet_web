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
import Input from "../util/InputFrm";
import { NextMonth, PrevMonth } from "./MoveMonth";
import CashbookWrite from "./CashbookWrite";
import CashbookDel from "./CashbookDel";
import CashbookDown from "./CashbookDown";
import CashInputModal from "../cashModal/CashInputModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const listSpending = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/listSpending", obj, {
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
  };
  const listIncome = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/listIncome", obj, {
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
  };
  const listSum = () => {
    setSelect(!select);
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
  {
    /*모다루
  const [addFrmOpen, setAddFrmOpen] = useState(false);
  const isOpen = () => {
    setAddFrmOpen(true);
  };
  const closeFrm = () => {
    setAddFrmOpen(false);
  };
 */
  }

  //체크박스
  const [checkItems, setCheckItems] = useState([]);

  const selectChecked = (checked, no) => {
    if (checked) {
      setCheckItems((item) => [...item, no]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== no));
    }
  };
  const allChecked = (checked) => {
    if (checked) {
      const noArr = [];
      cashbookList.forEach((el) => noArr.push(el.cashbookNo));
      setCheckItems(noArr);
    } else {
      setCheckItems([]);
    }
  };

  //스낵바 노출용
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
            id={"showDateRange"}
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
          rangeColors={["#323673", "#3ecf8e", "#fed14c"]}
          monthDisplayFormat="yyyy년 MMM"
        />
        <div className="range-chg rdrDateRangePickerWrapper">
          <Button4 text={"apply"} clickEvent={applyDate} />
          <Button5 text={"reset"} clickEvent={resetDate} />
        </div>
      </div>

      <div className="cashbook-content">
        <div className="add-del-zone">
          <CashbookDown
            cashbookList={cashbookList}
            assetToString={assetToString}
          />
          <CashbookDel
            checkItems={checkItems}
            setCheckItems={setCheckItems}
            select={select}
            setSelect={setSelect}
          />
          <CashbookWrite
            dateString={dateString}
            assetList={assetList}
            challengeCate={challengeCate}
            setChallengeCate={setChallengeCate}
            incomeCate={incomeCate}
            spendingCate={spendingCate}
            select={select}
            setSelect={setSelect}
          />
        </div>
        <div className="cashbook-btn-zone">
          <Button5
            clickEvent={listSum}
            text={
              "합계(" +
              addComma(cashbookSum.totalCount) +
              "건) " +
              cashbookSum.total?.toLocaleString("ko-KR") +
              "원"
            }
          />
          <Button5
            clickEvent={listIncome}
            text={
              "수입(" +
              addComma(cashbookSum.countIn) +
              "건) " +
              addComma(cashbookSum.income) +
              "원"
            }
          />
          <Button5
            clickEvent={listSpending}
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
          {/**
          <CashbookTable
            cashbookList={cashbookList}
            setCashbookList={setCashbookList}
            assetList={assetList}
            incomeCate={incomeCate}
            spendingCate={spendingCate}
            assetToString={assetToString}
          />
 */}
          <table>
            <thead>
              <tr className="cashbook-tr">
                <td width={"5%"}>
                  <input
                    type="checkbox"
                    className="cashbook-checkbox"
                    id="cashAll"
                    onChange={(e) => {
                      allChecked(e.target.checked);
                    }}
                    checked={
                      checkItems.length === cashbookList.length ? true : false
                    }
                  />
                </td>
                <td width={"20%"}>날짜</td>
                <td width={"15%"}>자산</td>
                <td width={"15%"}>분류</td>
                <td width={"15%"}>금액</td>
                <td width={"30%"}>내용</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {cashbookList &&
                cashbookList.map((cashbook, index) => {
                  return (
                    <CashbookItem
                      cashbook={cashbook}
                      dateString={dateString}
                      onOpenClickHandler={onOpenClickHandler}
                      select={select}
                      setSelect={setSelect}
                      checkItems={checkItems}
                      assetToString={assetToString}
                      assetList={assetList}
                      challengeCate={challengeCate}
                      setChallengeCate={setChallengeCate}
                      incomeCate={incomeCate}
                      spendingCate={spendingCate}
                      showSnackbar={showSnackbar}
                      selectChecked={selectChecked}
                      onCloseClickHandler={onCloseClickHandler}
                      key={cashbook.cashbookNo + "item" + index}
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

export default Cashbook;

const CashbookItem = (props) => {
  const cashbook = props.cashbook;
  const dateString = props.dateString;
  const onOpenClickHandler = props.onOpenClickHandler;
  const select = props.select;
  const setSelect = props.setSelect;
  const checkItems = props.checkItems;
  const assetToString = props.assetToString;
  const assetList = props.assetList;
  const challengeCate = props.challengeCate;
  const setChallengeCate = props.setChallengeCate;
  const incomeCate = props.incomeCate;
  const spendingCate = props.spendingCate;
  const showSnackbar = props.showSnackbar;
  const selectChecked = props.selectChecked;
  const onCloseClickHandler = props.onCloseClickHandler;

  //모달추가 / 수정용
  const [isOpen1, setIsOpen1] = useState(false);
  const onClickButton1 = (e) => {
    setIsOpen1(true);
    e.stopPropagation();
    console.log(e.currentTarget);
  };

  const [cashbookNo, setCashbookNo] = useState(cashbook.cashbookNo);
  const [cashbookFinance, setCashbookFinance] = useState(
    cashbook.cashbookFinance
  );
  const [cashbookDate, setCashbookDate] = useState(
    new Date(cashbook.cashbookDate)
  );
  const [cashbookLoop, setCashbookLoop] = useState(cashbook.cashbookLoop);
  const [loopMonth, setLoopMonth] = useState(cashbook.loopMonth);
  const [cashbookAsset, setCashbookAsset] = useState(cashbook.cashbookAsset);
  const [cashbookCategory, setCashbookCategory] = useState(
    cashbook.cashbookCategory
  );
  const [cashbookMoney, setCashbookMoney] = useState(cashbook.cashbookMoney);
  const [cashbookContent, setCashbookContent] = useState(
    cashbook.cashbookContent
  );
  const [cashbookMemo, setCashbookMemo] = useState(cashbook.cashbookMemo);
  const [challengeNo, setChallengeNo] = useState(cashbook.challengeNo);

  const modify = () => {
    const token = window.localStorage.getItem("token");
    const cashbook = {
      cashbookNo: cashbookNo,
      cashbookFinance: cashbookFinance,
      cashbookDate: dateString(cashbookDate),
      cashbookLoop: cashbookLoop,
      loopMonth: loopMonth,
      cashbookAsset: cashbookAsset,
      cashbookCategory: cashbookCategory,
      cashbookMoney: cashbookMoney,
      cashbookContent: cashbookContent,
      cashbookMemo: cashbookMemo,
      challengeNo: challengeNo,
    };
    axios
      .post("/cashbook/update", cashbook, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          onOpenClickHandler();
          setIsOpen1(false);
          setSelect(!select);
        } else {
          console.log("등록 중 에러 발생");
        }
      })
      .catch((res) => {
        console.log(res.response);
      });
  };
  return (
    <tr
      className="cashbook-item"
      key={"item" + cashbook.cashbookNo}
      onClick={onClickButton1}
    >
      <td
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          type="checkbox"
          className="cashbook-checkbox cash-chk"
          name="cashbookNo"
          value={cashbook.cashbookNo}
          onChange={(e) => selectChecked(e.target.checked, cashbook.cashbookNo)}
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
      <td className="content-text">
        {cashbook.cashbookContent}
        {cashbook.cashbookLoop === 0 ? (
          ""
        ) : cashbook.cashbookLoop === 1 ? (
          ""
        ) : (
          <span className="loop-style">
            (할부 : {cashbook.loopRound} / {cashbook.loopMonth})
          </span>
        )}
      </td>
      <td>
        {isOpen1 && (
          <CashInputModal
            open={isOpen1}
            onClose={(e) => {
              console.log(22222);
              setIsOpen1(false);
              //e.stopPropagation();
              setSelect(!select);
            }}
            title={"수정"}
            dateString={dateString}
            cashbook={cashbook}
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
            assetList={assetList}
            cashbookCategory={cashbookCategory}
            setCashbookCategory={setCashbookCategory}
            cashbookMoney={cashbookMoney}
            setCashbookMoney={setCashbookMoney}
            cashbookContent={cashbookContent}
            setCashbookContent={setCashbookContent}
            cashbookMemo={cashbookMemo}
            setCashbookMemo={setCashbookMemo}
            challengeNo={challengeNo}
            setChallengeNo={setChallengeNo}
            challengeCate={challengeCate}
            setChallengeCate={setChallengeCate}
            incomeCate={incomeCate}
            spendingCate={spendingCate}
            clickEvent={modify}
            delNo={cashbookNo}
            select={select}
            setSelect={setSelect}
            key={"modal" + cashbookNo}
          />
        )}
        {showSnackbar && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open //갑자기 에러나서 open 함수 삭제함
            autoHideDuration={1000}
            onClose={onCloseClickHandler}
          >
            <Alert
              variant="filled"
              onClose={onCloseClickHandler}
              severity="success"
              sx={{
                width: "100%",
                backgroundColor: "#323673",
              }}
            >
              가계부 수정 성공!
            </Alert>
          </Snackbar>
        )}
      </td>
    </tr>
  );
};
