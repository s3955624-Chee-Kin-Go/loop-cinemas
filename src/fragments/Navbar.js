import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <>
      <div className="navbar">
          <Link to="/">Logo</Link>
          <Link className="nav-link" to="/sign-in">Sign In</Link>
      </div>
    </>
  );
}

export default Navbar;