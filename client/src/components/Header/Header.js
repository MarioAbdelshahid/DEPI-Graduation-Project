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
import { useState } from 'react';
import './Header.css';

const Header = ({onSearch}) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    logout();
  };

  // const handleSearch = (event) => {
  //   const value = event.target.value;
  //   setSearchTerm(value);
  //   onSearch(value); 
  // };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  const toggleCreateDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <div className='header-container'>
      <header>
        <div className="header-inner-container">



          <nav className='header-nav'>
            {user ? (
              
              <div className='user-info'>

                <Link to="/dashboard">
                  <div className='header-logo'>
                    InstaSUI
                  </div>
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
                      <button onClick={toggleDarkMode} className='dark-mode-toggle'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
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


          {/* <nav className='header-nav'>
            {user ? (
              <div className='user-info'>
                <Link to="/dashboard" className='nav-link'>Home</Link>
                <div className='user-email'><span>Welcome, {user.name}</span></div>
                <Link to="/" className='nav-link'>User-Feed</Link>
                <button onClick={handleClick} className='logout-button'>Log out</button>
              </div>
            ) : (
              <div className='auth-links'>
                <div className='login-link'>
                  <Link to="/login">Login</Link>
                </div>
                <Link to="/login" className='signup-link'>Signup</Link>
              </div>
            )}
          </nav> */}
        </div>
      </header>
    </div>
  );
};

export default Header;

//  THIS IS THE ALTERNATE HEADER'S **CSS CODE**
// .header-container {
//   background-color: #ffffff; /* Background color for the header */
//   border-bottom: 1px solid #ccc; /* Bottom border */
//   padding: 10px 20px; /* Padding for the header */
// }

// .header-inner-container {
//   display: flex;
//   align-items: center; /* Center items vertically */
//   justify-content: space-between; /* Space between elements */
// }

// .header-logo {
//   font-size: 24px; /* Logo font size */
//   font-weight: bold; /* Bold logo */
//   color: #333; /* Logo color */
//   cursor: pointer; /* Change cursor to pointer on hover */
// }

// .header-nav {
//   display: flex;
//   align-items: center; /* Center items vertically */
// }

// .search-container {
//   margin: 0 20px; /* Margin around the search bar */
//   flex-grow: 1; /* Allow search bar to grow and fill space */
// }

// .search-input {
//   width: 100%; /* Full width of the container */
//   padding: 8px; /* Padding for the search input */
//   border: 1px solid #ccc; /* Border around the input */
//   border-radius: 4px; /* Rounded corners */
// }

// .create-dropdown {
//   position: relative; /* Position relative for dropdown positioning */
//   margin-right: 20px; /* Margin for spacing */
// }

// .create-button {
//   padding: 8px 12px; /* Button padding */
//   border: none; /* Remove default border */
//   background-color: #007bff; /* Button background color */
//   color: white; /* Button text color */
//   border-radius: 4px; /* Rounded corners */
//   cursor: pointer; /* Change cursor to pointer on hover */
// }

// .create-button:hover {
//   background-color: #0056b3; /* Darker shade on hover */
// }

// .dropdown-menu {
//   position: absolute; /* Absolute positioning for dropdown */
//   top: 100%; /* Position below the button */
//   left: 0; /* Align left */
//   background: white; /* Background color */
//   border: 1px solid #ccc; /* Border for dropdown */
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Shadow for dropdown */
//   z-index: 1000; /* Ensure dropdown appears above other elements */
//   min-width: 160px; /* Minimum width */
// }

// .dropdown-item {
//   display: block; /* Each item takes full width */
//   padding: 10px 15px; /* Padding for dropdown items */
//   text-decoration: none; /* Remove underline */
//   color: #333; /* Text color */
// }

// .dropdown-item:hover {
//   background: #f0f0f0; /* Highlight on hover */
// }

// .profile-dropdown {
//   position: relative; /* Position relative for dropdown positioning */
//   margin-right: 20px; /* Margin for spacing */
// }

// .profile-button {
//   padding: 8px 12px; /* Button padding */
//   border: none; /* Remove default border */
//   background-color: transparent; /* Transparent background */
//   color: #333; /* Text color */
//   cursor: pointer; /* Change cursor to pointer on hover */
// }

// .user-info {
//   display: flex; /* Flexbox layout for user info */
//   align-items: center; /* Center items vertically */
// }

// .user-email {
//   margin-right: 20px; /* Space between email and logout button */
//   font-weight: 500; /* Bold email */
// }

// .logout-button {
//   background-color: transparent; /* Transparent background */
//   border: none; /* Remove default border */
//   color: #d9534f; /* Logout button color */
//   cursor: pointer; /* Change cursor to pointer on hover */
// }

// .dark-mode-toggle {
//   margin-left: 20px; /* Margin for spacing */
//   background: none; /* No background */
//   border: none; /* No border */
//   color: #007bff; /* Dark mode button color */
//   cursor: pointer; /* Change cursor to pointer */
// }

// .auth-links {
//   display: flex; /* Flex layout for auth links */
// }

// .login-link, .signup-link {
//   margin-left: 10px; /* Space between links */
//   text-decoration: none; /* Remove underline */
//   color: #007bff; /* Link color */
// }

// .login-link:hover, .signup-link:hover {
//   text-decoration: underline; /* Underline on hover */
// }

// /* Responsive styles */
// @media (max-width: 768px) {
//   .header-inner-container {
//     flex-direction: column; /* Stack elements vertically */
//     align-items: flex-start; /* Align items to the start */
//   }

//   .search-container {
//     margin: 10px 0; /* Margin for search on mobile */
//     width: 100%; /* Full width on mobile */
//   }

//   .header-nav {
//     flex-wrap: wrap; /* Allow wrapping */
//   }

//   .user-info {
//     margin-top: 10px; /* Space between user info and other elements */
//   }
// }
