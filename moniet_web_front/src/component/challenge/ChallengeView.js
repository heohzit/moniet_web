import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";
import Swal from "sweetalert2";

//챌린지 상세보기
const ChallengeView = () => {
  const location = useLocation();
  const challengeNo = location.state.challengeNo;
  const categoryNo = location.state.categoryNo;
  const [challenge, setChallenge] = useState([]);
  const navigate = useNavigate();
  const modalBackground = useRef();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (categoryNo === 0) {
      axios
        .post("/challenge/view2/" + challengeNo, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (
            challenge.challengeResult !== 1 &&
            challenge.challengeResult !== 2
          ) {
            console.log(res.data);
            setChallenge(res.data);
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      axios
        .post("/challenge/view/" + challengeNo, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (
            challenge.challengeResult !== 1 &&
            challenge.challengeResult !== 2
          ) {
            console.log(res);
            setChallenge(res.data);
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    }
  }, []);
  const [modalData, setModalData] = useState([]);
  const openModalWithData = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/challenge/viewData", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setModalData(res.data.viewData);
        toggleModal();
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleViewDetailsClick = () => {
    openModalWithData();
  };
  const goalAmount = [[challenge.challengeAmount]];
  const currentAmount = [[challenge.total]];
  const rawProgress = Math.floor((currentAmount / goalAmount) * 100);
  const progress =
    challenge.challengeKind === 1
      ? Math.min(100, rawProgress)
      : Math.max(0, Math.min(100, rawProgress));

  //진행률 멘트
  const ProgressMent = (progress) => {
    if (challenge.challengeKind === 1) {
      if (progress >= 100) {
        return "축하드려요! 성공입니다!";
      } else if (progress >= 85) {
        return "성공이 눈 앞에 있습니다!";
      } else if (progress >= 50) {
        return "저축을 잘 하시고 계시네요!";
      } else {
        return "시작이 좋아요!";
      }
    } else {
      if (progress >= 100) {
        return "실패.. 다음에는 꼭 성공해요!";
      } else if (progress >= 90) {
        return "이대로 실패 할 수는 없어요! 화이팅!";
      } else if (progress >= 50) {
        return "조금만 더 아껴봐요!";
      } else {
        return "돈을 매우 아껴쓰고 있으시네요!";
      }
    }
  };
  //진행률 색상
  const ProgressColor = (progress) => {
    if (challenge.challengeKind === 1) {
      if (progress >= 100) {
        return "rgb(25, 118, 210)";
      } else if (progress >= 85) {
        return "rgb(25, 118, 210)";
      } else if (progress >= 50) {
        return "rgb(255, 69, 0)";
      } else {
        return "rgb(255, 69, 0)";
      }
    } else {
      if (progress >= 100) {
        return "rgb(255, 69, 0)";
      } else if (progress >= 90) {
        return "rgb(255, 69, 0)";
      } else if (progress >= 50) {
        return "rgb(25, 118, 210)";
      } else {
        return "rgb(25, 118, 210)";
      }
    }
  };
  //챌린지 삭제
  const deleteChallenge = () => {
    Swal.fire({
      icon: "warning",
      text: "챌린지를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/challenge/delete/" + challenge.challengeNo)
          .then((res) => {
            if (res.data === 1) {
              navigate("/challenge");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  //챌린지 포기
  const changeChallenge = () => {
    Swal.fire({
      icon: "warning",
      text: "챌린지를 중도포기하시겠습니까? 포기를 누르시면 종료된 챌린지로 이동합니다.",
      showCancelButton: true,
      confirmButtonText: "포기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        const obj = {
          challengeNo: challenge.challengeNo,
          challengeResult: 2,
        };
        const token = window.localStorage.getItem("token");
        axios
          .post("/challenge/changeChallenge", obj, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            if (res.data === 1) {
              navigate("/challenge");
            } else {
              Swal.fire("변경중 문제가 발생했습니다.");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  //달력 날짜 지정
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);

  return (
    <div className="challenge-view-content">
      <div className="challenge-item-info">
        <div className="challenge-kind">
          {challenge.challengeKind === 1 ? <div>저축</div> : <div>지출</div>}
        </div>
        <div className="category-kind">
          {challenge.categoryTitle === null ? (
            <></>
          ) : (
            <div>{challenge.categoryTitle}</div>
          )}
        </div>
      </div>
      <div className="challengeTitle">
        <h2>{challenge.challengeTitle}</h2>
      </div>
      <div className="challenge-startEnd">
        <div>시작 일자 : {challenge.challengeStart}</div>
        <div>종료 일자 : {challenge.challengeEnd}</div>
      </div>
      <div className="challenge-progress">
        <div className="progress-bar">
          <CircularProgressBar
            colorCircle="#fff"
            colorSlice={ProgressColor(progress)}
            percent={challenge.challengeKind === 1 ? progress : 100 - progress}
            fontColor={ProgressColor(progress)}
            round={true}
            fontSize="15px"
            textPosition="1.5rem"
          ></CircularProgressBar>
        </div>
        <div className="amount-info">
          <div className="goalAmount">
            목표 금액 : {goalAmount.toLocaleString()}원
          </div>
          <div className="currentAmount">
            현재 금액 : {currentAmount.toLocaleString()}원
          </div>
          <div>
            <Button3 clickEvent={handleViewDetailsClick}>상세보기</Button3>
          </div>
        </div>
        {isModalVisible && (
          <div
            className={"modal-container"}
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalVisible(!isModalVisible);
              }
            }}
          >
            <div className="challenge-modal">
              <div
                className="challenge-modal-content"
                style={{ width: "500px" }}
              >
                {modalData &&
                  modalData.map((item, index) => {
                    return <ModalItem key={item + index} item={item} />;
                  })}
                <Button3 clickEvent={toggleModal}>닫기</Button3>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="progress-ment">📢{ProgressMent(progress)}📢</div>

      <div className="challenge-btn-box">
        {challenge.challengeResult === 2 ||
        challenge.challengeResult === 1 ||
        dateString > challenge.challengeEnd ? (
          ""
        ) : (
          <>
            <Button3 clickEvent={changeChallenge} text="챌린지 포기"></Button3>
            <Button3 clickEvent={deleteChallenge} text="챌린지 삭제"></Button3>
          </>
        )}
      </div>
    </div>
  );
};
const ModalItem = (props) => {
  const item = props.item;
  return (
    <div className="view-list-wrap">
      <div className="view-list">
        <div>{item.cashbookFinance === 1 ? "저축" : "지출"}</div>
        <div>{item.categoryTitle}</div>
        <div>{item.cashbookMoney.toLocaleString()}원</div>
        <div>{item.cashbookDate}</div>
      </div>
    </div>
  );
};
export default ChallengeView;
