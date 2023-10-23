import "./community.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button2 } from "../util/Buttons";

const CommunityModifyBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const board = location.state.board;
  const [newFileList, setNewFileList] = useState([]);
  const [boardImg, setBoardImg] = useState(board.fileList); // 미리보기용
  const [boardFile, setBoardFile] = useState([]); // 전송용

  console.log(board);

  const changeFile = (e) => {
    const files = e.currentTarget.files;

    if (files.length > 5) {
      Swal.fire({
        icon: "error",
        text: "첨부파일 최대 갯수는 5개입니다.",
      });
      return;
    } else {
      Swal.fire({
        icon: "warning",
        text: "기존 첨부파일이 삭제됩니다. 그래도 하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const arr = new Array();
          const previewArr = new Array();

          for (let i = 0; i < files.length; i++) {
            arr.push(files[i]);

            boardImg.push(files[i]);
            setBoardImg(arr);

            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
              previewArr.push(reader.result);
              setBoardImg([...previewArr]);
            };
          }
          setBoardFile(arr);
        } else {
          return;
        }
      });
    }
  };
  // console.log("boardImg", boardImg);
  // if (boardImg) {
  //   console.log(typeof boardImg[0]);
  // }
  const ModifyBoard = (props) => {
    const communityBoardContent = document.querySelector(
      ".board-modify-textarea"
    );

    if (communityBoardContent.value !== "") {
      Swal.fire({
        icon: "question",
        text: "게시글을 수정하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const form = new FormData();
          form.append("communityBoardNo", board.communityBoardNo);
          form.append("communityBoardContent", communityBoardContent.value);
          for (let i = 0; i < boardFile.length; i++) {
            form.append("boardFile", boardFile[i]);
          }
          const token = window.localStorage.getItem("token");

          axios
            .post("/community/modifyBoard", form, {
              headers: {
                contentType: "multipart/form-data",
                processdData: false,
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data > 0) {
                Swal.fire(
                  "수정 완료",
                  "게시물 수정이 완료되었습니다.",
                  "success"
                );
                navigate("/community/view", {
                  state: { communityNo: board.communityRef },
                });
              } else {
                Swal.fire("수정 실패", "관리자에게 문의하세요.", "error");
              }
            });
        } else {
          return;
        }
      });
    } else {
      Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
    }
  };

  const deletePreview = () => {
    Swal.fire({
      icon: "warning",
      text: "첨부파일을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        setBoardImg([]);
        setBoardFile([]);
      }
    });
  };

  return (
    <>
      <div className="board-modify-wrap">
        <div className="board-modify-text-zone">
          <textarea className="board-modify-textarea">
            {board.communityBoardContent}
          </textarea>
        </div>
        <div className="board-modify-btns">
          <label htmlFor="modify-image-btn" className="modify-image-btn">
            사진첨부
          </label>
          <input
            type="file"
            id="modify-image-btn"
            style={{ display: "none" }}
            accept="image/*"
            onChange={changeFile}
            multiple
          />
          <Button2 text="수정하기" clickEvent={ModifyBoard} />
        </div>
        <div className="modify-image-preview-top">
          첨부파일 〉
          <span
            class="material-icons modify-preview-delete"
            onClick={deletePreview}
          >
            remove_circle_outline
          </span>
        </div>

        <div className="board-modify-file-zone">
          {boardImg.map((file, index) => {
            return (
              <div className="board-modify-files">
                {typeof file === "string" ? (
                  <img src={file} />
                ) : (
                  <img src={file.filepath} />
                )}
                {/* <img src={file.filepath} /> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommunityModifyBoard;
