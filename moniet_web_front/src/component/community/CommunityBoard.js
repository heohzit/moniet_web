import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";

const CommunityBoard = (props) => {
  const [communityBoardList, setCommunityBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/community/communityBoardList/" + reqPage)
      .then((res) => {
        setCommunityBoardList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  console.log("CommunityBoard.js communityBoardList : " + communityBoardList);
  return (
    <div className="community-view-board-zone">
      <div className="community-view-board">게시물</div>
    </div>
  );
};

export default CommunityBoard;
