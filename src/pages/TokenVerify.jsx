// TokenVerify.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TokenVerify = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`https://passwordresetflow-backend-pttf.onrender.com/users/verify/${token}`);
        if (response.status === 200) {
          setTokenValid(true); // Set token as valid
          // Redirect to the password reset page with the token
          navigate(`/reset-password/${token}`);
        } else {
          setTokenValid(false); // Invalid token, show error
        }
      } catch (error) {
        console.error('Token verification failed', error);
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken(); // Verify token on component mount
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tokenValid) {
    return <div>Invalid or expired token. Please request a new reset link.</div>;
  }

  return null; // Render nothing as it redirects
};

export default TokenVerify;
