import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../style/NavBar.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
function NavBar({ reset }) {
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    reset(e);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link text-white">
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
            <>
              <NavDropdown title="Product" id="basic-nav-dropdown">
                <NavLink to="/jeans" className="nav-link text-dark">
                  Jeans
                </NavLink>

                <NavLink to="/shirt" className="nav-link text-dark">
                  Shirt
                </NavLink>

                <NavLink to="/tshirt" className="nav-link text-dark">
                  T-shirt
                </NavLink>
              </NavDropdown>
            </>
            <NavLink to="/postproduct" className="nav-link text-white">
              Post-Đăng tin
            </NavLink>
            {userInfo.email !== "" ? (
              <>
                <div className="logout text-white mt-2" onClick={handleLogout}>
                  Log out
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link text-white">
                  Login
                </NavLink>

                <NavLink to="/register" className="nav-link text-white">
                  Register
                </NavLink>
              </>
            )}
            {userInfo.email !== "" && userInfo.isAdmin === 1 && (
              <>
                <NavDropdown title="Admin Pages" id="basic-nav-dropdown">
                  <NavLink to="/admin" className="nav-link text-dark">
                    Admin
                  </NavLink>

                  <NavLink to="/users" className="nav-link text-dark">
                    Users
                  </NavLink>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {userInfo.email !== "" && (
        <div className="nav-item " style={{ width: "300px" }}>
          <NavLink to="/aboutuser" className="nav-link text-white">
            <FontAwesomeIcon icon={faUserCircle} /> {userInfo.name}
          </NavLink>
        </div>
      )}
    </Navbar>
  );
}

export default memo(NavBar);
