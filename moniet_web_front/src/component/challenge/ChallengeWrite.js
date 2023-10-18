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
    console.log(challengeCategory);
    if (
      challengeKind !== "" &&
      challengeTitle !== "" &&
      challengeStart !== "" &&
      challengeEnd !== "" &&
      challengeAmount !== ""
    ) {
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
        })
        .catch((res) => {
          console.log(res.response.status);
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
