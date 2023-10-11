import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";

const CommunityBoardWrite = () => {
  return (
    <div className="board-write">
      <div className="board-write-wrap">
        <div className="board-write-textarea">
          <textarea></textarea>
        </div>
        <div className="board-write-options">
          <select>
            <option>말머리를 선택하세요.</option>
            <option value={1}>가입인사</option>
            <option value={2}>질문</option>
            <option value={3}>꿀팁</option>
            <option value={4}>잡담</option>
          </select>
          <Button3 text="사진첨부" />
          <Button2 text="등록하기" />
        </div>
      </div>
    </div>
  );
};

export default CommunityBoardWrite;
