import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Services from './Services';

const Home = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:4500/protected', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.data.user) {
          setUserData(response.data.user);
          console.log(response.data);
        } else {
          console.error('User data not available');
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    checkAuthentication();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <NavBar></NavBar>

      <p>Welcome, {userData.name}!</p>
      <a href='' onClick={handleLogout}>Logout</a>
      <Services></Services>
    </div>
  );
};

export default Home;
