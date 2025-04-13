import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserHome.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');
    const userData = localStorage.getItem('user');

    const isTokenValid =
      accessToken &&
      accessTokenExpiration &&
      new Date(accessTokenExpiration) > new Date();

    if (!isTokenValid) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Parse user data from localStorage
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          throw new Error('User data not found in localStorage.');
        }

        // Fetch consultations
        const consultsRes = await axios.get('http://localhost:5000/v1/consult', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        setAppointments(consultsRes.data.map(consult => ({
          date: consult.date,
          type: consult.type,
          doctor: consult.doctorName,
          status: consult.status
        })));
        setConsultations(consultsRes.data);
      } catch (err) {
        console.error(err);
        setError('Unable to connect to the server. Showing demo data.');

        // Demo fallback data
        setUser({ name: 'Demo User' });
        setAppointments([
          {
            date: '2025-04-15T10:00:00',
            type: 'Dental Checkup',
            doctor: 'Dr. Smith',
            status: 'confirmed'
          },
          {
            date: '2025-04-20T14:30:00',
            type: 'Eye Checkup',
            doctor: 'Dr. Watson',
            status: 'pending'
          }
        ]);
        setConsultations([
          { id: 1, name: 'General Medicine', description: 'Consult a general physician for common ailments.' },
          { id: 2, name: 'Dermatology', description: 'Consult a dermatologist for skin-related concerns.' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5 animate-fade">
      {/* Welcome Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary fw-bold">Welcome Back, {user?.name || 'User'}!</h1>
        <p className="lead">Your health is our priority. Manage your consultations and appointments seamlessly.</p>
      </div>

      {/* Quick Access Cards */}
      <div className="row gy-4">
        {[
          {
            title: 'Start a New Consultation',
            image: '/images/consultation.svg',
            btnText: 'Book Now',
            color: 'primary',
            path: '/consultation'
          },
          {
            title: 'View Upcoming Appointments',
            image: '/images/appointments.svg',
            btnText: 'View Appointments',
            color: 'success',
            path: '/appointments'
          },
          {
            title: 'Manage Your Profile',
            image: '/images/profile.svg',
            btnText: 'Go to Profile',
            color: 'info',
            path: '/profile'
          }
        ].map((item, i) => (
          <div className="col-md-4" key={i}>
            <div className="card shadow-sm border-0 text-center hover-card h-100">
              <img src={item.image} alt={item.title} className="card-img-top mx-auto mt-3" style={{ width: '80px' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <button className={`btn btn-${item.color} mt-auto w-100`} onClick={() => navigate(item.path)}>
                  {item.btnText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Options */}
      <div className="mt-5">
        <h2 className="text-center text-primary mb-4">Choose Your Consultation Type</h2>
        <div className="row gy-3">
          {consultations.length > 0 ? consultations.map((consult, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-info shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{consult.name}</h5>
                  <p className="card-text text-muted">{consult.description}</p>
                  <button className="btn btn-outline-info" onClick={() => navigate(`/consultation/${consult.id}`)}>
                    Select
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-muted">No consultation types available.</p>
          )}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-5">
        <h2 className="text-center text-primary mb-4">Upcoming Appointments</h2>
        <ul className="list-group">
          {appointments.slice(0, 3).map((appt, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              {new Date(appt.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} - {appt.type} with {appt.doctor}
              <span className={`badge bg-${appt.status.toLowerCase() === 'confirmed' ? 'success' : 'warning'} rounded-pill`}>
                {appt.status}
              </span>
            </li>
          ))}
        </ul>
        <button className="btn btn-outline-primary mt-3 w-100" onClick={() => navigate('/appointments')}>
          View All Appointments
        </button>
      </div>

      {/* Health Tips */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h2 className="text-center text-success mb-4">Health Tips for You</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">🥤 Stay hydrated with at least 8 glasses of water.</li>
          <li className="list-group-item">🏃‍♂️ Exercise for 30 minutes daily to stay active.</li>
          <li className="list-group-item">🛌 Sleep for 7-8 hours to help your body recover.</li>
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
