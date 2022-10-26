import React from "react";
import ecommerce1 from "../images/ecommerce1.png";
import "../style/Header.css";
import { Slide } from "react-awesome-reveal";

function Header({ searchWord, setSearchWord }) {
  return (
    <div className="container-fluid">
      <Slide cascade damping={0.1}>
        <div className="Header d-flex justify-content-start ">
          <img
            src={ecommerce1}
            alt="ecommerce1"
            className="logoecommerce1"
          ></img>
          <h3>DUC COMMERCE</h3>

          <input
            className="mx-auto w-25"
            id="HeaderInput"
            type="text"
            value={searchWord}
            placeholder="Search..."
            onChange={(e) => setSearchWord(e.target.value)}
          ></input>
        </div>
        <p> DO NGOC DUC created this website. </p>
        <p> ĐỖ NGỌC ĐỨC đã làm ra trang web này. </p>
      </Slide>
    </div>
  );
}

export default Header;
