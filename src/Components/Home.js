import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Services from './Services';
import Bikes from './Bikes';
import { useDispatch } from 'react-redux'
import { AddUser } from '../reduxapp/dataSlice';
const Home = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(AddUser({ userName: userData.name, userEmail: userData.email }));
  }, [userData, dispatch]);
  

  return (
    <div>
      <NavBar></NavBar>

      <p>Welcome, {userData.name}! {userData.email}</p>
      <button type="button" onClick={handleLogout} style={{ border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
        Logout
      </button>

      <Bikes />
      <Services></Services>
    </div>
  );
};

export default Home;
