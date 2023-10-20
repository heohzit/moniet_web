import { Route, Routes } from "react-router-dom";
import "./community.css";
import CommunityView from "./CommunityView";
import CommunityWrite from "./CommunityWrite";
import CommunityList from "./CommunityList";
import CommunityModify from "./CommunityModify";
import CommunityModifyBoard from "./CommunityModifyBoard";

const CommunityMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  return (
    <div className="community-all-wrap">
      <div className="community-main-top">COMMUNITY</div>
      <Routes>
        <Route
          path="view"
          element={<CommunityView isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        <Route
          path="write"
          element={<CommunityWrite isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        <Route
          path="modify"
          element={
            <CommunityModify isLogin={isLogin} setIsLogin={setIsLogin} />
          }
        />

        <Route
          path="modifyBoard"
          element={
            <CommunityModifyBoard isLogin={isLogin} setIsLogin={setIsLogin} />
          }
        />

        <Route path="*" element={<CommunityList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default CommunityMain;
