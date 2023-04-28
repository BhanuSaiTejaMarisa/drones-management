import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function VerifyEmailNotification() {

  const navigate = useNavigate();
  const [queryParams,] = useSearchParams()
  useEffect(() => {
    const timer = setTimeout(() => {
      const email = queryParams.get("email")
      navigate(`/verify-email?email=${encodeURIComponent(email)}`, { replace: true })
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [queryParams])
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
