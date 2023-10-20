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
    100: "#141414",
    200: "#323673",
    300: "#3d3d3d",
    400: "#525252",
    500: "#666666",
    600: "#858585",
    700: "#a3a3a3",
    800: "#c2c2c2",
    900: "#e0e0e0",
  },
  primary: {
    100: "#040509",
    200: "#080b12",
    300: "#0c101b",
    400: "#f2f0f0",
    500: "#141b2d",
    600: "#1F2A40",
    700: "#727681",
    800: "#a1a4ab",
    900: "#d0d1d5",
  },
});

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
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
      .catch((res) => {
        if (res.response.status === 403) {
          alert("로그인 후 이용해주세요.");
        }
      });
  }, []);
  const LItem = ({ title, icon, selected, setSelected }) => {
    const navigate = useNavigate();
    return (
      <MenuItem
        onClick={() => {
          setSelected(title);
          logout();
          navigate("/");
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
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
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      style={{
        position: "fixed",
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: colors.grey[100],
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
                  }}
                  variant="h5"
                  color={colors.grey[100]}
                >
                  머니어터
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
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
                <Typography color={colors.grey[100]} sx={{ m: "10px 0 0 0" }}>
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
                title="챌린지"
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
