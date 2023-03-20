import "./Profile.scss"
import React, { useEffect } from "react";
import useToken from "../../utils/auth/useToken";
import useUser from "../../utils/auth/useUser";
import classNames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [token, setToken] = useToken();
  const { user: { isVerified, _id, email } } = useUser();
  const navigate = useNavigate()
  async function handleToggleVerify() {
    try {
      const request = await axios.patch(`/api/users/${_id}`, {
        isVerified: !isVerified
      },
        { headers: { Authorization: `Bearer ${token}` } })
      const { token: newToken } = request.data;
      setToken(newToken);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  }, [token])

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <div className="Profile">
      <h5 className={classNames({ "verified": isVerified })}>Profile Page</h5>
      <p className={classNames({ "warning": !isVerified })}>{!isVerified && "please verify to make changes"}</p>
      <h5>{email}</h5>
      <button onClick={handleToggleVerify}>{isVerified ? "UnVerify" : "Verify"}</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
