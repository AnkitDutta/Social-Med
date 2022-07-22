import "./login.css";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
// import { CircularProgress } from "@mui/material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // console.log(error);

  const handleClick = async (e) => {
    e.preventDefault();
    // setLoading(true);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if(!isFetching && error!==false){
      setErrorMessage(error)
    }
    // setLoading(false);


  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Rave Up</h3>
          <span className="loginDesc">
            Connect with friends, family and the world around you.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput eml"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput pwd"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? "Loading" : "Log In"}
            </button>
            {(!isFetching && error!==false) && <span className="loginForgot">{errorMessage}</span>}
            <span className="loginForgot">Forgot Password?</span>
            <Link className="linkk" to="/Register">
            <button className="loginRegisterButton">
              Create a New Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
