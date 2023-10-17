import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
        return <span className="material-icons">thumb_up_alt 성공!!!!!</span>;
      } else if (progress >= 90) {
        return (
          <span className="material-icons">
            sentiment_very_satisfied 성공이 눈앞에!
          </span>
        );
      } else if (progress >= 50) {
        return (
          <span className="material-icons">
            sentiment_very_satisfied 잘하고있어요!
          </span>
        );
      } else {
        return (
          <span className="material-icons">
            sentiment_satisfied_alt 시작이 좋아요!
          </span>
        );
      }
    } else {
      if (progress >= 100) {
        return (
          <span className="material-icons">
            sentiment_very_dissatisfied 실패.
          </span>
        );
      } else if (progress >= 90) {
        return (
          <span className="material-icons">
            sentiment_very_dissatisfied 자린고비 시작이에요.
          </span>
        );
      } else if (progress >= 50) {
        return (
          <span className="material-icons">
            sentiment_dissatisfied 조금만 더 아껴주세요.
          </span>
        );
      } else {
        return "돈을 매우 아껴쓰고 있어요!";
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
        const obj = { challengeNo: challenge.challengeNo, challengeResult: 2 };
        axios
          .post("/challenge/changeChallenge", obj)
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
      <div className="challenge-kind">
        {challenge.challengeKind === 1 ? (
          <div>저축챌린지</div>
        ) : (
          <div>지출챌린지</div>
        )}
        <div>{challenge.categoryTitle}</div>
      </div>
      <div className="progress-ment">{ProgressMent(progress)}</div>
      <div className="amount-info">
        목표 금액: {goalAmount.toLocaleString()}원
      </div>
      <div className="amount-info">
        현재 금액: {currentAmount.toLocaleString()}원
      </div>
      <CircularProgressBar
        colorCircle="#ededed"
        colorSlice="#e54e21"
        percent={challenge.challengeKind === 1 ? progress : 100 - progress}
        fontColor="#e54e21"
        round={true}
        fontSize="15px"
        textPosition="1.5rem"
      ></CircularProgressBar>
      <div className="challenge-view-title">{challenge.challengeTitle}</div>
      <div className="challenge-view-info">
        <div>{challenge.challengeStart}</div>
        <div>{challenge.challengeEnd}</div>
      </div>
      <div className="challenge-btn-box">
        {challenge.challengeResult === 2 ||
        challenge.challengeResult === 1 ||
        dateString > challenge.challengeEnd ? (
          ""
        ) : (
          <>
            <Button3 clickEvent={changeChallenge} text="포기하기"></Button3>
            <Button3 clickEvent={deleteChallenge} text="삭제하기"></Button3>
          </>
        )}
      </div>
    </div>
  );
};
export default ChallengeView;
