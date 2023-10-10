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
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "지출 카테고리별",
    },
  },
  scales: {
    y: {
      grid: {
        drawBorder: false,
        color: function () {
          return "#D3D3D3";
        },
      },

      ticks: {
        color: "#D3D3D3",
        font: {
          color: "#D3D3D3",
        },
      },
    },
    x: {
      ticks: {
        color: "#808080",
        font: {
          color: "#D3D3D3",
        },
      },
      grid: {
        drawBorder: false,
        color: function () {
          return "#D3D3D3";
        },
      },
    },
  },
};

const BarDashboard = () => {
  const [data, setData] = useState({
    labels: ["지출1", "지출2", "지출3", "지출4", "지출5", "지출6"],
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
        console.log(res.data);
        setData({
          labels: ["지출1", "지출2", "지출3", "지출4", "지출5", "지출6"],
          datasets: [
            {
              label: "비율",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
              ],
              borderColor: [
                "rgb(255, 99, 132,1.5)",
                "rgba(54, 162, 235, 1.5)",
                "rgba(255, 206, 86, 1.5)",
                "rgba(75, 192, 192, 1.5)",
                "rgba(153, 102, 255, 1.5)",
                "rgba(255, 159, 64, 1.5)",
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
      <Bar options={options} data={data} />
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarDashboard;
