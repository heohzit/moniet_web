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
        console.log(res);
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
        console.log(res);
      });
  }, [select]);

  const [info, setInfo] = useState([]);

  //리스트 띄우는 모달
  const [listOpen, setListOpen] = useState(false);
  const listModalOpen = (info) => {
    setListOpen(true);
    setDatePick(dateString(info.date));
    console.log(info);
    setInfo(info);
  };
  const closeListFrm = (e) => {
    setListOpen(false);
    e.stopPropagation();
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
        dateClick={listModalOpen}
        defaultAllDay={true}
      />

      <DateList
        info={info}
        setInfo={setInfo}
        listOpen={listOpen}
        closeListFrm={closeListFrm}
        datePick={datePick}
        setDatePick={setDatePick}
        calendarEventArr={calendarEventArr}
      />
    </div>
  );
};

export default CashCalendar;
