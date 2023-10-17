import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SavingsIcon from "@mui/icons-material/Savings";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";

const Item = ({ title, icon, selected, setSelected, component }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{}}
      onClick={() => setSelected(title)}
      icon={icon}
      component={component}
      title={title}
    >
      {title}
    </MenuItem>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Sidebar collapsed={isCollapsed}>
      <MenuOutlinedIcon onClick={() => setIsCollapsed(!isCollapsed)} />
      <Menu>
        <Item
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          component={<Link to="/dashboard" />}
          title={"대시보드"}
        />
        <SubMenu label="가계부">
          <Item
            icon={<TrendingUpIcon />}
            selected={selected}
            setSelected={setSelected}
            component={<Link to="/cashbook" />}
            title={"내역"}
          />
          <Item
            icon={<TrendingUpIcon />}
            selected={selected}
            setSelected={setSelected}
            component={<Link to="/cashCalendar" />}
            title={"달력"}
          />
        </SubMenu>
        <Item
          icon={<SavingsIcon />}
          selected={selected}
          setSelected={setSelected}
          component={<Link to="/challenge" />}
          title={"챌린지"}
        />
        <Item
          icon={<SavingsIcon />}
          selected={selected}
          setSelected={setSelected}
          component={<Link to="/community" />}
          title={"커뮤니티"}
        />
        <SubMenu label="마이페이지">
          <Item
            icon={<SavingsIcon />}
            selected={selected}
            setSelected={setSelected}
            component={<Link to="/member/mypage" />}
            title={"마이페이지"}
          />
          <Item
            icon={<SavingsIcon />}
            selected={selected}
            setSelected={setSelected}
            component={<Link to="/member/like" />}
            title={"찜"}
          />
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};
export default SideBar;
