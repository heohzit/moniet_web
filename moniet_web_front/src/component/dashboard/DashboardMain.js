import BarDashboard from "./BarDashboard";
import PieDashboard from "./PieDashboard";
import "./dashboard.css";
import { Route, Routes } from "react-router-dom";

const DashboardMain = () => {
  return (
    <div className="dashboard-wrap">
      <div className="dashboard-title">CHART</div>
      <Routes>
        <Route path="/bar" element={<BarDashboard></BarDashboard>}></Route>
        <Route path="/pie" element={<PieDashboard></PieDashboard>}></Route>
      </Routes>
    </div>
  );
};
export default DashboardMain;
