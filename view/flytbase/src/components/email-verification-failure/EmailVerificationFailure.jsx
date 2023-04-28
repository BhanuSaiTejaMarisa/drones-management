import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EmailVerificationFailure() {

  const navigate = useNavigate();

  return (
    <div className='VerifyEmail auth-card'>
      <h1>Uh oh...</h1>
      <p>Something went wrong</p>
      <button onClick={() => navigate("/signin", { replace: true })}>Go back to signup</button>
    </div>
  )
}
