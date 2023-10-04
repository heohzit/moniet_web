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

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="App">
      <Header></Header>

      <div className="App-content">
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/challenge/*"
            element={<ChallengeMain></ChallengeMain>}
          />
          <Route path="/cashbook/*" element={<Cashbook />} />
          <Route
            path="/community/*"
            element={<CommunityMain />}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
