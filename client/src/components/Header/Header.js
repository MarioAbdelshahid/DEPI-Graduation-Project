// import { Link } from 'react-router-dom';
// import { useLogout } from '../../hooks/useLogout';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { Search, Person, Chat, Notifications, Settings, HelpOutline, ExitToApp } from '@mui/icons-material';
// import { useState } from 'react';
// import './Header.css';
// import {
//   RssFeed,
//   PlayCircleFilledOutlined,
//   Group,
//   Bookmark,
//   WorkOutline,
//   Event,
//   School,
// } from '@mui/icons-material';

// const Header = () => {
//   const { logout } = useLogout();
//   const { user } = useAuthContext();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleClick = () => {
//     logout();
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     if (!isDarkMode) {
//       document.documentElement.setAttribute('data-theme', 'dark');
//     } else {
//       document.documentElement.setAttribute('data-theme', 'light');
//     }
//   };

//   return (
//     <div className="main-container">
//       {/* Header Section */}
//       <header className='header-container'>
//         <div className="header-inner-container">
//           {/* Left section (logo) */}
//           <div className="header-left">
//             <Link to="/">
//               <div className='header-logo'>
//                 <span className="logo">Social Media Platform</span>
//               </div>
//             </Link>
//           </div>

//           {/* Center section (search bar) */}
//           <div className="header-center">
//             <div className="searchbar">
//               <Search className="searchIcon" />
//               <input
//                 placeholder="Search for Dreams"
//                 className="searchInput"
//               />
//             </div>
//           </div>

//           {/* Right section (user profile or auth links) */}
//           <div className="header-right">
//             {user ? (
//               <div className='user-info'>
//                 <span className='user-email'>{user.email}</span>
//                 <button onClick={handleClick} className='logout-button'>Log out</button>
//               </div>
//             ) : (
//               <div className='auth-links'>
//                 <Link to="/login" className='login-link'>Login</Link>
//                 <Link to="/signup" className='signup-link'>Signup</Link>
//               </div>
//             )}

//             {/* Notification and profile icons */}
//             <div className="topbarIcons">
//               <div className="topbarIconItem">
//                 <Person />
//                 <span className="topbarIconBadge">1</span>
//               </div>
//               <div className="topbarIconItem">
//                 <Chat />
//                 <span className="topbarIconBadge">2</span>
//               </div>
//               <div className="topbarIconItem">
//                 <Notifications />
//                 <span className="topbarIconBadge">1</span>
//               </div>
//             </div>

//             {/* Dark mode toggle */}
//             <button onClick={toggleDarkMode} className='dark-mode-toggle'>
//               {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//             </button>

//             {/* User profile picture with dropdown */}
//             <div className="user-profile" onClick={toggleDropdown}>
//               <img src="/assets/person/1.jpeg" alt="User profile" className="topbarImg" />
//               {dropdownOpen && (
//                 <div className="dropdown-menu">
//                   <Link to="/settings" className="dropdown-item">
//                     <Settings /> الإعدادات والخصوصية
//                   </Link>
//                   <Link to="/help" className="dropdown-item">
//                     <HelpOutline /> المساعدة والدعم
//                   </Link>
//                   <div onClick={handleClick} className="dropdown-item logout">
//                     <ExitToApp /> تسجيل الخروج
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Sidebar Section */}
//       <div className="sidebar">
//         <div className="sidebarWrapper">
//           <ul className="sidebarList">
//             <li className="sidebarListItem">
//               <RssFeed className="sidebarIcon" />
//               <span className="sidebarListItemText">Feed</span>
//             </li>
//             <li className="sidebarListItem">
//               <Chat className="sidebarIcon" />
//               <span className="sidebarListItemText">Chats</span>
//             </li>
//             <li className="sidebarListItem">
//               <PlayCircleFilledOutlined className="sidebarIcon" />
//               <span className="sidebarListItemText">Videos</span>
//             </li>
//             <li className="sidebarListItem">
//               <Group className="sidebarIcon" />
//               <span className="sidebarListItemText">Groups</span>
//             </li>
//             <li className="sidebarListItem">
//               <Bookmark className="sidebarIcon" />
//               <span className="sidebarListItemText">Bookmarks</span>
//             </li>
//             <li className="sidebarListItem">
//               <WorkOutline className="sidebarIcon" />
//               <span className="sidebarListItemText">Jobs</span>
//             </li>
//             <li className="sidebarListItem">
//               <Event className="sidebarIcon" />
//               <span className="sidebarListItemText">Events</span>
//             </li>
//             <li className="sidebarListItem">
//               <School className="sidebarIcon" />
//               <span className="sidebarListItemText">Courses</span>
//             </li>
//           </ul>
//           <button className="sidebarButton">Show More</button>
//           <hr className="sidebarHr" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Update the body class based on the new mode
      document.body.className = newMode ? 'dark' : 'light'; // Set body class for theme
      return newMode; // Return new mode for state
    });
  };

  const toggleCreateDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Ensure the correct class is applied to the body on mount
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light'; // Set initial theme class on mount
  }, []);

  return (
    <div className='header-container'>
      <header>
        <div className="header-inner-container">
          <nav className='header-nav'>
            {user ? (
              <div className='user-info'>
                <Link to="/dashboard">
                  <div className='header-logo'>InstaSUI</div>
                </Link>

                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search for posts, users, or pages"
                    className="search-input"
                  />
                </div>

                <div className="create-dropdown">
                  <button onClick={toggleCreateDropdown} className='create-button'>+ Create</button>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <Link to="/create-post" className="dropdown-item">Create Post</Link>
                      <Link to="/create-page" className="dropdown-item">Create Page</Link>
                    </div>
                  )}
                </div>

                <div className="profile-dropdown">
                  <button onClick={toggleProfileDropdown} className='profile-button'>
                    Profile
                  </button>
                  {profileDropdownOpen && (
                    <div className="dropdown-menu">
                      <Link to="/" className="dropdown-item">View Profile</Link>
                      <button onClick={toggleDarkMode} className='dark-mode-toggle'>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      <button onClick={handleClick} className='logout-button'>Log out</button>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className='auth-links'>
                <div className='login-link'>
                  <Link to="/login">Login</Link>
                </div>
                <Link to="/login" className='signup-link'>Signup</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
