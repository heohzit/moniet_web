import { Link } from "react-router-dom";
import "./default.css";

const Main = () => {
  return (
    <div className="header-link">
      <Link to="/login">
        <span className="material-icons icon">login</span>
      </Link>
      <Link to="/join">
        <span className="material-icons">person_add_alt</span>
      </Link>
    </div>
  );
};

export default Main;
