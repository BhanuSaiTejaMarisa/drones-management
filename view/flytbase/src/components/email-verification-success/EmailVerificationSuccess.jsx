import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EmailVerificationSuccess() {

  const navigate = useNavigate();

  return (
    <div> <div className='VerifyEmail auth-card'>
      <h1>Verification Successful!</h1>
      <p>Thanks for verifying your email, now you can use all features of app</p>
      <button onClick={() => navigate("/", { replace: true })}>Go to Homepage</button>
    </div></div>
  )
}
