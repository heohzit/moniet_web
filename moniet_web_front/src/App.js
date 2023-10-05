import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import Dashboard from "./component/dashboard/Dashboard";
import ChallengeMain from "./component/challenge/ChallengeMain";
import Cashbook from "./component/cashbook/Cashbook";
import CommunityMain from "./component/community/CommunityMain";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useState, useEffect } from "react";
import MemberMain from "./component/member/MemberMain";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="App">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}></Header>

      <div className="App-content">
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/challenge/*"
            element={<ChallengeMain />}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
          <Route
            path="/cashbook/*"
            element={<Cashbook />}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
          <Route
            path="/community/*"
            element={<CommunityMain />}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/member/*" element={<MemberMain />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
