import { useState, useEffect, useRef } from "react";
import "./agreeBox.css";
import { useNavigate } from "react-router-dom";

const AgreeBox = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const navigate = useNavigate();

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };
  useEffect(() => {
    //disabled = true -> disable처리
    const nextBtn = document.querySelector(".next-button");
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
      nextBtn.disabled = false;
    }
    if (ageCheck === true && useCheck === true) {
      nextBtn.disabled = false;
    } else {
      setAllCheck(false);
      nextBtn.disabled = true;
    }
  }, [ageCheck, useCheck, marketingCheck]);

  const popUpForTerms = () => {
    console.log("클릭");
  };

  const joinfrm = () => {
    const nextBtn = document.querySelector(".next-button");
    if (nextBtn.disabled) {
      alert("이용약관 동의 후 회원가입 페이지로 이동합니다.");
    } else {
      navigate("/joinFrm");
    }
  };

  return (
    <div className="agree-box-wrap">
      <div className="agree-box-title">
        환영합니다!
        <br />
        머니어트에 가입하시려면
        <br />
        약관에 동의해 주세요.
      </div>
      <div className="agree-box-content">
        <form method="post" action="">
          <div>
            <div>
              <div className="check">
                <input
                  type="checkbox"
                  id="all-check"
                  checked={allCheck}
                  onChange={allBtnEvent}
                />
                <label htmlFor="all-check">전체동의</label>
              </div>
              <div className="check">
                <input
                  type="checkbox"
                  id="check1"
                  checked={ageCheck}
                  onChange={ageBtnEvent}
                />
                <label htmlFor="check1">
                  만 14세 이상입니다 <span>(필수)</span>
                </label>
              </div>
              <div className="check">
                <input
                  type="checkbox"
                  id="check2"
                  checked={useCheck}
                  onChange={useBtnEvent}
                />
                <label htmlFor="check2">
                  이용약관 <span>(필수)</span>
                </label>
                <button
                  onClick={() => setModalOpen(true)}
                  type="button"
                  className="popUpBtn"
                >
                  자세히
                </button>
              </div>
              <div className="check">
                <input
                  type="checkbox"
                  id="check3"
                  checked={marketingCheck}
                  onChange={marketingBtnEvent}
                />
                <label htmlFor="check3">
                  개인정보수집 및 이용안내 <span>(선택)</span>
                </label>
                <button
                  onClick={() => setModalOpen(true)}
                  type="button"
                  className="popUpBtn"
                >
                  자세히
                </button>
                {modalOpen && (
                  <div
                    className={"modal-container"}
                    ref={modalBackground}
                    onClick={(e) => {
                      if (e.target === modalBackground.current) {
                        setModalOpen(false);
                      }
                    }}
                  >
                    <div className={"modal-content"}>
                      <div className="modal-title">
                        개인정보 수집 및 이용안내(선택)
                      </div>
                      <div className="modal-close-btn-wrap">
                        <button
                          className={"modal-close-btn"}
                          onClick={() => setModalOpen(false)}
                        >
                          <span class="material-icons">close</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="next-button" type="button" onClick={joinfrm}>
            다음
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgreeBox;
