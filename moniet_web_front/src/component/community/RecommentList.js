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
        console.log(res.data);
        setRecommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <>
      {recommentList.map((recomment, index) => {
        return (
          <RecommentItem
            key={"recomment" + index}
            recomment={recomment}
            index={index}
            member={member}
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
            <div className="recomment-update">수정</div>
            <div className="recomment-delete">삭제</div>
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
