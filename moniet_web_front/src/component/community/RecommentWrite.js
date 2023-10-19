import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";
import CommunityBoardCommentWrite from "./CommunityBoardCommentWrite";

const RecommentWrite = (props) => {
  const index = props.index;
  const indexComment = props.indexComment;
  const communityBoardNo = props.communityBoardNo;
  const comuBoardCommentNo = props.comuBoardCommentNo;
  const location = useLocation();
  const renderingRecomment = props.renderingRecomment;
  const setRenderingRecomment = props.setRenderingRecomment;

  const insertRecomment = () => {
    // const recommentContent = document.querySelectorAll(
    //   ".comment-recomment-write-textareat-text"
    // )[(index, indexComment)].value;

    const recommentContent = document.querySelector(
      "#i" + index + "ic" + indexComment + " textarea"
    );

    // console.log("자식의 값 : " + recommentContent);

    // console.log("게시물 인덱스 : " + index);
    // console.log("댓글 인덱스 : " + indexComment);
    // console.log("communityBoardNo : " + communityBoardNo);
    // console.log("comuBoardCommentNo : " + comuBoardCommentNo);

    if (recommentContent !== "") {
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
          form.append("comuBoardCommentRef", comuBoardCommentNo);
          form.append("comuBoardCommentContent", recommentContent.value);
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
                recommentContent.value = "";
                setRenderingRecomment(!renderingRecomment);
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

  return (
    <div className="comment-recomment-write">
      <div
        className="comment-recomment-write-wrap"
        id={"i" + index + "ic" + indexComment}
      >
        {/* <CommunityBoardCommentWrite /> */}
        <div className="comment-recomment-write">
          <div className="comment-recomment-write-textarea">
            <textarea className="comment-recomment-write-textareat-text"></textarea>
          </div>
          <div className="comment-recomment-write-btn">
            <Button1 text="등록하기" clickEvent={insertRecomment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommentWrite;
