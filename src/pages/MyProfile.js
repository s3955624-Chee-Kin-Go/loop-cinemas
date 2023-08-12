import React from "react";
import { deleteUser, removeUser } from "../data/repository";
import { useNavigate } from "react-router-dom";
import './pagesCSS/MyProfile.css'
import {
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

function MyProfile(props) {

  const navigate = useNavigate();
  // FIX THIS: Implement edit user functionality
  const handleEditUser = (event) => {
    event.preventDefault();
  };

  // Implement remove user functionality
  const handleRemoveUser = (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      // Delete user from localStorage
      deleteUser(props.username)
      // Remove user's data fields
      removeUser();
      // Visual cue for alerting user profile is deleted
      alert("Your profile is now deleted!");
      // Navigate to the home page.
      navigate("/");
      // Refresh page
      navigate(0);
    }
  };

  return (
    <>
      <section className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="edit-icons">
            <MDBBtn outline color="light" floating href='' role='button' className='edit-icon' onClick={handleEditUser}>
              <MDBIcon far icon="edit" style={{fontSize:'1rem'}}/>
            </MDBBtn>
            <MDBBtn outline color="light" floating href='' role='button' className='edit-icon' onClick={handleRemoveUser}>
              <MDBIcon far icon="trash-alt" style={{fontSize:'1rem'}}/>
            </MDBBtn>
          </div>
        </div>
        <h4>Hello, {props.username}!</h4>
        {props.email !== null && <p>Email: {props.email} <br /> Joined: {props.signupDate}</p>}
      </div>
    </section>
    </>
  );
}

export default MyProfile;
