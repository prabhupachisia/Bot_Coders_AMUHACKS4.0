import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage/Homepage';
// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css'; // correct path


import Login from "./Pages/login/login";
import Home from './Pages/HomePage/Homepage';
// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css'; // correct path



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>

    <Navbar/>
    <Home/>
  </div>
  <div>
  <Login/></div>
  
  <div>

    <Navbar/>
    <Home/>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
