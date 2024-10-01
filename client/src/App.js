import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard';
function App() {
  const { user } = useAuthContext()
  return (
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;