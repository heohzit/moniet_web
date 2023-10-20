import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";
import CommunityBoardCommentWrite from "./CommunityBoardCommentWrite";
import RecommentWrite from "./RecommentWrite";
import RecommentList from "./RecommentList";

const CommunityBoardComment = (props) => {
  const comuBoardCommentCount = props.comuBoardCommentCount;
  const member = props.member;
  const index = props.index;
  const isLogin = props.isLogin;
  const communityBoardNo = props.communityBoardNo;
  // const [renderingComment, setRenderingComment] = useState(false);
  const renderingBoard = props.renderingBoard;
  const setRenderingBoard = props.setRenderingBoard;
  const isParti = props.isParti;
  const community = props.community;
  const renderingComment = props.renderingComment;
  const setRenderingComment = props.setRenderingComment;

  const [boardCommentList, setBoardCommentList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [renderingRecomment, setRenderingRecomment] = useState(false);

  useEffect(() => {
    axios
      .get("/community/boardCommentList/" + reqPage + "/" + communityBoardNo)
      .then((res) => {
        setBoardCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [renderingComment]);

  console.log(member);

  return (
    <div className="board-item-comment">
      <div className="board-item-comment-arrow">
        <span className="material-symbols-outlined arrow-right">
          subdirectory_arrow_right
        </span>
      </div>

      {isParti === 0 && member.memberNo != community.communityWriter ? (
        <span className="warningMsg">커뮤니티 참여 후 이용가능합니다.</span>
      ) : (
        <>
          <div className="board-item-comment-write-wrap">
            <CommunityBoardCommentWrite
              communityBoardNo={communityBoardNo}
              index={index}
              renderingComment={renderingComment}
              setRenderingComment={setRenderingComment}
              renderingBoard={renderingBoard}
              setRenderingBoard={setRenderingBoard}
            />
          </div>
        </>
      )}

      <div className="board-item-comment-list-wrap">
        {boardCommentList.map((comment, indexComment) => {
          return (
            <CommentItem
              key={"comment" + index}
              comment={comment}
              indexComment={indexComment}
              index={index}
              member={member}
              renderingComment={renderingComment}
              setRenderingComment={setRenderingComment}
              renderingRecomment={renderingRecomment}
              setRenderingRecomment={setRenderingRecomment}
              isParti={isParti}
              community={community}
              renderingBoard={renderingBoard}
              setRenderingBoard={setRenderingBoard}
              boardCommentList={boardCommentList}
              setBoardCommentList={setBoardCommentList}
            />
          );
        })}
        {/* {boardCommentList.map((item, index) => {
          return <div key={"test" + index}>{item.comuBoardCommentContent}</div>;
        })} */}
      </div>
    </div>
  );
};

// const CommunityBoardCommentWrite = (props) => {
//   const communityBoardNo = props.communityBoardNo;

//   const insertComment = () => {
//     const boardCommentContent = document.querySelector(
//       ".comment-write-textareat-text"
//     ).value;

//     console.log(communityBoardNo);
//     console.log(boardCommentContent);

//     if (boardCommentContent !== "") {
//       Swal.fire({
//         icon: "question",
//         text: "게시글을 작성하시겠습니까?",
//         showCancelButton: true,
//         confirmButtonText: "확인",
//         cancelButtonText: "취소",
//       }).then((res) => {
//         if (res.isConfirmed) {
//           const form = new FormData();
//           form.append("comuBoardRef", communityBoardNo);
//           form.append("comuBoardCommentContent", boardCommentContent);
//           const token = window.localStorage.getItem("token");

//           axios
//             .post("community/insertBoardComment", form, {
//               headers: {
//                 contentType: "multipart/form-data",
//                 processdData: false,
//                 Authorization: "Bearer " + token,
//               },
//             })
//             .then((res) => {
//               console.log(res.data);
//             })
//             .catch((res) => {
//               console.log(res.response.status);
//             });
//         }
//       });
//     } else {
//       Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
//     }

//   };

//   return (
//     <div className="comment-write-wrap">
//       <div className="comment-write">
//         <div className="comment-write-textarea">
//           <textarea className="comment-write-textareat-text"></textarea>
//         </div>
//         <div className="comment-write-btn">
//           <Button1 text="등록하기" clickEvent={insertComment} />
//         </div>
//       </div>
//     </div>
//   );
// };

const CommentItem = (props) => {
  const navigate = useNavigate();

  const index = props.index;
  const comment = props.comment;
  const member = props.member;
  const indexComment = props.indexComment;
  const renderingComment = props.renderingComment;
  const setRenderingComment = props.setRenderingComment;
  const renderingRecomment = props.renderingRecomment;
  const setRenderingRecomment = props.setRenderingRecomment;
  const isParti = props.isParti;
  const community = props.community;
  const renderingBoard = props.renderingBoard;
  const setRenderingBoard = props.setRenderingBoard;
  const boardCommentList = props.boardCommentList;
  const setBoardCommentList = props.setBoardCommentList;

  const ToggleRecomment = () => {
    const recommentBtn = document.querySelectorAll(
      ".comment-recomment-write-wrap"
    )[(index, indexComment)];

    const selectComment = document.querySelector(
      "#i" + index + "ic" + indexComment
    );

    // recommentBtn.classList.toggle("showClass");
    selectComment.classList.toggle("showClass"); // 쿼리셀렉터로 id로 불러오고 걔한테 toggle주면 되는거 아닌가?
  };

  // console.log(comment);

  const updateComment = () => {
    Swal.fire({
      icon: "warning",
      text: "댓글을 수정하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        // 수정하시겠습니까? 확인 누르면 textarea로 바뀌면서 수정하는 법
        // const commentContent = document.querySelector(
        //   ".board-item-comment-list > .comment-content"
        // )[(index, indexComment)];
        // commentContent.value = "";
      } else {
        return;
      }
    });
  };

  const deleteComment = () => {
    Swal.fire({
      icon: "warning",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/community/removeComment/" + comment.comuBoardCommentNo)
          .then((res) => {
            setBoardCommentList([]);
            setRenderingComment(!renderingComment);
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      } else {
        return;
      }
    });
  };

  return (
    <div className="board-item-comment-list">
      <div className="comment-profile">
        <div className="comment-account">
          <span class="material-icons">account_circle</span>
        </div>
        <div className="comment-writer">{comment.memberId}</div>
        <div className="comment-date">{comment.comuBoardCommentDate}</div>

        {isParti === 0 && member.memberNo != community.communityWriter ? (
          ""
        ) : (
          <>
            <div className="comment-recomment-btn" onClick={ToggleRecomment}>
              답글달기
            </div>
            {member && member.memberNo == comment.comuBoardCommentWriter ? (
              <>
                {/* <div className="comment-update" onClick={updateComment}>
                  수정
                </div> */}
                <div className="comment-delete" onClick={deleteComment}>
                  삭제
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className="comment-content">{comment.comuBoardCommentContent}</div>
      <div className="comment-recomment-wrap">
        {/* <div className="comment-recomment-arrow">
          <span className="material-symbols-outlined arrow-right">
            subdirectory_arrow_right
          </span>
        </div> */}
        <RecommentWrite
          communityBoardNo={comment.comuBoardRef}
          comuBoardCommentNo={comment.comuBoardCommentNo}
          index={index}
          indexComment={indexComment}
          member={member}
          renderingRecomment={renderingRecomment}
          setRenderingRecomment={setRenderingRecomment}
          isParti={isParti}
          community={community}
          renderingBoard={renderingBoard}
          setRenderingBoard={setRenderingBoard}
        />
        <RecommentList
          communityBoardNo={comment.comuBoardRef}
          comuBoardCommentNo={comment.comuBoardCommentNo}
          index={index}
          member={member}
          renderingRecomment={renderingRecomment}
          setRenderingRecomment={setRenderingRecomment}
          isParti={isParti}
          community={community}
          renderingBoard={renderingBoard}
          setRenderingBoard={setRenderingBoard}
        />
      </div>
    </div>
  );
};

export default CommunityBoardComment;
