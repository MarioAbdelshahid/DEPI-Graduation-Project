import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className='header-container'>
      <header>
        <div className="header-inner-container">

          <Link to="/">
            <div className='header-logo'>
           
            </div>
          </Link>
          
          <nav className='header-nav'>
            {user ? (
              <div className='user-info'>
                <div className='user-email'><span>Welcome, {user.name}</span></div>
                <button onClick={handleClick} className='logout-button'>Log out</button>
              </div>
            ) : (
              <div className='auth-links'>
                <div className='login-link'>
                  <Link to="/login">Login</Link>
                </div>
                <Link to="/signup" className='signup-link'>Signup</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
