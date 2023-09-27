import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import Dashboard from "./component/dashboard/Dashboard";
import Challenge from "./component/challenge/Challenge";
import Cashbook from "./component/cashbook/Cashbook";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Link to="/cashbook" title="cashbook">
        {/*사이드메뉴생기면 삭제 예정 */}
        <span>일단 캐시북</span>
      </Link>

      <div className="App-content">
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/challenge" element={<Challenge></Challenge>}></Route>
          <Route path="/cashbook/*" element={<Cashbook />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
