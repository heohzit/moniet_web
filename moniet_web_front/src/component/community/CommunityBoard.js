import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import CommunityBoardComment from "./CommunityBoardComment";
import Swal from "sweetalert2";

const CommunityBoard = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  const communityNo = props.communityNo;
  const [communityBoardList, setCommunityBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/community/communityBoardList/" + reqPage + "/" + communityNo)
      .then((res) => {
        console.log(res.data);
        setCommunityBoardList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="community-view-board">
      {communityBoardList.map((board, index) => {
        return (
          <CommunityBoardItem
            key={"board" + index}
            board={board}
            index={index}
            member={member}
            communityBoardNo={board.communityBoardNo}
          />
        );
      })}
    </div>
  );
};

const CommunityBoardItem = (props) => {
  const member = props.member;
  const board = props.board;
  const index = props.index;
  const navigate = useNavigate();
  const isLogin = props.isLogin;

  const [like, setLike] = useState(false);

  const BoardLike = () => {
    const communityBoardNo = props.communityBoardNo;

    useEffect(() => {
      axios
        .get("/community/boardLike/" + communityBoardNo)
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });

      const likeBtn = document.querySelectorAll(
        ".board-item-like-icon > .thumb_up"
      )[index];

      likeBtn.classList.toggle("thumb_up2");
    }, []);

    /* 따봉 클릭했을 때 위에서 클라스 토글 한번 돌고,
      여기서 axios로 추가하면 되는지,

      if문 사용해서 isLike 구현해야하는지..
      todolist했던거 생각해보고 생각안나면 강사님 여쭤보기
      
    */
  };

  const ToggleComment = () => {
    const boardCommentContent = document.querySelectorAll(
      ".board-item-comment-wrap"
    )[index];

    const commentBtn = document.querySelectorAll(
      ".board-item-like-icon > .chat"
    )[index];

    boardCommentContent.classList.toggle("showClass");
    commentBtn.classList.toggle("chat2");
  };

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
            {member && member.memberNo == board.communityBoardWriter ? (
              <>
                <div className="board-item-update">
                  <span class="material-icons">settings</span>
                </div>
                <div className="board-item-delete">
                  <span class="material-icons">clear</span>
                </div>
              </>
            ) : (
              ""
            )}
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
            <div className="board-item-like-text">
              {board.communityBoardLike}명이 공감했어요.
            </div>
            <div className="board-item-like-icon">
              <span className="material-icons thumb_up" onClick={BoardLike}>
                thumb_up
              </span>
              <span className="material-icons chat" onClick={ToggleComment}>
                chat
              </span>

              <span className="chat-count">{board.comuBoardCommentCount}</span>
            </div>
          </div>
          <div className="board-item-comment-wrap">
            <CommunityBoardComment
              communityBoardNo={board.communityBoardNo}
              isLogin={isLogin}
              index={index}
              member={member}
            />
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
