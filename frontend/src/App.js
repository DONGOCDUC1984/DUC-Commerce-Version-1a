import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutUser from "./pages/AboutUser";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Jeans from "./pages/Jeans";
import Login from "./pages/Login";
import NoMatchPage from "./pages/NoMatchPage";
import PostProduct from "./pages/PostProduct";
import Register from "./pages/Register";
import Shirt from "./pages/Shirt";
import Tshirt from "./pages/Tshirt";
import Users from "./pages/Users";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [password2, setPassword2] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  function reset(e) {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setSearchWord("");
  }
  return (
    <div>
      <BrowserRouter>
        <NavBar reset={reset} />
        <br /> <br /> <br /> <br />
        <Header searchWord={searchWord} setSearchWord={setSearchWord} />
        <div className="container-fluid">
          {userInfo.email !== "" ? (
            <div>
              <p> Logged in/Registered by {userInfo.email} </p>
            </div>
          ) : (
            <div>
              <p>Not logged in/registered yet </p>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home searchWord={searchWord} />} />
            <Route path="/jeans" element={<Jeans searchWord={searchWord} />} />
            <Route path="/shirt" element={<Shirt searchWord={searchWord} />} />
            <Route
              path="/tshirt"
              element={<Tshirt searchWord={searchWord} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  reset={reset}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  password2={password2}
                  setPassword2={setPassword2}
                  reset={reset}
                />
              }
            />

            {userInfo.email !== "" && (
              <>
                <Route path="/aboutuser" element={<AboutUser />} />
              </>
            )}

            {userInfo.email !== "" && userInfo.isAdmin === 1 && (
              <>
                <Route path="/admin" element={<Admin />} />

                <Route path="/users" element={<Users />} />
              </>
            )}

            <Route path="/postproduct" element={<PostProduct />} />

            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
