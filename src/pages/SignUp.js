import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyUser } from "../data/repository";
import '../pages/pagesCSS/SignIn.css';

function SignUp(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, password: fields.password };
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const verified = verifyUser(fields.username, fields.password);

    // If verified login the user.
    if(verified === true) {
      props.loginUser(fields.username);

      // Navigate to the home page.
      navigate("/");
      return;
    }

    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    // Set error message.
    setErrorMessage("Username and / or password invalid, please try again.");
  }

  return (
    <section className="signin-section">
      <div className="signin-container">
        <h1>Sign Up</h1>
        <div className="signin-row">
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <label htmlFor="username">Name</label>
                <input name="username" id="username" 
                  value={fields.username} onChange={handleInputChange} />
              </div>
              <div className="form-container">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" 
                  value={fields.email} onChange={handleInputChange} />
              </div>
              <div className="form-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" 
                  value={fields.password} onChange={handleInputChange} />
              </div>
              {errorMessage !== null &&
                <div className="form-container">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              }
              <div className="form-container">
                  <Link className="btn submit-btn" to="/">Create Account</Link>
              </div>
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