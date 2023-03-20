import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function VerifyEmailNotification() {

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true })
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div className='VerifyEmailNotification auth-card'>
      <h1>Thanks for signing up!</h1>
      <p>
        A verification mail has been sent to you.
        Please verify to unlock full site features
      </p>
    </div>
  )
}
