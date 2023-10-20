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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./challenge.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "rgb(25, 118, 210)",
    },
  },
});

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
        <div className="challenge-top-img">
          <img src="../image/IMG_0610.jpg"></img>
        </div>
        <div className="challenge-top-ment">
          <p className="title">MONEY CHALLENGE</p>
          <br></br>
          <h2>머니챌린지에 도전해보세요.</h2>
          <p>
            성공시 챌린지 <strong className="strong">레벨</strong>이 올라가요!
          </p>
          <br></br>
          <div className="challenge-write-btn">
            <Button3 text="머니챌린지 도전" clickEvent={write}></Button3>
          </div>
          <br></br>
          <ChallengeLevel />
        </div>
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
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="challenge-level">
      <br></br>
      <p>
        현재 나의 챌린지 레벨은
        <strong> {challengeLevel}</strong>입니다.
      </p>
      <ThemeProvider theme={theme}>
        <LinearProgress
          color="secondary"
          theme={theme}
          variant="determinate"
          value={challengeLevel}
          min={0}
          max={100}
          style={{
            margin: "0 auto",
            width: "350px",
            height: "40px",
            borderRadius: "5px",
            backgroundColor: "#eee",
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default ChallengeList;
