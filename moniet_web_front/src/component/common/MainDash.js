import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";

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
  redAccent: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  },
  blueAccent: {
    100: "#151632",
    200: "#2a2d64",
    300: "#3e4396",
    400: "#535ac8",
    500: "#6870fa",
    600: "#868dfb",
    700: "#a4a9fc",
    800: "#c3c6fd",
    900: "#e1e2fe",
  },
});

const MainDash = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    아이디어 없음
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    $58,373,698
                  </Typography>
                </Box>
                <Box>
                  <IconButton></IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0"></Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                오늘의 수입
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  {todayIncome.toLocaleString()}원
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                오늘의 지출
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  {todaySpending.toLocaleString()}원
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]} padding="30px">
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                인기 커뮤니티
              </Typography>
              <Box height="200px"></Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDash;
