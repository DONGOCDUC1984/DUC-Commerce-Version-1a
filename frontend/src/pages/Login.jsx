import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faEyeSlash,
  faEye,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

function Login({ email, setEmail, password, setPassword, reset }) {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  function showHide() {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  }

  return (
    <form className="mt-1" onSubmit={handleLogin}>
      <label> Email: </label>
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <div>
        <label> Password: </label>
        <br />
        <input
          className="mt-1"
          type={type}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FontAwesomeIcon
          onClick={showHide}
          style={{ marginLeft: "-35px" }}
          icon={icon}
        />
      </div>
      <button className="mt-1" type="submit">
        {" "}
        <FontAwesomeIcon icon={faArrowRightToBracket} /> Log in
      </button>{" "}
      <button className="mt-1" onClick={reset}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Reset
      </button>
      {userInfo.email !== "" && <Navigate to="/" />}
    </form>
  );
}

export default Login;
