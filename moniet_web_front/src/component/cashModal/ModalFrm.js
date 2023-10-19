import { useRef } from "react";
import CashModalContainer from "./CashModalContainer";
import "./modalFrm.css";
import useOutSideClick from "./UseOutSideClick";

const ModalFrm = ({ onClose, children }) => {
  //모달 닫기
  const handleClose = () => {
    onClose?.();
  };

  //모달 프레임 바깥 눌러서 닫기
  const modalRef = useRef(null);
  useOutSideClick(modalRef, handleClose);
  return (
    <CashModalContainer>
      <div className="cash-modal-all-wrap">
        <div className="cash-modal-wrap" ref={modalRef}>
          <div className="cash-modal-contents">{children}</div>
        </div>
      </div>
    </CashModalContainer>
  );
};

export default ModalFrm;
