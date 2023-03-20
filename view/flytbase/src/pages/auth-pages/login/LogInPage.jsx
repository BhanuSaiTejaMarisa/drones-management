import "./LogInPage.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../../../utils/auth/useToken";
import axios from "axios"
import useUser from "../../../utils/auth/useUser";

export default function LogInPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const { user } = useUser();
  function handleCredentials(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function handleLogIn() {
    const request = await axios.post("/api/login", {
      email: credentials.email,
      password: credentials.password
    })
    const { token } = request.data;
    setToken(token);
    navigate("/",
      {
        replace: true
      })
  }
  console.log("loginpage", { token, user });

  function handleForgotPassword() {
    navigate("/forgot-password");
  }
  function handleSignIn() {
    navigate("/signin");
  }
  return (
    <div className="LogInPage auth-card">
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
        placeholder="password"
      />
      <hr />
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
