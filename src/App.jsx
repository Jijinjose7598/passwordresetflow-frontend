import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './pages/ForgetPassword'; // Import Forgot Password page
import TokenVerify from './pages/TokenVerify';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify/:token" element={<TokenVerify />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
       < Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
