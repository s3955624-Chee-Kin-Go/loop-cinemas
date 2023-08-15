import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyProfile from "./pages/MyProfile";
import Review from "./pages/Review";
import SignUp from "./pages/SignUp";
import { getUser, getEmail, getPassword, getSignUpDate, getIndex, removeUser } from "./data/repository";

function App() {
  const [index, setIndex] = useState(getIndex());
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [password, setPasword] = useState(getPassword());
  const [signupDate, setSignUpDate] = useState(getSignUpDate());

  const loginUser = (username, email, password, signupdate, index) => {
    setUsername(username);
    setEmail(email);
    setPasword(password);
    setSignUpDate(signupdate);
    setIndex(index);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
    setEmail(null);
    setPasword(null);
    setSignUpDate(null);
    setIndex(null);
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
              <Route path="/profile" element={<MyProfile index={index} username={username} email={email} signupDate={signupDate}/>} />
              <Route path="/review" element={<Review username={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
