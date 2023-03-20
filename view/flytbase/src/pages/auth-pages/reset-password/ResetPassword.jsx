import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const { passwordResetCode } = useParams()
  const navigate = useNavigate();

  function handlePasswordValue(e) {
    setPasswordValue(e.target.value)
  }

  function handleConfirmPasswordValue(e) {
    setConfirmPasswordValue(e.target.value)
  }
  function handleNavigate(link) {
    return e => {
      navigate(link, { replace: true })
    }
  }
  async function handleResetPassword() {
    try {
      await axios.put(`/api/reset-password/${passwordResetCode}`, {
        newPassword: passwordValue
      })
      setIsSuccess(true)
    }
    catch (err) {
      setIsFailure(true)
    }
  }
  if (isSuccess) return (
    <div className='ResetPasswordSuccess auth-card'>
      <h1>Password reset Successful!</h1>
      <p>Your password has been reset, now please login with youtr new password.</p>
      <button onClick={handleNavigate("/login")}> Login</button>
    </div>)

  if (isFailure) return (
    <div className='ResetPasswordFailure auth-card'>
      <h1>Uh oh...</h1>
      <p>Something went wrong while trying to reset password!</p>
      <button onClick={handleNavigate("/login")}>Back to Login</button>
    </div>)
  return (
    <div className='ResetPassword auth-card'>
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input type="password" value={passwordValue} onChange={handlePasswordValue} placeholder="password" />
      <input type="password" value={confirmPasswordValue} onChange={handleConfirmPasswordValue} placeholder="confirm password" />
      <button onClick={handleResetPassword} disabled={!passwordValue || passwordValue !== confirmPasswordValue}>Reset Password</button>
    </div>
  )
}
