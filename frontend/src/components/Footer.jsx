import React from "react";
import ecommerce1 from "../images/ecommerce1.png";
import "../style/Footer.css";
import { Zoom } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
function Footer() {
  return (
    <div className="container-fluid mt-1 ">
      <Zoom>
        <div className="row" id="Footerrow">
          <div className="Footerp1 col mt-1 d-flex justify-content-start ">
            <img
              src={ecommerce1}
              alt="ecommerce1"
              className="logoecommerce1"
            ></img>
            <h3>DUC COMMERCE</h3>
          </div>

          <div className="col mt-1">
            <b>Contact us:</b>
            <p>
              {" "}
              <FontAwesomeIcon icon={faPhone} />
              Tel: 001122XXYY
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faEnvelope} /> Email: duccommerce@gmail.com
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faLocationDot} /> Address: ABC Street
            </p>
          </div>

          <div className="col mt-1">
            <b>Follow DUC COMMERCE on:</b>
            <div className="Footericons">
              <a href="# ">
                <Facebook className="Footericon1" />
              </a>

              <a href="# ">
                <Twitter className="Footericon1" />
              </a>

              <a href="# ">
                <Instagram className="Footericon1" />
              </a>

              <a href="# ">
                <LinkedIn className="Footericon1" />
              </a>

              <a href="# ">
                <YouTube className="Footericon1" />
              </a>

              <a href="# ">
                <FontAwesomeIcon icon={faTiktok} className="Footericon2" />
              </a>
            </div>
          </div>
        </div>
      </Zoom>
    </div>
  );
}

export default Footer;
