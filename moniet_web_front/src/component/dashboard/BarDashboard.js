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
const options1 = {
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
const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "저축 카테고리별",
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
  const [data1, setData1] = useState({
    labels: ["지출1", "지출2", "지출3", "지출4", "지출5", "지출6"],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
      },
    ],
  });
  const [data2, setData2] = useState({
    labels: ["저축1", "저축2", "저축3", "저축4", "저축5", "저축6"],
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
        setData1({
          labels: [],
          datasets: [
            {
              label: "비율",
              data: data1,
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
      <Bar options={options1} data={data1} />
      <Bar options={options2} data={data2} />
      <PieDashboard></PieDashboard>
    </div>
  );
};
export default BarDashboard;
