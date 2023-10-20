import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import DashboardMain from "./component/dashboard/DashboardMain";
import ChallengeMain from "./component/challenge/ChallengeMain";
import CashbookMain from "./component/cashbook/CashbookMain";
import CommunityMain from "./component/community/CommunityMain";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useState, useEffect } from "react";
import MemberMain from "./component/member/MemberMain";
import Myinfo from "./component/member/Myinfo";
import AgreeBox from "./component/member/AgreeBox";
import FindPw from "./component/member/FindPw";
import FindID from "./component/member/FindID";
import CashCalendarMain from "./component/cashCalendar/CashCalendarMain";
import MemberList from "./component/member/MemberList";
import AdminCommunityList from "./component/member/AdminCommunityList";
import SideBar from "./component/common/SideBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainDash from "./component/common/MainDash";
import "./component/common/main.css";
const theme = createTheme({
  typography: {
    fontFamily: "ns-r",
  },
});

function App() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {isLogin ? (
          <>
            <SideBar isLogin={isLogin} setIsLogin={setIsLogin}></SideBar>
            <div className="App-content">
              <Routes>
                <Route
                  path="/maindash/*"
                  element={
                    <MainDash
                      isLogin={isLogin}
                      setIsLogin={setIsLogin}
                    ></MainDash>
                  }
                ></Route>
                <Route
                  path="/dashboard/*"
                  element={<DashboardMain></DashboardMain>}
                ></Route>
                <Route
                  path="/challenge/*"
                  element={<ChallengeMain />}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
                <Route
                  path="/cashbook/*"
                  element={<CashbookMain />}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
                <Route
                  path="/community/*"
                  element={
                    <CommunityMain isLogin={isLogin} setIsLogin={setIsLogin} />
                  }
                />
                <Route
                  path="/cashCalendar/*"
                  element={<CashCalendarMain />}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
                <Route
                  path="/AdminCommunityList"
                  element={<AdminCommunityList />}
                />
                <Route path="/memberlist" element={<MemberList />} />
                <Route path="/join" element={<AgreeBox />} />
                <Route path="/joinfrm" element={<Join />} />
                <Route
                  path="/login"
                  element={<Login setIsLogin={setIsLogin} />}
                />
                <Route path="/findId" element={<FindID />} />
                <Route path="/findPw" element={<FindPw />} />
                <Route
                  path="/member/myinfo"
                  element={<Myinfo isLogin={isLogin} setIsLogin={setIsLogin} />}
                />
                <Route
                  path="/member/*"
                  element={
                    <MemberMain setIsLogin={setIsLogin} isLogin={isLogin} />
                  }
                />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Main isLogin={isLogin}></Main>}></Route>
          </Routes>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
