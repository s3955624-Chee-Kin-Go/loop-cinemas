import React from "react";
import './pagesCSS/MyProfile.css'

function MyProfile(props) {
  return (
    <>
      <div className="section-title">
        <h1>My Profile</h1>
        Hello, {props.username}!
        {props.email !== null && <p>Email: {props.email} <br></br> 
        Joined: {props.joined}</p>}
      </div>
    </>
  );
}

export default MyProfile;
