import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const RecommentList = (props) => {
  const index = props.index;
  const [recommentList, setRecommentList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const communityBoardNo = props.communityBoardNo;
  const comuBoardCommentNo = props.comuBoardCommentNo;
  const member = props.member;
  const renderingRecomment = props.renderingRecomment;
  const setRenderingRecomment = props.setRenderingRecomment;

  useEffect(() => {
    axios
      .get(
        "/community/recommentList/" +
          reqPage +
          "/" +
          communityBoardNo +
          "/" +
          comuBoardCommentNo
      )
      .then((res) => {
        // console.log(res.data);
        setRecommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [renderingRecomment]);

  return (
    <>
      {recommentList.map((recomment, index) => {
        return (
          <RecommentItem
            key={"recomment" + index}
            recomment={recomment}
            index={index}
            member={member}
            renderingRecomment={renderingRecomment}
            setRenderingRecomment={setRenderingRecomment}
          />
        );
      })}
    </>
  );
};

const RecommentItem = (props) => {
  const member = props.member;
  const index = props.index;
  const recomment = props.recomment;
  const navigate = useNavigate();
  const renderingRecomment = props.renderingRecomment;
  const setRenderingRecomment = props.setRenderingRecomment;

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
        setRenderingRecomment(!renderingRecomment);
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
          .get("/community/removeComment/" + recomment.comuBoardCommentNo)
          .then((res) => {
            setRenderingRecomment(!renderingRecomment);
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
    <>
      <div className="comment-recomment-list">
        <div className="recomment-account">
          <span class="material-icons">account_circle</span>
        </div>
        <div className="recomment-writer">{recomment.memberId}</div>
        <div className="recomment-date">{recomment.comuBoardCommentDate}</div>
        <div className="recomment-recomment-btn"></div>
        {member && member.memberNo == recomment.comuBoardCommentWriter ? (
          <>
            <div className="recomment-update" onClick={updateComment}>
              수정
            </div>
            <div className="recomment-delete" onClick={deleteComment}>
              삭제
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="recomment-content">
        {recomment.comuBoardCommentContent}
      </div>
    </>
  );
};

export default RecommentList;
