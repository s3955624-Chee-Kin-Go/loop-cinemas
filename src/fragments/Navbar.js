import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from "./Loop Cinemas Logo.png"

function Navbar(props) {
  return (
    <>
      <div className="navBar">
          <Link className="logo-link" to="/"><img className="img-style" alt="" src={logo}/></Link>
          {props.username !== null &&
              <>
                <div className="other-pages">
                  <Link className="" to="/forum">Forum</Link>
                  {/*Link to Forum and Profile after successfully sign in*/}
                </div>
                <div className="other-pages">
                  <Link className="" to="/profile">Profile</Link>
                </div>
              </>
          }
          {props.username === null ?
            <div className="box">
            <Link className="" to="/sign-in">Sign In</Link>
          </div>
              : 
              <>
              <div className="welcome-text">
                <p>Welcome, {props.username}</p>
              </div>
              <div className="box">
                <Link className="" to="/" onClick={props.logoutUser}>Sign Out</Link>
              </div>
              </>
          }
          
      </div>
    </>
  );
}

export default Navbar;