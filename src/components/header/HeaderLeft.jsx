import React from 'react'

const HeaderLeft = ({toggle,setToggle}) => {
  return (
    <div className="header-left">
      <div className="header-logo">
        <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
          {toggle ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </div>
        <strong>Blog</strong>
        <i className="bi bi-pencil"></i>
      </div>
    </div>
  );
}

export default HeaderLeft
