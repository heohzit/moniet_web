import { Button3 } from "../util/Buttons";
import React from "react";
import { useNavigate } from "react-router-dom";
import IngChallenge from "./IngChallenge";
import EndChallenge from "./EndChallenge";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ChallengeList = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  const [menus, setMenus] = useState([
    { url: "", text: "진행중인 머니챌린지", active: true },
    { url: "end", text: "종료된 머니챌린지", active: false },
  ]);
  return (
    <div>
      <ChallengeMenu menus={menus} setMenus={setMenus}></ChallengeMenu>
      <div className="board-write-btn">
        <Button3 text="머니챌린지 도전" clickEvent={write}></Button3>
      </div>
      <Routes>
        <Route
          path="*"
          element={<IngChallenge setIsLogin={setIsLogin}></IngChallenge>}
        ></Route>
        <Route path="end" element={<EndChallenge></EndChallenge>}></Route>
      </Routes>
    </div>
  );
};

const ChallengeMenu = (props) => {
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

export default ChallengeList;
