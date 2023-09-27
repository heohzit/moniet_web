import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Link, Route, Routes } from "react-router-dom";
import Cashbook from "./component/cashbook/Cashbook";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="content">
        <Link to="/cashbook" title="cashbook">
          {/*사이드메뉴생기면 삭제 예정 */}
          <span>일단 캐시북</span>
        </Link>
        <Routes>
          <Route path="/cashbook/*" element={<Cashbook />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
