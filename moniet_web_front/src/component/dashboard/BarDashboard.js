import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const today = new Date();
const formattedDate = `${today.getMonth() + 1}월`;
const selectDate = `${today.getMonth() + 1}`;
const options1 = {
  maxBarThickness: 40,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: formattedDate + " 의 저축",
    },
  },
};
const options2 = {
  maxBarThickness: 40,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: formattedDate + " 의 지출",
    },
  },
};
const BarDashboard = () => {
  const [month, setMonth] = useState(selectDate);
  const onChangeHanlder = (e) => {
    setMonth(e.currentTarget.value);
  };
  const months = [
    { key: 1, value: "1월" },
    { key: 2, value: "2월" },
    { key: 3, value: "3월" },
    { key: 4, value: "4월" },
    { key: 5, value: "5월" },
    { key: 6, value: "6월" },
    { key: 7, value: "7월" },
    { key: 8, value: "8월" },
    { key: 9, value: "9월" },
    { key: 10, value: "10월" },
    { key: 11, value: "11월" },
    { key: 12, value: "12월" },
  ];
  const [spendingBar, setSpendingBar] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
      },
    ],
  });
  const [incomeBar, setIncomBar] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
      },
    ],
  });
  const cashbook = {
    month: month,
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/dashboard/bar", cashbook, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIncomBar({
          labels: res.data.incomeBar.map((item) => item.categoryTitle),
          datasets: [
            {
              label: "합계",
              data: res.data.incomeBar.map((item) => item.cashbookMoney),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
              ],
            },
          ],
        });
        setSpendingBar({
          labels: res.data.spendingBar.map((item) => item.categoryTitle),
          datasets: [
            {
              label: "합계",
              data: res.data.spendingBar.map((item) => item.cashbookMoney),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(201, 203, 207,0.5)",
              ],
            },
          ],
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [month]);
  return (
    <div className="dashboard-content">
      <select defaultValue={month} onChange={onChangeHanlder}>
        {months.map((item, index) => (
          <option key={item.key} value={item.key} selected>
            {item.value}
          </option>
        ))}
      </select>
      <div className="dashboard1">
        <Bar options={options1} data={incomeBar} />
      </div>
      <div className="dashboard2">
        <Bar options={options2} data={spendingBar} />
      </div>
    </div>
  );
};
export default BarDashboard;
