// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeImage from "../../assets/images/home.png";
import "./style.css";
import { useAuth } from "../../context/AuthContext";  // ← import

export default function Home() {
  const navigate = useNavigate();
  const { setUserId } = useAuth();  // ← grab setter

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const clickAssessment = () => setShowModal(true);
  const closeModal      = () => {
    setShowModal(false);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill both fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const { user_id } = await res.json();

      // store globally
      setUserId(user_id);

      closeModal();
      navigate("/cv");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homeContainer">
      <div className="homeLeft">
        <div className="homeLeftHeader">
          <span>You want to find you dream job?</span>
        </div>
        <div className="homrLeftSubHeader">
          <span>
            Testing your skills with our quiz and find your dream job.
          </span>
        </div>
        <div className="assestmentBtn">
          <span onClick={clickAssessment}>Login</span>
        </div>
        <div className="takeTimeText">
          <span>It only takes a few minutes to get started</span>
        </div>
      </div>

      <div className="homeRight">
        <img src={HomeImage} alt="home" className="homeImage" />
      </div>

      {showModal && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <button className="modalClose" onClick={closeModal}>×</button>
            <h2>Login</h2>
            {error && <div className="modalError">{error}</div>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="modalInput"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="modalInput"
            />
            <button
              className="modalBtn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
