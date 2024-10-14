import React, { useState } from 'react';
import Posts from '../components/Posts/Posts'; 
import './styles/Home.css';

const Dashboard = () => {
  const [refreshPosts, setRefreshPosts] = useState(false); 

  const refreshAllPosts = () => {
    setRefreshPosts(prev => !prev);
  };
  
  return (
    <div className="dashboard-container">
      
      <button onClick={refreshAllPosts}>Refresh Posts</button>
      
      <Posts refresh={refreshPosts} />
    </div>
  );
};

export default Dashboard;
