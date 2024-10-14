import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ThemeContext, ThemeProvider } from './context/ThemeContext'; 

import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import CreatePage from './components/CreatePage/CreatePage';

import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  const { user } = useAuthContext();
  const { theme } = React.useContext(ThemeContext); 

  return (
    <div className={`appContainer ${theme}`}> 
      <BrowserRouter>
        <Header />
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
            path="/create-page" 
            element={user ? <CreatePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/create-post" 
            element={user ? <CreatePost /> : <Navigate to="/login" />} 
          />
        </Routes>
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
