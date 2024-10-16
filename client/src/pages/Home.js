// pages/Home.js
import React from 'react';
import Posts from '../components/Posts/Posts';
import './styles/Home.css';

const Home = () => {
  const userID = localStorage.getItem('userId');
  
  return (
    <div className="home-container">
      <h1>Your User-Feed</h1>
      <p>Your Posts</p>

      {/* Posts Component */}
      <Posts userSpecific={userID} />
    </div>
  );
};

export default Home;
