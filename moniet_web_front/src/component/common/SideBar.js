import { useState } from "react";
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
const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("dashboard");

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
                <Typography variant="h5" color={colors.grey[100]}>
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
                <img
                  alt="profile-user"
                  width="180px"
                  height="180px"
                  src={"../image/piggy.jpg"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography color={colors.grey[100]} sx={{ m: "10px 0 0 0" }}>
                  유저이름
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              style={{
                fontSize: "20px",
              }}
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              가계부
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
                fontSize: "20px",
              }}
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              챌린지
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
                fontSize: "20px",
              }}
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              커뮤니티
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
                fontSize: "20px",
              }}
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 0px" }}
            >
              마이페이지
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
            <Item
              title="관리자"
              to="#"
              icon={<AdminPanelSettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="로그아웃"
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
