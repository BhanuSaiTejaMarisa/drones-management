import "./LogInPage.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LogInPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  function handleCredentials(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }
  const navigate = useNavigate();

  async function handleLogIn() {}

  function handleForgotPassword() {
    navigate("forgot-password");
  }
  function handleSignIn() {
    navigate("sigin");
  }
  return (
    <div className="LogInPage">
      <h1>Log In</h1>
      <input
        type="email"
        name="email"
        placeholder="someone@gmail.com"
        value={credentials.email}
        onChange={handleCredentials}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleCredentials}
      />
      <button
        disabled={!credentials.email || !credentials.password}
        onClick={handleLogIn}
      >
        LogIn
      </button>
      <button onClick={handleForgotPassword}>Forgot Password?</button>
      <button onClick={handleSignIn}>Don't have an account? SignIn</button>
    </div>
  );
}
