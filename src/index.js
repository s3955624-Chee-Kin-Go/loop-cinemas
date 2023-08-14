import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { initMovies, initUsers, initReviews } from "./data/repository";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

// Initialise local storage data.
initMovies();
initUsers();
initReviews();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
