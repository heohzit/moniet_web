import { Route, Routes } from "react-router-dom";
import "./community.css";
import CommunityView from "./CommunityView";
import CommunityWrite from "./CommunityWrite";
import CommunityList from "./CommunityList";

const CommunityMain = () => {
  return (
    <div className="community-all-wrap">
      <div className="community-title">커뮤니티</div>
      <Routes>
        <Route path="write" element={<CommunityWrite />} />
        <Route path="view" element={<CommunityView />} />
        <Route path="*" element={<CommunityList />} />
      </Routes>
    </div>
  );
};

export default CommunityMain;
