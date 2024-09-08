import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Assuming the same CSS file is used for styling

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle the logout functionality
  const handleLogout = () => {
    // Clear session storage or any other authentication state
    sessionStorage.removeItem('token'); // Assuming token is stored in sessionStorage
    alert('You have been logged out successfully!');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>

      {/* Add your dashboard content here */}
      <div className="dashboard-content">
        <p>Your dashboard content goes here...</p>
      </div>

     

      {/* Logout button */}
      <button className="btn-logout" onClick={handleLogout} style={{ marginLeft: '10px' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
