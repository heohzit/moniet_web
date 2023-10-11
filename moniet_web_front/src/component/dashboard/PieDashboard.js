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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "1개월 내 수입/지출",
    },
  },
};
const PieDashboard = () => {
  const [data, setData] = useState({
    labels: ["수입", "지출"],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
      },
    ],
  });
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const dataSet1 = [];
    axios
      .post("/dashboard/pie", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData({
          labels: ["수입", "지출"],
          datasets: [
            {
              label: "금액",
              data: res.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132,1.5)",
                "rgba(54, 162, 235, 1.5)",
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
      <div>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};
export default PieDashboard;
