import ChallengeFrm from "./ChallengeFrm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//챌린지 작성
const ChallengeWrite = () => {
  const [challengeKind, setChallengeKind] = useState(1);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeAmount, setChallengeAmount] = useState("");
  const [challengeStart, setChallengeStart] = useState("");
  const [challengeEnd, setChallengeEnd] = useState("");
  const [challengeCategory, setChallengeCategory] = useState("");
  const navigate = useNavigate();

  const write = () => {
    if (
      challengeKind !== "" &&
      challengeTitle !== "" &&
      challengeStart !== "" &&
      challengeEnd !== "" &&
      challengeAmount !== "" &&
      (challengeKind === 1
        ? challengeCategory === ""
        : challengeCategory !== "")
    ) {
      Swal.fire({
        text: "머니챌린지는 수정이 불가능합니다. 만드시겠습니까?",
        showCancelButton: false,
        confirmButtonText: "생성",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const challenge = {
            challengeKind,
            challengeTitle,
            challengeAmount,
            challengeStart,
            challengeEnd,
            challengeCategory,
          };
          const token = window.localStorage.getItem("token");
          axios
            .post("/challenge/insert", challenge, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data === 1) {
                navigate("/challenge");
              } else {
                Swal.fire("챌린지 생성이 실패하였습니다. 다시 시도해주세요.");
              }
            });
        } else {
          return;
        }
      });
    } else {
      Swal.fire("입력값을 확인해주세요.");
    }
  };
  return (
    <div className="challenge-write-wrap">
      <ChallengeFrm
        challengeKind={challengeKind}
        setChallengeKind={setChallengeKind}
        challengeTitle={challengeTitle}
        setChallengeTitle={setChallengeTitle}
        challengeAmount={challengeAmount}
        setChallengeAmount={setChallengeAmount}
        challengeStart={challengeStart}
        setChallengeStart={setChallengeStart}
        challengeEnd={challengeEnd}
        setChallengeEnd={setChallengeEnd}
        challengeCategory={challengeCategory}
        setChallengeCategory={setChallengeCategory}
        buttonEvent={write}
        type="write"
      ></ChallengeFrm>
    </div>
  );
};
export default ChallengeWrite;
