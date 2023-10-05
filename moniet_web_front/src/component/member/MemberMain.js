import axios from "axios";
import "./memberMain.css";
import { Route, useNavigate, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Myinfo from "./Myinfo";
import MemberChangePw from "./MemberChangePw";
const MemberMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        //403 : 로그인 x
        if (res.response.status === 403) {
          alert("로그인 후 이용해주세요.");
          navigate("/login");
        }
      });
  }, []);

  const [menus, setMenus] = useState([
    { url: "myInfo", text: "내 정보", active: false },
    { url: "change-password", text: "비밀번호 변경", active: false },
  ]);
  return (
    <div className="mypage-wrap">
      <div className="mypage-title">MY PAGE</div>
      <div className="my-content">
        <MysideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route
              path="info"
              element={
                <Myinfo
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="changePw" element={<MemberChangePw />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const MysideMenu = (props) => {
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
    <div className="mypage-side">
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
export { MemberMain, MysideMenu };
