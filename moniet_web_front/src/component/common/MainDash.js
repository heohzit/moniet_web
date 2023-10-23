import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const tokens = () => ({
  grey: {
    100: "#141414",
    200: "#292929",
    300: "#3d3d3d",
    400: "#525252",
    500: "#666666",
    600: "#858585",
    700: "#a3a3a3",
    800: "#c2c2c2",
    900: "#e0e0e0",
  },
  primary: {
    100: "#040509",
    200: "#080b12",
    300: "#0c101b",
    400: "#f2f0f0", // manually changed
    500: "#141b2d",
    600: "#1F2A40",
    700: "#727681",
    800: "#a1a4ab",
    900: "#d0d1d5",
  },
  greenAccent: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
});
const MainDash = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //1년 차트
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const [data, setData] = useState({
    labels: [],
    datasets: [{}],
  });
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/dashboard/line", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData({
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "수입",
              data: res.data.incomeList.map((item) => item.money),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "지출",
              data: res.data.spendList.map((item) => item.money),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  //오늘의 수입
  const [todayIncome, setTodayIncome] = useState(0);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/dashboard/todayIncome", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTodayIncome(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  //오늘의 지출
  const [todaySpending, setTodaySpending] = useState(0);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/dashboard/todaySpending", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTodaySpending(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  //인기 커뮤니티
  const [firstCommunity, setFirstCommunity] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/community/firstCommunity", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFirstCommunity(res.data);
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  const communityView = () => {
    if (isLogin) {
      navigate("/community/view", {
        state: { communityNo: firstCommunity.communityNo },
      });
    } else {
      Swal.fire("이용 제한", "로그인 후 이용해주시기 바랍니다.", "info");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          xs={15}
          sm={15}
          md={11}
          lg={11}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <div className="maindashboard-title">DASHBOARD</div>
          <Grid xs={15}>
            <Box backgroundColor={colors.primary[400]} p="20px">
              <Typography variant="h5" fontWeight="600">
                2023년 한눈에 보기
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <div className="lineChart">
                  <Line data={data} options={options} />
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="20px">
              <Typography variant="h5" fontWeight="600">
                오늘의 수입
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="15px"
              >
                <Typography
                  variant="h4"
                  color="#323673"
                  fontWeight="800"
                  sx={{ mt: "15px" }}
                >
                  <CountUp end={todayIncome} />원
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="20px">
              <Typography variant="h5" fontWeight="600">
                오늘의 지출
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="15px"
              >
                <Typography
                  variant="h4"
                  color="#323673"
                  fontWeight="800"
                  sx={{ mt: "15px" }}
                >
                  <CountUp end={todaySpending} />원
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]} padding="20px">
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                인기 커뮤니티
              </Typography>
              <Box height="220px">
                <div className="community-item" onClick={communityView}>
                  <div className="community-item-img">
                    {firstCommunity.communityThumb === null ? (
                      <img src="/image/default.png" className="default-img" />
                    ) : (
                      <img
                        src={"/community/" + firstCommunity.communityThumb}
                      />
                    )}
                  </div>
                  <div className="community-item-info">
                    <div className="community-item-title">
                      {firstCommunity.communityTitle}
                    </div>
                    <div className="community-item-subtitle">
                      {firstCommunity.communitySubTitle}
                    </div>
                    <div className="community-types">
                      <div className="type-name">
                        {firstCommunity.communityType === 1 ? (
                          <span className="keyword key1">저축하기</span>
                        ) : firstCommunity.communityType === 2 ? (
                          <span className="keyword key2">지출줄이기</span>
                        ) : firstCommunity.communityType === 4 ? (
                          <span className="keyword key4">투자하기</span>
                        ) : (
                          <span className="keyword key8">기타</span>
                        )}
                      </div>
                    </div>
                    <br></br>
                    <div className="community-item-writer">
                      <span>작성자 </span>
                      {firstCommunity.memberId}
                    </div>
                    <div className="community-item-date">
                      <span>작성일 </span>
                      {firstCommunity.communityDate}
                    </div>
                    <div className="community-item-parti">
                      <span>참여인원 </span>
                      {firstCommunity.communityParti}
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDash;
