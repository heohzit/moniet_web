import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const today = new Date();
const formattedDate = `${today.getMonth() + 1}월`;
const selectDate = `${today.getMonth() + 1}`;
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: formattedDate + " 수입 / 지출",
    },
  },
};

const PieDashboard = () => {
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
  const [data, setData] = useState({
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
      .post("/dashboard/pie", cashbook, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData({
          labels: ["수입", "지출"],
          datasets: [
            {
              label: "합계",
              data: res.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
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
    <div className="pieDashboard-content">
      <select defaultValue={month} onChange={onChangeHanlder}>
        {months.map((item, index) => (
          <option key={item.key} value={item.key} selected>
            {item.value}
          </option>
        ))}
      </select>
      <div className="pieDashboard">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};
export default PieDashboard;
