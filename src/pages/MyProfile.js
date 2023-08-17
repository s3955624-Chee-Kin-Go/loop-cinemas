import React, { useState } from "react";
import { updateUser, deleteUser, removeUser, sortMovies } from "../data/repository";
import { useNavigate } from "react-router-dom";
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody
} from 'mdb-react-ui-kit';
import './pagesCSS/MyProfile.css';
import '../pages/pagesCSS/SignIn.css';

function MyProfile(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ username: (props.username), email: (props.email)});
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [EditProfileModal, setEditProfileModal] = useState(false);
  const toggleShow = () => setEditProfileModal(!EditProfileModal);

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
      // Sort Movies
      sortMovies();
      // Navigate to the home page.
      navigate("/");
      // Refresh page
      navigate(0);
    }
  };

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, email: fields.email};
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  // Generic submit handler.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Set variable for edit profile error due to fail validation
    var editProfileError = false;

    // Check if username, email, and password are empty
    if (fields.username === "" || fields.email === "") {
      setErrorMessage("Please fill in all the required fields.");
      editProfileError = true;
    }
    else if (fields.username !== "" && fields.email !== "" && errorMessage !== null) {
      setErrorMessage(null);
    }

    // Email Validation (checking if it includes @, ends with .com, and has a domain name)
    if (!fields.email.includes("@") || !fields.email.endsWith(".com") || fields.email.indexOf("@") === fields.email.indexOf(".") - 1) {
      setEmailErrorMessage("Please enter a valid email address.");
      editProfileError = true;
    }
    else if (fields.email.includes("@") && fields.email.endsWith(".com") && fields.email.indexOf("@") !== fields.email.indexOf(".") - 1 && emailErrorMessage !== null) {
      setEmailErrorMessage(null);
    }

    // Terminate handleSubmit if fail validation
    if (editProfileError === true) {
      return;
    }

    // update user in localStorage
    updateUser(fields.username, fields.email, props.index);

    // Navigate to the profile page.
    navigate("/profile");
    // Refresh page
    navigate(0);
    return;
  }

  return (
    <>
      <section className="profile-section">
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Profile</h1>
            <div className="edit-icons">
              <MDBBtn outline color="light" floating role="button" className="edit-icon" onClick={toggleShow}>
                <MDBIcon far icon="edit" style={{ fontSize: "1rem" }} />
              </MDBBtn>
              <MDBBtn outline color="light" floating role="button" className="edit-icon" onClick={handleRemoveUser}>
                <MDBIcon far icon="trash-alt" style={{ fontSize: "1rem" }} />
              </MDBBtn>
            </div>
          </div>
          <h4>Hello, {props.username}!</h4>
          {props.email !== null && (
            <p>
              Email: {props.email} <br /> Joined: {props.signupDate}
            </p>
          )}
        </div>
      </section>

      <MDBModal show={EditProfileModal} setShow={setEditProfileModal} tabIndex="-1" centered>
        <MDBModalDialog centered style={{ maxWidth: "35%" }} size="lg">
          <MDBModalContent style={{backgroundColor: "black", border: "2px solid #E50815", borderRadius: "0px",}}>
            <MDBModalBody style={{ padding: "0" }}>
              <section className="signin-section" style={{ padding: "0" }}>
                <div className="signin-container" style={{ margin: "0", width: "auto", border: "none", borderRadius: "0px" }}>
                  <h1>Edit Profile</h1>
                  <div className="signin-row">
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-container">
                        <label htmlFor="username">Name</label>
                        <input name="username" id="username" value={fields.username} onChange={handleInputChange} required />
                      </div>
                      <div className="form-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required value={fields.email} onChange={handleInputChange}/>
                      </div>
                      {emailErrorMessage !== null && (
                        <div className="form-container">
                          <span className="text-danger">
                            {emailErrorMessage}
                          </span>
                        </div>
                      )}
                      <div className="form-container">
                        <input type="submit" className="btn submit-btn" value="UPDATE" style={{ marginRight: "1rem" }} />
                        <input type="button" className="btn submit-btn" onClick={toggleShow} value="CANCEL"/>
                      </div>
                      {errorMessage !== null && (
                        <div className="form-container">
                          <span className="text-danger">{errorMessage}</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </section>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default MyProfile;
