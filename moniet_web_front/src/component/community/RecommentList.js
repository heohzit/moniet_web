import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const RecommentList = () => {
  return (
    <>
      <div className="comment-recomment-list">
        <div className="recomment-account">
          <span class="material-icons">account_circle</span>
        </div>
        <div className="recomment-writer">akdgndl</div>
        <div className="recomment-date">2023.10.16 오후 00시00분</div>
        <div className="recomment-recomment-btn">답글달기</div>
        <div className="recomment-update">수정</div>
        <div className="recomment-delete">삭제</div>
      </div>
      <div className="recomment-content">대댓글 내용</div>
    </>
  );
};

export default RecommentList;
