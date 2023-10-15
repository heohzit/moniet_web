import BarDashboard from "./BarDashboard";
import PieDashboard from "./PieDashboard";
import "./dashboard.css";
import { Route, Routes } from "react-router-dom";
import LineBarDashboard from "./LineDashboard";

const DashboardMain = () => {
  return (
    <div className="dashboard-wrap">
      <div>대시보드</div>
      <div></div>
      <Routes>
        <Route path="*" element={<BarDashboard></BarDashboard>}></Route>
        <Route path="pie" element={<PieDashboard></PieDashboard>}></Route>
      </Routes>
    </div>
  );
};
export default DashboardMain;
