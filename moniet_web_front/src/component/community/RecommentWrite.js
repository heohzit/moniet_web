import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";
import CommunityBoardCommentWrite from "./CommunityBoardCommentWrite";

const RecommentWrite = () => {
  return (
    <div className="comment-recomment-write">
      <div className="comment-recomment-write-wrap">
        <CommunityBoardCommentWrite />
      </div>
    </div>
  );
};

export default RecommentWrite;
