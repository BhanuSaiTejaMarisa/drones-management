import "./LogInPage.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useToken from "../../../utils/auth/useToken";
import axios from "axios"
import useUser from "../../../utils/auth/useUser";

export default function LogInPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useToken();
  const { user } = useUser();
  const navigate = useNavigate();
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const [searchParams,] = useSearchParams()
  console.log(searchParams.get("token"));
  useEffect(() => {
    if (searchParams.get("token")) {
      setToken(searchParams.get("token"));
      navigate("/")
    }
  }, [searchParams, setToken, navigate])

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/api/auth/google/url");
        const { url } = response.data;
        // console.log({url});
        setGoogleOauthUrl(url)
      }
      catch (err) {
        console.log(err);
      }
    }
    loadOauthUrl();
  }, [])

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
      <button disabled={!googleOauthUrl} onClick={() => { window.location.href = googleOauthUrl }}>Log in with Google</button>
    </div>
  );
}
