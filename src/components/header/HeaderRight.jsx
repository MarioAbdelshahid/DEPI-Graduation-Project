import React from 'react'
import { Link } from 'react-router-dom';

const HeaderRight = () => {
  return (
    <div className="header-right">
      <button className="header-right-link">
        <i className="bi bi-box-arrow-in-right"></i>
        <Link to="/login">Login</Link>
      </button>
      <button className="header-right-link">
        <i className="bi bi-person-plus"></i>
        <Link to="register">Register</Link>
      </button>
    </div>
  );
}

export default HeaderRight
