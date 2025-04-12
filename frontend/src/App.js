import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage/Homepage';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocRegister from './Pages/DocRegister/DocRegister';
import HosRegister from './Pages/HosRegister/HosRegister';
import UserRegister from './Pages/UserRegister/UserRegister';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          
          {/* Add more routes as needed */}
          <Route path="/careers/doctor-reg" element={<DocRegister />} />
          <Route path="/careers/hospitals-reg" element={<HosRegister />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
