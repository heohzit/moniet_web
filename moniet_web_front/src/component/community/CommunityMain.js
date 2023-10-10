import { Route, Routes } from "react-router-dom";
import "./community.css";
import CommunityView from "./CommunityView";
import CommunityWrite from "./CommunityWrite";
import CommunityList from "./CommunityList";

const CommunityMain = (props) => {
  const isLogin = props.isLogin;

  return (
    <div className="community-all-wrap">
      <div className="community-main-top">COMMUNITY</div>
      <Routes>
        <Route path="view" element={<CommunityView isLogin={isLogin} />} />
        <Route path="write" element={<CommunityWrite />} />
        <Route path="view" element={<CommunityView />} />
        <Route path="*" element={<CommunityList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default CommunityMain;
