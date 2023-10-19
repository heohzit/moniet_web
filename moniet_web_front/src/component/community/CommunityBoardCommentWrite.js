import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const CommunityBoardCommentWrite = (props) => {
  const index = props.index;
  const communityBoardNo = props.communityBoardNo;
  const renderingComment = props.renderingComment;
  const setRenderingComment = props.setRenderingComment;
  const navigate = useNavigate();

  const insertComment = () => {
    const boardCommentContent = document.querySelectorAll(
      ".comment-write-textareat-text"
    )[index].value;

    if (boardCommentContent !== "") {
      Swal.fire({
        icon: "question",
        text: "댓글을 작성하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const form = new FormData();
          form.append("comuBoardRef", communityBoardNo);
          form.append("comuBoardCommentContent", boardCommentContent);
          const token = window.localStorage.getItem("token");

          axios
            .post("/community/insertBoardComment", form, {
              headers: {
                contentType: "multipart/form-data",
                processdData: false,
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data > 0) {
                Swal.fire(
                  "작성 완료",
                  "댓글 작성이 완료되었습니다.",
                  "success"
                );
                setRenderingComment(!renderingComment);
              }
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        } else {
          return;
        }
      });
    } else {
      Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
    }
  };

  //   const insertComment = () => {
  //     const boardCommentContent = document.querySelectorAll(
  //       ".comment-write-textareat-text"
  //     )[index].value;

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
  //             .post("/community/insertBoardComment", form, {
  //               headers: {
  //                 contentType: "multipart/form-data",
  //                 processdData: false,
  //                 Authorization: "Bearer " + token,
  //               },
  //             })
  //             .then((res) => {
  //               console.log(res.data);
  //               if (res.data > 0) {
  //                 Swal.fire(
  //                   "작성 완료",
  //                   "게시글작성이 완료되었습니다.",
  //                   "success"
  //                 );
  //                 navigate("/community/view");
  //               }
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

  return (
    <div className="comment-write-wrap">
      <div className="comment-write">
        <div className="comment-write-textarea">
          <textarea className="comment-write-textareat-text"></textarea>
        </div>
        <div className="comment-write-btn">
          <Button1 text="등록하기" clickEvent={insertComment} />
        </div>
      </div>
    </div>
  );
};

export default CommunityBoardCommentWrite;
