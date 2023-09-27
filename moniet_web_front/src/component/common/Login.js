import "./login.css";

const Login = () => {
  return (
    <div className="login-wrap">
      <div className="login-title">LOGIN</div>
      <div className="login-content">
        <div className="login-input">
          <input type="text" placeholder="id"></input>
        </div>
        <div className="login-input">
          <input type="password" placeholder="password"></input>
        </div>
      </div>
    </div>
  );
};
export default Login;
