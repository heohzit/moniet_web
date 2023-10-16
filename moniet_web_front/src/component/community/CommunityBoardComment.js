import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";
import CommunityBoardCommentWrite from "./CommunityBoardCommentWrite";

const CommunityBoardComment = (props) => {
  const index = props.index;
  const isLogin = props.isLogin;
  const [boardCommentList, setBoardCommentList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const communityBoardNo = props.communityBoardNo;

  useEffect(() => {
    axios
      .get("/community/boardCommentList/" + reqPage + "/" + communityBoardNo)
      .then((res) => {
        console.log(res.data);
        setBoardCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="board-item-comment">
      <div className="board-item-comment-arrow">
        <span className="material-symbols-outlined arrow-right">
          subdirectory_arrow_right
        </span>
      </div>
      <div className="board-item-comment-write-wrap">
        <CommunityBoardCommentWrite
          communityBoardNo={communityBoardNo}
          index={index}
        />
      </div>
      <div className="board-item-comment-list-wrap">
        {boardCommentList.map((comment, index) => {
          return <CommentItem key={"comment" + index} comment={comment} />;
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
  const comment = props.comment;
  const navigate = useNavigate();

  return (
    <div className="board-item-comment-list">
      <div className="comment-profile">
        <div className="comment-account">
          <span class="material-icons">account_circle</span>
        </div>
        <div className="comment-writer">{comment.memberId}</div>
        <div className="comment-date">{comment.comuBoardCommentDate}</div>
      </div>
      <div className="comment-content">{comment.comuBoardCommentContent}</div>
    </div>
  );
};

export default CommunityBoardComment;