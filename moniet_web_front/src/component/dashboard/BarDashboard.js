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
import PieDashboard from "./PieDashboard";

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
const options1 = {
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

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/dashboard/bar", null, {
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
  }, []);
  return (
    <div>
      <Bar options={options1} data={incomeBar} />
      <Bar options={options2} data={spendingBar} />
      <PieDashboard></PieDashboard>
    </div>
  );
};
export default BarDashboard;
