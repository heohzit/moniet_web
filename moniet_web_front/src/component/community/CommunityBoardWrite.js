import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const CommunityBoardWrite = (props) => {
  const location = useLocation();
  const communityNo = props.communityNo;
  const rendering = props.rendering;
  const setRendering = props.setRendering;
  const [val, setVal] = useState("");

  const [boardFile, setBoardFile] = useState([]); // 전송용
  const [boardImg, setBoardImg] = useState([]); // 미리보기용
  const [newFileList, setNewFileList] = useState([]);

  const navigate = useNavigate();

  const [reqPage, setReqPage] = useState(1);

  const changeFile = (e) => {
    const files = e.currentTarget.files;
    if (files.length > 5) {
      Swal.fire({
        icon: "error",
        text: "첨부파일 최대 갯수는 5개입니다.",
      });
      return;
    }

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

    // for (let i = 0; i < files.length; i++) {
    //   reader.readAsDataURL(files[i]);
    // }
    // reader.onloadend = () => {
    //   setBoardImg(reader.result);
    // };

    // setBoardFile(files[0]);

    // const reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onloadend = () => {
    //   setBoardImg(reader.result);
    // };

    // const files = e.currentTarget.files;
    // const arr = new Array();
    // for (let i = 0; i < files.length; i++) {
    //   arr.push(files[i].name);
    // }
    // setNewFileList(arr);

    // const reader = new FileReader();
    // reader.readAsDataURL(arr);
  };

  const deletePreview = () => {
    return Swal.fire({
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

  const insertBoard = (props) => {
    const communityBoardContent = document.querySelector(
      ".board-write-textarea-text"
    );
    const selectOption = document.querySelector(".board-write-options-select");

    if (communityBoardContent !== "" && selectOption != 0) {
      Swal.fire({
        icon: "question",
        text: "게시글을 작성하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const form = new FormData();
          form.append("communityRef", communityNo);
          form.append("communityBoardContent", communityBoardContent.value);
          form.append("communityBoardTypeList", selectOption.value);
          for (let i = 0; i < boardFile.length; i++) {
            form.append("boardFile", boardFile[i]);
          }
          const token = window.localStorage.getItem("token");

          axios
            .post("/community/insertBoard", form, {
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
                  "게시글 작성이 완료되었습니다.",
                  "success"
                );
                setRendering(!rendering);
                communityBoardContent.value = "";
                selectOption.value = 0;
                setBoardFile([]);
                setBoardImg([]);
              }
            })
            .catch((res) => {
              console.log(res);
            });
        }
      });
    } else {
      Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
    }
  };

  // const insertBoard2 = (props) => {
  //   const communityBoardContent = document.querySelector(
  //     ".board-write-textarea-text"
  //   ).value;
  //   const selectOption = document.querySelector(
  //     ".board-write-options-select"
  //   ).value;

  //   // console.log(communityBoardContent);
  //   // console.log(selectOption);
  //   // console.log(boardFile);

  //   if (communityBoardContent !== "" && selectOption != 0) {
  //     // ===을 3개쓰면 타입까지 비교하는데, ==을 2개쓰면 순수 데이터만 비교함
  //     Swal.fire({
  //       icon: "question",
  //       text: "게시글을 작성하시겠습니까?",
  //       showCancelButton: true,
  //       confirmButtonText: "확인",
  //       cancelButtonText: "취소",
  //     }).then((res) => {
  //       if (res.isConfirmed) {
  //         const form = new FormData();
  //         form.append("communityRef", communityNo);
  //         form.append("communityBoardContent", communityBoardContent);
  //         form.append("communityBoardTypeList", selectOption);
  //         for (let i = 0; i < boardFile.length; i++) {
  //           form.append("boardFile", boardFile[i]);
  //         }
  //         const token = window.localStorage.getItem("token");
  //         axios
  //           .post("/community/insertBoard", form, {
  //             headers: {
  //               contentType: "multipart/form-data",
  //               processdData: false,
  //               Authorization: "Bearer " + token,
  //             },
  //           })
  //           .then((res) => {
  //             if (res.data > 0) {
  //               Swal.fire(
  //                 "작성 완료",
  //                 "게시글작성이 완료되었습니다.",
  //                 "success"
  //               );
  //             }
  //           })
  //           .catch((res) => {
  //             console.log(res.response.status);
  //           });
  //       }
  //     });
  //   } else {
  //     Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
  //   }
  // };

  return (
    <div className="board-write">
      <div className="board-write-wrap">
        <div className="board-write-textarea">
          <textarea className="board-write-textarea-text"></textarea>
        </div>
        <div className="board-write-options">
          <select className="board-write-options-select">
            <option value={0}>말머리를 선택하세요.</option>
            <option value={1}>가입인사</option>
            <option value={2}>질문</option>
            <option value={3}>꿀팁</option>
            <option value={4}>잡담</option>
          </select>
          <label htmlFor="insert-image-btn" className="insert-image-btn">
            사진첨부
          </label>
          <input
            type="file"
            id="insert-image-btn"
            style={{ display: "none" }}
            accept="image/*"
            onChange={changeFile}
            multiple
          />
          <Button2 text="등록하기" clickEvent={insertBoard} />
        </div>
        <div className="insert-image-preview">
          {boardImg.length !== 0 ? (
            <>
              <div className="insert-image-preview-top">첨부파일 〉</div>
              <span
                class="material-icons preview-delete"
                onClick={deletePreview}
              >
                remove_circle_outline
              </span>
              {boardImg.map((item, index) => {
                return (
                  <>
                    <div className="insert-image-preview-items">
                      <img src={item} />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            ""
          )}

          {/* files.length !== 0 && files[0] != 0 */}

          {/* {boardImg.map((item, index) => {
            return (
              <>
                <div>
                  <img src={item} />
                </div>
              </>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default CommunityBoardWrite;
