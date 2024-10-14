import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import CreatePage from './components/CreatePage/CreatePage';

import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import './App.css';


// import Rightbar from './rightbar/Rightbar';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Header />
      <div className="appContainer"> 
        {/* <Rightbar profile={false} />  */}
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
      </div>
    </BrowserRouter>
  );
}

export default App;
