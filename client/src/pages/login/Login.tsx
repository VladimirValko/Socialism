import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from "../../redux/slices/AuthSlice"

const Login:React.FC = () => {

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h2 className="loginLogo">Socialism</h2>
          <span className="loginDescription">
            Connect with friends and the world around you on Socialism
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Log In</button>
            <span className="loginCreate">Don't have an account?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;