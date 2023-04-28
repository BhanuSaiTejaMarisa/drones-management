import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const navigate = useNavigate();

    function handleEmail(event) {
        const value = event.target.value;
        setEmailValue(value);
    }

    async function handleSubmit() {
        try {
            axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                navigate(`/reset-password?email=${encodeURIComponent(emailValue)}`)
            }, 3000)
        }
        catch (err) {
            setErrorMessage(err.message)
        }
    }

    return success ? (
        <div className='ForgotPassword auth-card'>
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className="ForgotPassword auth-card">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input type="email" value={emailValue} onChange={handleEmail} />
            <button disabled={!emailValue} onClick={handleSubmit}>Send Reset Link</button>
        </div>
    )
}
