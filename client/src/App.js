// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ThemeContext, ThemeProvider } from './context/ThemeContext'; 

import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import CreatePage from './components/CreatePage/CreatePage';

import PageDetails from './pages/PageDetails';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';

import './App.css';

function App() {
  const { user } = useAuthContext();
  const { theme } = React.useContext(ThemeContext);
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false);
  const [showCreatePagePopup, setShowCreatePagePopup] = useState(false);

  // Functions to open/close pop-ups
  const openCreatePostPopup = () => setShowCreatePostPopup(true);
  const closeCreatePostPopup = () => setShowCreatePostPopup(false);
  const openCreatePagePopup = () => setShowCreatePagePopup(true);
  const closeCreatePagePopup = () => setShowCreatePagePopup(false);

  const handlePostCreated = () => {
    console.log('Post has been created.');
    // Any additional actions after creating a post
  };

  const handlePageCreated = () => {
    console.log('Page has been created.');
    // Any additional actions after creating a page
  };

  return (
    <div className={`appContainer ${theme}`}>
      <BrowserRouter>
        <Header
          openCreatePostPopup={openCreatePostPopup}
          openCreatePagePopup={openCreatePagePopup}
        />
        <Routes>
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/discover" 
            element={user ? <Discover /> : <Navigate to="/login" />}
          />
          <Route 
            path="/pages/:pageId" 
            element={user ? <PageDetails /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* Render Create Post Popup */}
        {showCreatePostPopup && (
          <CreatePost onClose={closeCreatePostPopup} onPostCreated={handlePostCreated} />
        )}

        {/* Render Create Page Popup */}
        {showCreatePagePopup && (
          <CreatePage onClose={closeCreatePagePopup} onPageCreated={handlePageCreated} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
