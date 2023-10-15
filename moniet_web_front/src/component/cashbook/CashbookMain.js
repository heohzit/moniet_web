import { Route, Routes } from "react-router-dom";
import Cashbook from "./Cashbook";
import CashbookWrite from "./CashbookWrite";
import CashbookView from "./CashbookView";

const CashbookMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="cashbook-all-wrap">
      <div className="cashbook-title">내역</div>
      <Routes>
        <Route path="write" element={<CashbookWrite />} />
        <Route path="view" element={<CashbookView />} />
        <Route
          path="*"
          element={
            <Cashbook isLogin={isLogin} setIsLogin={setIsLogin}></Cashbook>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default CashbookMain;
