import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCardIcon from "@mui/icons-material/AddCard";
import SavingsIcon from "@mui/icons-material/Savings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FeedIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Person";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ForumIcon from "@mui/icons-material/Forum";

import axios from "axios";
const tokens = () => ({
  grey: {
    300: "#fff",
  },
  primary: {
    400: "#fff",
  },
  redAccent: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  },
  blueAccent: {
    100: "#151632",
    200: "#2a2d64",
    300: "#3e4396",
    400: "#535ac8",
    500: "#6870fa",
    600: "#868dfb",
    700: "#a4a9fc",
    800: "#c3c6fd",
    900: "#e1e2fe",
  },
  greenAccent: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
});
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  return (
    <MenuItem
      active={selected === title}
      style={{
        backgroundColor: selected === title ? "#fff" : "#010440",
        color: selected === title ? "#010440" : "#fff",
        fontWeight: "900",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to}></Link>}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};
const SideBar = (props) => {
  const [member, setMember] = useState({});
  const [memberImg, setMemberImg] = useState("");
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
        setMemberImg(res.data.imgFile);
      })
      .catch((res) => {});
  }, []);
  const LItem = ({ title, icon, selected, setSelected }) => {
    const navigate = useNavigate();
    return (
      <MenuItem
        style={{ color: "#fff", backgroundColor: "#010440" }}
        onClick={() => {
          setSelected(title);
          logout();
          navigate("/");
        }}
        icon={icon}
      >
        <Typography style={{ color: "#fff" }}>{title}</Typography>
      </MenuItem>
    );
  };
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const logout = () => {
    setIsLogin(false);
    window.localStorage.removeItem("token");
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      style={{
        position: "fixed",
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu
          iconShape="square"
          style={{ backgroundColor: "#010440", height: "1000px" }}
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: colors.grey[300],
              backgroundColor: "#010440",
            }}
          >
            {!isCollapsed && (
              <Box
                margin={"10px"}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  style={{
                    fontWeight: "900",
                    color: "#fff",
                  }}
                  variant="h5"
                >
                  머니어터
                </Typography>
                <IconButton
                  style={{
                    fontWeight: "900",
                    color: "#fff",
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                {memberImg === null ? (
                  <img
                    alt="profile-user"
                    width="220px"
                    height="170px"
                    src="./image/piggy.jpg"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    width="220px"
                    height="170px"
                    src={"/member/" + memberImg}
                    style={{ borderRadius: "50%" }}
                    alt="piggy"
                  />
                )}
              </Box>
              <Box textAlign="center">
                <Typography style={{ color: "#fff" }} sx={{ m: "10px 0 0 0" }}>
                  <strong>{member.memberId}</strong>님 환영합니다.
                </Typography>
              </Box>
            </Box>
          )}
          {member.memberGrade === 0 ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Typography
                style={{
                  fontSize: "17px",
                  display: !isCollapsed ? "block" : "none",
                }}
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 10px" }}
              >
                ADMIN
              </Typography>
              <Item
                title="회원 관리"
                to="/memberlist"
                icon={<AdminPanelSettingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="커뮤니티 관리"
                to="/adminCommunityList"
                icon={<AdminPanelSettingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <LItem
                title="로그아웃"
                onClick={() => logout()}
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/maindash"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                style={{
                  fontSize: "17px",
                  display: !isCollapsed ? "block" : "none",
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                ACCOUNT BOOK
              </Typography>
              <Item
                title="내역"
                to="/cashbook"
                icon={<AddCardIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="달력"
                to="/cashCalendar"
                icon={<CalendarMonthIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                style={{
                  fontSize: "17px",
                  display: !isCollapsed ? "block" : "none",
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                CHARTS
              </Typography>
              <Item
                title="바 차트"
                to="/dashboard/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="원형 차트"
                to="/dashboard/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                style={{
                  fontSize: "17px",
                  display: !isCollapsed ? "block" : "none",
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                CHALLENGE
              </Typography>
              <Item
                title="머니챌린지"
                to="/challenge"
                icon={<SavingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                style={{
                  fontSize: "17px",
                  display: !isCollapsed ? "block" : "none",
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                COMMUNITY
              </Typography>
              <Item
                title="커뮤니티"
                to="/community"
                icon={<FeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                style={{
                  fontSize: "17px",
                  display: !isCollapsed ? "block" : "none",
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                MY PAGE
              </Typography>
              <Item
                title="마이페이지"
                to="/member/mypage"
                icon={<PersonIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="참여 커뮤니티"
                to="/community/myCommunity"
                icon={<ForumIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="찜하기"
                to="/member/like"
                icon={<FavoriteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <LItem
                title="로그아웃"
                onClick={() => logout()}
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          )}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
