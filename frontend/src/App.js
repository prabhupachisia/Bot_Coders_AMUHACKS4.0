import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage/Homepage';
import Login from './Pages/Login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocRegister from './Pages/DocRegister/DocRegister';
import HosRegister from './Pages/HosRegister/HosRegister';
import UserRegister from './Pages/UserRegister/UserRegister';
import UserProfile from './Pages/User/UserProfile/UserProfile';
import UserHome from './Pages/User/UserHome/UserHome';
import DoctorHome from './Pages/Doctor/DocHome';        // Add this file
import HospitalHome from './Pages/Hospital/HosHome';  // Add this file
import DocProfile from './Pages/Doctor/DocProfile';
import DocView from './Pages/Doctor/DocView';      // Add this file

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/doc-home" element={<DoctorHome />} />
          <Route path="/doctor-profile" element={<DocProfile />} />
          <Route path="/hos-home" element={<HospitalHome />} />
          <Route path="/careers/doctor-reg" element={<DocRegister />} />
          <Route path="/careers/hospitals-reg" element={<HosRegister />} />
          <Route path="/doctor/treat/:consultId" element={<DocView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
