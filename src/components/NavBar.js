import React from 'react';

const NavBar = ({ children }) => {
  return (
    <div className="navbar">
      {children}
    </div>
  )
}

export default NavBar;