import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import CommunityBoardComment from "./CommunityBoardComment";

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
          <div className="board-item-type">
            {board.communityBoardTypeList
              ? board.communityBoardTypeList.map((types, index) => {
                  return <BoardTypesItem key={"types" + index} types={types} />;
                })
              : ""}
          </div>
          <div className="board-item-profile">
            <div className="board-item-account">
              <span class="material-icons">account_circle</span>
            </div>
            <div className="board-item-profileInfo">
              <div className="board-item-writer">{board.memberId}</div>
              <div className="board-item-date">{board.communityBoardDate}</div>
            </div>
          </div>
          <div
            className="board-item-content ql-editor"
            dangerouslySetInnerHTML={{ __html: board.communityBoardContent }}
          ></div>
          <div className="board-item-img-wrap">
            <div className="board-item-img-list">
              {board.fileList
                ? board.fileList.map((file, index) => {
                    return <FileItem key={"file" + index} file={file} />;
                  })
                : ""}
            </div>
          </div>
          <div className="board-item-like">
            <div className="board-item-like-text">2명이 공감했어요.</div>
            <div className="board-item-like-icon">
              <span className="material-icons thumb_up">thumb_up</span>
              <span className="material-icons chat">chat</span>
              <span className="chat-count">5</span>
            </div>
          </div>
          <div className="board-item-comment">
            <CommunityBoardComment />
          </div>
        </div>
      </div>
    </>
  );
};

const BoardTypesItem = (props) => {
  const types = props.types;

  return (
    <div className="board-types">
      <div className="board-type-name">
        {types.communityBoardTypeDiv === 1 ? (
          <span className="keyword2 key-1">가입인사</span>
        ) : types.communityBoardTypeDiv === 2 ? (
          <span className="keyword2 key-2">질문</span>
        ) : types.communityBoardTypeDiv === 3 ? (
          <span className="keyword2 key-3">꿀팁</span>
        ) : (
          <span className="keyword2 key-4">잡담</span>
        )}
      </div>
    </div>
  );
};

const FileItem = (props) => {
  const file = props.file;

  return (
    <div className="board-item-img">
      <img src={"/community/" + file.filepath} />
    </div>
  );
};

export default CommunityBoard;
