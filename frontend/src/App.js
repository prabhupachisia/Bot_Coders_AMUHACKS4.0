import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage/Homepage';
import Login from './Pages/Login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocRegister from './Pages/DocRegister/DocRegister';
import HosRegister from './Pages/HosRegister/HosRegister';
import UserRegister from './Pages/UserRegister/UserRegister';
import UserProfile from './Pages/User/UserProfile/UserProfile';
import UserHome from './Pages/User/UserHome/UserHome'; // Import the new UserHome component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-home" element={<UserHome />} />

          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/user-home" element={<UserHome />} /> {/* Add the new route for UserHome */}
          <Route path="/careers/doctor-reg" element={<DocRegister />} />
          <Route path="/careers/hospitals-reg" element={<HosRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
