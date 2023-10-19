import { createPortal } from "react-dom";

const CashModalContainer = ({ children }) => {
  return createPortal(<>{children}</>, document.getElementById("cash-modal"));
};

export default CashModalContainer;
