import BarDashboard from "./BarDashboard";
import PieDashboard from "./PieDashboard";
import "./dashboard.css";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardMain = () => {
  const [menus, setMenus] = useState([
    { url: "bar", text: "바", active: true },
    { url: "pie", text: "파이", active: false },
  ]);
  return (
    <div className="dashboard-wrap">
      <DashboardMenu menus={menus} setMenus={setMenus}></DashboardMenu>
      <div>대시보드</div>
      <Routes>
        <Route path="bar" element={<BarDashboard></BarDashboard>}></Route>
        <Route path="pie" element={<PieDashboard></PieDashboard>}></Route>
      </Routes>
    </div>
  );
};
export default DashboardMain;

const DashboardMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;
  const activeTab = (index) => {
    menus.forEach((item) => {
      item.active = false;
    });
    menus[index].active = true;
    setMenus([...menus]);
  };
  return (
    <div className="challengeMenu-tab">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"menu" + index}>
              {menu.active ? (
                <Link
                  to={menu.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              ) : (
                <Link
                  to={menu.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
