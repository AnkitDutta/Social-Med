import "./register.css";
import axios from "axios";
import { useRef } from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Password doesn't match");
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try{
        await axios.post("/auth/register", user);
        history("/login");
      }catch(err){
        console.log(err);
      }
    }
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
        <div className="loginRight">
          <form className="rloginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInp"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInp"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInp"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInp"
              type="password"
            />
            <button className="signButton loginInp"  type="submit">Sign Up</button>
            <Link className="linkk" to="/login">
            <button className="loginExistButton loginInp">Log into existing Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
