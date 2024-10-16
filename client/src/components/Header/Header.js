
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from "../../image/logo.png"

const Header = ({ openCreatePostPopup, openCreatePagePopup }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Refs for dropdowns
  const createDropdownRef = useRef();
  const profileDropdownRef = useRef();

  const handleClick = () => {
    logout();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.className = newMode ? 'dark' : 'light';
      return newMode;
    });
  };

  const toggleCreateDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createDropdownRef.current && !createDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header-container">
      <header>
        <div className="header-inner-container">
          <nav className="header-nav">
            {user ? (
              <div className="user-info">
                <Link to="/dashboard">
                  <img className='logo' src={logo} ></img>
                </Link>

                <Link to="/discover">
                  <button>Discover</button>
                </Link>

                <div className="create-dropdown" ref={createDropdownRef}>
                  <button
                    onClick={toggleCreateDropdown}
                    className="create-button"
                  >
                    + Create
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <button
                        onClick={openCreatePostPopup}
                        className="dropdown-item"
                      >
                        Create Post
                      </button>
                      <button
                        onClick={openCreatePagePopup}
                        className="dropdown-item"
                      >
                        Create Page
                      </button>
                    </div>
                  )}
                </div>

                <div className="profile-dropdown" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="profile-button"
                  >
                    Profile
                  </button>
                  {profileDropdownOpen && (
                    <div className="dropdown-menu">
                      <button
                        className="view-profile-button"
                        onClick={() => navigate("/")}
                      >
                        View Profile
                      </button>
                      <button
                        onClick={toggleDarkMode}
                        className="dark-mode-toggle"
                      >
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                      <button onClick={handleClick} className="logout-button">
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-links">
                {/* <div className="login-link">
                  <Link to="/login">Login</Link>
                </div>
                <div className="signup-link">
                  <Link to="/login">Signup</Link> */}
                {/* </div> */}
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;


