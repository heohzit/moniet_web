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
import axios from "axios";
const tokens = () => ({
  grey: {
    300: "#fff",
  },
  primary: {
    400: "#fff",
  },
});

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        style={{
          color: "#fff",
          backgroundColor: "#010440",
          fontWeight: "900",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
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
        <Menu iconShape="square" style={{ backgroundColor: "#010440" }}>
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
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {memberImg === null ? (
                  <img
                    alt="profile-user"
                    width="210px"
                    height="180px"
                    src="./image/piggy.jpg"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    width="210px"
                    height="180px"
                    src={"/member/" + memberImg}
                    style={{ borderRadius: "50%" }}
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
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                ACCOUNT BOOK
              </Typography>
              <Item
                title="Statements"
                to="/cashbook"
                icon={<AddCardIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Calendar"
                to="/cashCalendar"
                icon={<CalendarMonthIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                style={{
                  fontSize: "17px",
                }}
                variant="h6"
                color={colors.grey[300]}
              >
                CHARTS
              </Typography>
              <Item
                title="Bar Chart"
                to="/dashboard/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/dashboard/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                style={{
                  fontSize: "17px",
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
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 10px" }}
              ></Typography>
              <Typography
                style={{
                  fontSize: "17px",
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
                title="참여 목록"
                to="/member/mypage"
                icon={<FavoriteIcon />}
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
