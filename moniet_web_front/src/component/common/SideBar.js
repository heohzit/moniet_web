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
  const theme = useTheme();
  return (
    <MenuItem
      active={selected === title}
      style={{}}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const logout = () => {
  localStorage.clear();
};
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
const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `!important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
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
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              가계부
            </Typography>
            <Item
              title="내역"
              to="/income"
              icon={<TrendingUpIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="달력"
              to="/spending"
              icon={<TrendingDownIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              차트
            </Typography>
            <Item
              title="차트"
              to="/bar"
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
              to="/challenge"
              icon={<SavingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}></Typography>
            <LItem
              title="로그아웃"
              onClick={() => logout()}
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
