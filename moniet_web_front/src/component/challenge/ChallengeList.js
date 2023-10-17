import { Button3 } from "../util/Buttons";
import React from "react";
import { useNavigate } from "react-router-dom";
import IngChallenge from "./IngChallenge";
import EndChallenge from "./EndChallenge";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

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
    <div className="challengeList-wrap">
      <ChallengeMenu menus={menus} setMenus={setMenus}></ChallengeMenu>
      <div className="challengeList-top">
        <img src="../image/IMG_0610.jpg"></img>
        <div>
          <p className="title">MONEY CHALLENGE</p>
          <h3>머니챌린지에 도전해보세요.</h3>
          <p>성공시 챌린지 레벨이 올라가요!</p>
        </div>
        <div className="challenge-write-btn">
          <Button3 text="머니챌린지 도전" clickEvent={write}></Button3>
        </div>
        <ChallengeLevel />
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
//챌린지 레벨 조회
const ChallengeLevel = () => {
  const token = window.localStorage.getItem("token");
  const [challengeLevel, setChallengeLevel] = useState("");
  useEffect(() => {
    axios
      .post("/challenge/challengeLevel", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setChallengeLevel(res.data);
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="challenge-level">
      <p>나의 챌린지 레벨은 {challengeLevel}입니다.</p>
      <div style={{ width: 200, height: 200 }}>
        <LinearProgress
          variant="determinate"
          value={challengeLevel}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default ChallengeList;
