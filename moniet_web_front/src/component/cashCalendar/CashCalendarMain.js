import { Route, Routes } from "react-router-dom";
import CashCalendar from "./CashCalendar";

const CashCalendarMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="cashbook-all-wrap">
      <div className="cashbook-title">달력</div>
      <Routes>
        <Route
          path="*"
          element={<CashCalendar isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
      </Routes>
    </div>
  );
};

export default CashCalendarMain;
