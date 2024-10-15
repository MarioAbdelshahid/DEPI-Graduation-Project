// pages/Home.js
import React from 'react';
import Posts from '../components/Posts/Posts';
import './styles/Home.css';

const Home = () => {
  const userID = localStorage.getItem('userId');
  
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
      
      {/* Posts Component */}
      <Posts userSpecific={userID} />
    </div>
  );
};

export default Home;
