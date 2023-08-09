import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addNewUser, verifyUser } from "../data/repository";
import '../pages/pagesCSS/SignIn.css';

function SignUp(props) {
  const [fields, setFields] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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

    // Check if username, email, and password are empty
    if (fields.username === "" || fields.email === "" || fields.password === "") {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }
    else if (!fields.email.includes("@") || !fields.email.endsWith(".com")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // add new user into localStorage
    addNewUser(fields.username, fields.email, fields.password);

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

    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    // Set error message.
    setErrorMessage("Email and / or password invalid, please try again.");

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
              <div className="form-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" 
                  value={fields.password} onChange={handleInputChange} required/>
              </div>
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