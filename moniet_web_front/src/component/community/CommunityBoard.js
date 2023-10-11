import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";

const CommunityBoard = (props) => {
  const communityNo = props.communityNo;
  const [communityBoardList, setCommunityBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/community/communityBoardList/" + reqPage + "/" + communityNo)
      .then((res) => {
        setCommunityBoardList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  console.log(communityBoardList);

  return (
    <div className="community-view-board">
      {communityBoardList.map((board, index) => {
        return <CommunityBoardItem key={"board" + index} board={board} />;
      })}
    </div>
  );
};

const CommunityBoardItem = (props) => {
  const board = props.board;
  const navigate = useNavigate();

  return (
    <>
      <div className="board-item">
        <div className="board-item-info">
          <div className="board-item-type">게시물 구분</div>

          <div className="board-item-profile">
            <div className="board-item-account">
              <span class="material-icons">account_circle</span>
            </div>
            <div className="board-item-profileInfo">
              <div className="board-item-writer">{board.memberId}</div>
              <div className="board-item-date">{board.communityBoardDate}</div>
            </div>
          </div>

          <div className="board-item-content">
            {board.communityBoardContent}
          </div>
          <div className="board-item-img">게시물 이미지</div>
          <div className="board-item-like">게시물 공감수</div>
          <div className="board-item-comment"></div>
        </div>
      </div>
    </>
  );
};

export default CommunityBoard;
