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
                <Link className="" to="/forum">Forum</Link>
                <Link className="" to="/profile">Profile</Link>
                {/*Link to Forum and Profile after successfully sign in*/}
              </>
          }
          {props.username === null ?
            <div className="box">
            <Link className="" to="/sign-in">Sign In</Link>
          </div>
              
              : 
              <>
              <p>Welcome, {props.username}</p>
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