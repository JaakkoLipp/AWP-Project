import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import React, { useState } from "react";
import MainPage from "./components/Main";
import Menu from "./components/Menu";
import Messages from "./components/Messages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  return (
    <Router>
      <Menu />
      <div className="App">
        <h2>{jwt ? `Welcome ${user.username}!` : ""}</h2>
        <Routes>
          <Route
            path="/login"
            element={<Login setJwt={setJwt} setUser={setUser} jwt={jwt} />}
          />
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
