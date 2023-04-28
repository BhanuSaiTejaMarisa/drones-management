import React, { useState } from 'react'
import useToken from '../../../utils/auth/useToken';
import { useSearchParams } from 'react-router-dom';
import EmailVerificationSuccess from '../../../components/email-verification-success/EmailVerificationSuccess';
import EmailVerificationFailure from '../../../components/email-verification-failure/EmailVerificationFailure';
import axios from 'axios';

export default function EmailVerificationCodePage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [verificationString, setVerificationString] = useState("");
  const [, setToken] = useToken();
  const [queryParmas,] = useSearchParams();

  if (isSuccess) return <EmailVerificationSuccess />
  if (isFailure) return <EmailVerificationFailure />;

  function handleVerificationString(event) {
    setVerificationString(event.target.value)
  }
  async function handleSubmit() {
    try {
      const email = queryParmas.get("email")
      const response = await axios.put("/api/verify-email", {
        email, verificationString
      })
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
    }
    catch (err) {
      setIsFailure(true)
    }
  }
  return (
    <div class-name="auth-card">
      <h1>Please verify Your Email</h1>
      <p>You should have received verification code at your email Address. Please enter it here.</p>
      <input type="text" name="" id="" placeholder='e.g. 123456' value={verificationString} onChange={handleVerificationString} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
