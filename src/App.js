import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyProfile from "./pages/MyProfile";
import Forum from "./pages/Forum";
import SignUp from "./pages/SignUp";
import { getUser, getEmail, getPassword, getSignUpDate, removeUser } from "./data/repository";

function App() {
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [password, setPasword] = useState(getPassword());
  const [signupDate, setSignUpDate] = useState(getSignUpDate());

  const loginUser = (username, email, password, signupdate) => {
    setUsername(username);
    setEmail(email);
    setPasword(password);
    setSignUpDate(signupdate);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
    setEmail(null);
    setPasword(null);
    setSignUpDate(null);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar username={username} logoutUser={logoutUser}/>
        <main>
          <div className="">
            <Routes>
              <Route path="/" element={<Home username={username} />} />
              <Route path="/sign-in" element={<SignIn loginUser={loginUser} />} />
              <Route path="/sign-up" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile username={username} email={email} signupDate={signupDate}/>} />
              <Route path="/forum" element={<Forum username={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
