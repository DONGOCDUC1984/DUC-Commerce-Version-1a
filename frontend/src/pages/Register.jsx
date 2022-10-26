import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faArrowsRotate,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";
function Register({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  password2,
  setPassword2,
  reset,
}) {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert(
        "Password do not match.Try again.(2 mật khẩu không giống nhau.Hãy thử lại. ) "
      );
    } else {
      dispatch(register({ name, email, password }));
    }
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
    <form className="mt-1" onSubmit={handleRegister}>
      <br />
      <label> Tên: </label>
      <br />
      <input
        className="mt-1"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label> Email: </label>
      <br />
      <input
        className="mt-1"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label> Nhập mật khẩu: </label>
      <br />
      <div>
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
      <label> Nhập lại mật khẩu: </label>
      <br />
      <div>
        <input
          className="mt-1"
          type={type}
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
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
        <FontAwesomeIcon icon={faPencil} /> Register
      </button>{" "}
      <button className="mt-1" onClick={reset}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Reset
      </button>
      {userInfo.email !== "" && <Navigate to="/" />}
    </form>
  );
}

export default Register;
