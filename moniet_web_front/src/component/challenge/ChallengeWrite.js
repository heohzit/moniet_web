import ChallengeFrm from "./ChallengeFrm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//챌린지 작성
const ChallengeWrite = () => {
  const [challengeKind, setChallengeKind] = useState(1);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeContent, setChallengeContent] = useState("");
  const [challengeAmount, setChallengeAmount] = useState("");
  const [challengeStart, setChallengeStart] = useState("");
  const [challengeEnd, setChallengeEnd] = useState("");
  const navigate = useNavigate();

  const write = () => {
    console.log(challengeTitle);
    console.log(challengeContent);
    console.log(challengeAmount);
    console.log(challengeStart);
    console.log(challengeEnd);
    console.log(challengeKind);
    const challenge = {
      challengeKind,
      challengeTitle,
      challengeContent,
      challengeAmount,
      challengeStart,
      challengeEnd,
    };
    axios
      .post("/challenge/insert", challenge)
      .then((res) => {
        console.log(res.data);
        if (res.data > 0) {
          navigate("/challenge");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div>
      <div className="challenge-frm-title">챌린지 작성</div>
      <ChallengeFrm
        challengeKind={challengeKind}
        setChallengeKind={setChallengeKind}
        challengeTitle={challengeTitle}
        setChallengeTitle={setChallengeTitle}
        challengeContent={challengeContent}
        setChallengeContent={setChallengeContent}
        challengeAmount={challengeAmount}
        setChallengeAmount={setChallengeAmount}
        challengeStart={challengeStart}
        setChallengeStart={setChallengeStart}
        challengeEnd={challengeEnd}
        setChallengeEnd={setChallengeEnd}
        buttonEvent={write}
        type="write"
      ></ChallengeFrm>
    </div>
  );
};
export default ChallengeWrite;
