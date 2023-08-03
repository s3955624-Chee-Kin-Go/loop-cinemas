import './App.css';
import Home from "./pages/Home";



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MDBBtn } from 'mdb-react-ui-kit';

function App() {
  return (
    <Router>
        {/* <Navbar username={username} logoutUser={logoutUser} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        {/* <Footer /> */}
    </Router>
  );
}

export default App;
