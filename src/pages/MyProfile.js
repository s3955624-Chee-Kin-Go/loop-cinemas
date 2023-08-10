import React from "react";
import './pagesCSS/MyProfile.css'

function MyProfile(props) {
  return (
    <>
      <div className="profile">
        <h2>My Profile</h2>
        Hello, {props.username}!
        {props.email !== null && <p>Email: {props.email} <br></br> 
        Joined: {props.signupDate}</p>} {/* Add function to save user's sign up date*/}
      </div>
    </>
  );
}

export default MyProfile;
