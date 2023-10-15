import { useLocation } from "react-router-dom";

const CashbookView = (props) => {
  const location = useLocation();
  const cashbookNo = location.state.cashbookNo;
  const [cashbook, setCashbook] = useState([]);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default CashbookView;
