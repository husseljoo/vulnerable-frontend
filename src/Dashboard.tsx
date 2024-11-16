import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data from the backend API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard', {
          method: 'GET', // Adjust to POST or other methods if needed
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` // Assuming JWT token is saved in localStorage
          },
        });

        if (!response.ok) {
          navigate('/login');
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        setUserName(data.user_name);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <p>Welcom to your Dashboard</p>
      <h1>Hi, {userName}!</h1>
    </div>
  );
}

export default Dashboard;
