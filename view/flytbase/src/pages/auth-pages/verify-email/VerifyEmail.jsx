import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useToken from '../../../utils/auth/useToken';
import EmailVerificationSuccess from '../../../components/email-verification-success/EmailVerificationSuccess';
import EmailVerificationFailure from '../../../components/email-verification-failure/EmailVerificationFailure';

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [_, setToken] = useToken();

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

  if (isLoading) return (<div><h1>Loading...</h1></div>)

  if (!isSuccess) return <EmailVerificationFailure />

  return <EmailVerificationSuccess />

}
