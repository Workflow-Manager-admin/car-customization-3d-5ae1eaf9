import React from "react";
import "./NavBar.css";

// PUBLIC_INTERFACE
function NavBar() {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="nav-logo">
        <span role="img" aria-label="car">🚗</span>
        <span className="nav-title">Car Configurator</span>
      </div>
      <div className="nav-user-menu">
        <button className="user-btn" aria-label="User menu">👤</button>
      </div>
    </nav>
  );
}

export default NavBar;
