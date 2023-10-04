import ChallengeFrm from "./ChallengeFrm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChallengeWrite = () => {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeContent, setChallengeContent] = useState("");
  const [challengeKind, setChallengeKind] = useState("");
  const [challengeAmount, setChallengeAmount] = useState("");
  const [challengeStart, setChallengeStart] = useState("");
  const [challengeEnd, setChallengeEnd] = useState("");
  const navigate = useNavigate();

  const write = () => {
    axios
      .post("/challenge/insert")
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
        challengetTitle={challengeTitle}
        setChallengeTitle={setChallengeTitle}
        challengeContent={challengeContent}
        setChallengeContent={setChallengeContent}
        challengeKind={challengeKind}
        setChallengeKind={setChallengeKind}
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
