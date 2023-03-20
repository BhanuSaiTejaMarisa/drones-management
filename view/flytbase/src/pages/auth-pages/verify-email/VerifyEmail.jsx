import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../../../utils/auth/useToken';

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [_, setToken] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifiyEmail() {
      try {
        const response = await axios.put("/api/verify-email", { verificationString })
        const { token } = response.data;
        setToken(token)
        setIsLoading(false);
        setIsSuccess(true)
      }
      catch (err) {
        setIsLoading(false);
        setIsSuccess(false)
      }
    }
    verifiyEmail()
  }, [verificationString, setToken])

  function handleNavigate(link) {
    return e => {
      navigate(link, { replace: true })
    }
  }

  if (isLoading) return (<div><h1>Loading...</h1></div>)

  if (!isSuccess) return (
    <div className='VerifyEmail auth-card'>
      <h1>Uh oh...</h1>
      <p>Something went wrong</p>
      <button onClick={handleNavigate("/signup")}>Go back to signup</button>
    </div>)

  return (
    <div className='VerifyEmail auth-card'>
      <h1>Verification Successful!</h1>
      <p>Thanks for verifying your email, now you can use all features of app</p>
      <button onClick={handleNavigate("/")}>Go to Homepage</button>
    </div>
  )
}
