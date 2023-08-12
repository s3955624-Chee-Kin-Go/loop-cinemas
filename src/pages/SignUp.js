import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addNewUser, verifyUser } from "../data/repository";
import '../pages/pagesCSS/SignIn.css';

function SignUp(props) {
  const [fields, setFields] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const navigate = useNavigate();

  // constant variable for sign up date and its format
  const todayDate = new Date();
  const dateFormat = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, email: fields.email, password: fields.password};
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    var signUpError = false;

    // Check if username, email, and password are empty
    if (fields.username === "" || fields.email === "" || fields.password === "") {
      setErrorMessage("Please fill in all the required fields.");
      signUpError = true;
    }
    else if (fields.username !== "" && fields.email !== "" && fields.password !== "" && errorMessage !== null) {
      setErrorMessage(null);
    }

    // Email Validation (checking if it includes @, ends with .com, and has a domain name)
    if (!fields.email.includes("@") || !fields.email.endsWith(".com") || fields.email.indexOf("@") === fields.email.indexOf(".") - 1) {
      setEmailErrorMessage("Please enter a valid email address.");
      signUpError = true;
    }
    else if (fields.email.includes("@") && fields.email.endsWith(".com") && fields.email.indexOf("@") !== fields.email.indexOf(".") - 1 && emailErrorMessage !== null) {
      setEmailErrorMessage(null);
    }

    // Password Validation (checking if it is at least 8 characters long)
    if (fields.password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      signUpError = true;
    }
    // Password Validation (checking if it contains at least one special character)
    else if (!fields.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
      setPasswordErrorMessage("Password must contain at least one special character.");
      signUpError = true;
    }
    else if (fields.password.length > 8 && fields.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) && passwordErrorMessage !== null) {
      setPasswordErrorMessage(null);
    }

    if (signUpError === true) {
      return;
    }

    // // Email Validation (checking if it includes @, ends with .com, and has a domain name)
    // else if (!fields.email.includes("@") || !fields.email.endsWith(".com") || fields.email.indexOf("@") === fields.email.indexOf(".") - 1) {
    //   setErrorMessage("Please enter a valid email address.");
    //   return;
    // }
    // // Password Validation (checking if it is at least 8 characters long)
    // else if (fields.password.length < 8) {
    //   setErrorMessage("Password must be at least 8 characters long.");
    //   return;
    // }
    // // Password Validation (checking if it contains at least one special character)
    // else if (!fields.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
    //   setErrorMessage("Password must contain at least one special character.");
    //   return;
    // }

    // add new user into localStorage
    addNewUser(fields.username, fields.email, fields.password, todayDate.toLocaleDateString('en-GB', dateFormat));

    const verified = verifyUser(fields.email, fields.password);
    
    // If verified login the user.
    if(verified === true) {
      props.loginUser(fields.email);
      alert('Sign Up Successfull!');
      // Navigate to the home page.
      navigate("/");
      // Refresh page
      navigate(0);
      return;
    }
  }

  return (
    <section className="signin-section">
      <div className="signin-container">
        <h1>Sign Up</h1>
        <div className="signin-row">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-container">
                <label htmlFor="username">Name</label>
                <input name="username" id="username" 
                  value={fields.username} onChange={handleInputChange} required/>
              </div>
              <div className="form-container">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required 
                  value={fields.email} onChange={handleInputChange} />
              </div>
              {emailErrorMessage !== null &&
                <div className="form-container">
                  <span className="text-danger">{emailErrorMessage}</span>
                </div>
              }
              <div className="form-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" 
                  value={fields.password} onChange={handleInputChange} required/>
              </div>
              {passwordErrorMessage !== null &&
                <div className="form-container">
                  <span className="text-danger">{passwordErrorMessage}</span>
                </div>
              }
              <div className="form-container">
                  <input type="submit" className="btn submit-btn" value="SIGN UP" />
              </div>
              {errorMessage !== null &&
                <div className="form-container">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              }
              <div className="form-container">
                <p className="signup-prompt">Already have an account?</p>
                  <Link className="btn submit-btn" to="/sign-in">Sign In</Link>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;