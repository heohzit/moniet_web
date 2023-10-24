import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import axios from "axios";
import "../cashbook/cashbook.css";
import DateList from "./DateList";

const CashCalendar = () => {
  const [select, setSelect] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      key: "selection",
    },
  ]);
  const [cashbookList, setCashbookList] = useState([]);
  const [calendarEventArr, setCalendarEventArr] = useState([]);

  //헤더에 전월/익월 버튼누르기
  useEffect(() => {
    const prevBtn = document.querySelector("button.fc-prev-button");
    prevBtn.onclick = function () {
      const startDate = new Date(
        dateRange[0].startDate.getFullYear(),
        dateRange[0].startDate.getMonth() - 1,
        1
      );
      const endDate = new Date(
        dateRange[0].endDate.getFullYear(),
        dateRange[0].endDate.getMonth(),
        0
      );
      setDateRange([{ startDate: startDate, endDate: endDate }]);
      setSelect(!select);
    };
    const nextBtn = document.querySelector("button.fc-next-button");
    nextBtn.onclick = function () {
      const startDate = new Date(
        dateRange[0].startDate.getFullYear(),
        dateRange[0].startDate.getMonth() + 1,
        1
      );
      const endDate = new Date(
        dateRange[0].endDate.getFullYear(),
        dateRange[0].endDate.getMonth() + 2,
        0
      );
      setDateRange([{ startDate: startDate, endDate: endDate }]);
      setSelect(!select);
    };
  });

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
  const token = window.localStorage.getItem("token");
  useEffect(() => {
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
        //console.log(res);
      });
  }, [select]);

  useEffect(() => {
    axios
      .post("/cashbook/calList", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCalendarEventArr(res.data.calList);
      })
      .catch((res) => {
        //console.log(res);
      });
  }, [select]);

  const [info, setInfo] = useState([]);

  //리스트용모달추가
  const [isListOpen, setIsListOpen] = useState(false);
  const onClickButton2 = (info) => {
    setIsListOpen(true);
    setDatePick(dateString(info.date));
    setInfo(info);
  };

  const [datePick, setDatePick] = useState("");

  return (
    <div id="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={"ko"}
        events={calendarEventArr}
        eventBackgroundColor="transparent"
        eventTextColor="#323673"
        eventBorderColor="transparent"
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        fixedWeekCount={false}
        height={700}
        dateClick={onClickButton2}
        defaultAllDay={true}
      />

      {isListOpen && (
        <DateList
          info={info}
          setInfo={setInfo}
          //listOpen={listOpen}
          //closeListFrm={closeListFrm}
          onClose={() => {
            setIsListOpen(false);
          }}
          datePick={datePick}
          setDatePick={setDatePick}
          calendarEventArr={calendarEventArr}
          dateString={dateString}
          select={select}
          setSelect={setSelect}
        />
      )}
    </div>
  );
};

export default CashCalendar;
