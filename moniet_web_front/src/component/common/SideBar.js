import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SavingsIcon from "@mui/icons-material/Savings";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: {},
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const LItem = ({ title, icon, selected, setSelected }) => {
  const navigate = useNavigate();

  return (
    <MenuItem
      onClick={() => {
        setSelected(title);
        navigate("/");
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};
const SideBar = (props) => {
  const logout = () => {
    setIsLogin(false);
    window.localStorage.removeItem("token");
  };
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `!important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: ` !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{}}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5">머니어터</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              to={"/dashboard"}
              title="Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              가계부
            </Typography>
            <Item
              title="내역"
              to="/cashbook"
              icon={<TrendingUpIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="달력"
              to="#"
              icon={<TrendingDownIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              차트
            </Typography>
            <Item
              to="/bar"
              title="차트"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              머니챌린지
            </Typography>
            <Item
              title="머니챌린지"
              to="/challenge"
              icon={<SavingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              커뮤니티
            </Typography>
            <Item
              title="커뮤니티"
              to="/community"
              icon={<SavingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              마이페이지
            </Typography>
            <Item
              title="마이페이지"
              to="/member/mypage"
              icon={<SavingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="찜목록"
              to="member/like"
              icon={<SavingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}></Typography>
            <LItem
              title="로그아웃"
              onClick={logout}
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
