import React from 'react'
import { Link } from 'react-router-dom';

const HeaderNavbar = ( {toggle,setToggle}) => {
  return (
    <nav
      style={{
        clipPath: toggle && "polygon(0 0, 100% 1%, 100% 100%, 0 100%)",
      }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link  to="/" onClick={() => setToggle(false)} className="nav-links">
          <i className="bi bi-house"></i>Home
        </Link>
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-links">
          <i className="bi bi-stickies"></i>posts
        </Link>
        <Link to="posts/create-post" onClick={() => setToggle(false)} className="nav-links">
          <i className="bi bi-journal-plus"></i>Create
        </Link>
        <Link to="admin-dashboard" onClick={() => setToggle(false)} className="nav-links">
          <i className="bi bi-person-check"></i>Adimn Dashboard
        </Link>
      </ul>
    </nav>
  );
}

export default HeaderNavbar
