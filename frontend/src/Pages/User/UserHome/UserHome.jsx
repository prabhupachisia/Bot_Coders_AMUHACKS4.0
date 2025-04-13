


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
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          throw new Error('User data not found in localStorage.');
        }

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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5 animate-fade">
      {/* Welcome Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary fw-bold">Welcome Back, {user?.name || 'User'}!</h1>
        <p className="lead text-muted">Your health is our priority. Manage your consultations and appointments seamlessly.</p>
      </div>

      {/* Consultation Options */}
      <section className="mb-5">
        <h2 className="text-center text-primary mb-4">Consultation Options</h2>
        <div className="row gy-4 justify-content-center">
          {/* Hospital Card */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 text-center hover-card h-100 bg-light rounded-4 transition">
              <div className="card-body d-flex flex-column px-4 py-5">
                <img src="/images/hospital.svg" alt="Hospital Consultation" className="mb-3 mx-auto" style={{ width: '70px' }} />
                <h5 className="card-title fw-semibold">Hospital Consultation</h5>
                <p className="text-muted small">Connect with hospitals for specialized treatments and multi-department services.</p>
                <button className="btn btn-outline-primary mt-auto w-100" onClick={() => navigate('/consultation/hospital')}>
                  Choose Hospital
                </button>
              </div>
            </div>
          </div>

          {/* Doctor Carbtn btn-success btn-block mt-auto rounded-pilld */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 text-center hover-card h-100 bg-light rounded-4 transition">
              <div className="card-body d-flex flex-column px-4 py-5">
                <img src="/images/doctor.svg" alt="Doctor Consultation" className="mb-3 mx-auto" style={{ width: '70px' }} />
                <h5 className="card-title fw-semibold">Doctor Consultation</h5>
                <p className="text-muted small">Directly consult with experienced doctors across multiple specialties.</p>
                <button className="btn btn-outline-primary mt-auto w-100" onClick={() => navigate('/consultation/doctor')}>
                  Choose Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="mt-5">
        <h2 className="text-center text-primary mb-4">Your Dashboard</h2>
        <div className="row gy-4 justify-content-center">
          {/* Profile Card */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 text-center hover-card h-100 bg-light rounded-4 transition">
              <img src="/images/profile.svg" alt="Manage Your Profile" className="card-img-top mx-auto mt-4" style={{ width: '80px' }} />
              <div className="card-body d-flex flex-column px-4 py-4">
                <h5 className="card-title fw-semibold">Manage Your Profile</h5>
                <p className="text-muted small">Update your personal information, contact details, and health preferences.</p>
                <button className="btn btn-outline-primary mt-auto w-100" onClick={() => navigate('/profile')}>
                  Go to Profile
                </button>
              </div>
            </div>
          </div>

          {/* Consultation History Card */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 text-center hover-card h-100 bg-light rounded-4 transition">
              <div className="card-body d-flex flex-column px-4 py-4">
                <img src="/images/history.svg" alt="Consultation History" className="mb-3 mx-auto" style={{ width: '70px' }} />
                <h5 className="card-title fw-semibold">Recent Consultations</h5>
                <ul className="list-group list-group-flush text-start mt-3 mb-3">
                  {appointments.slice(0, 3).map((appt, idx) => (
                    <li key={idx} className="list-group-item border-0 ps-0 small">
                      <strong>{new Date(appt.date).toLocaleDateString()}</strong> – {appt.type} with <em>{appt.doctor}</em>
                      <span className={`badge bg-${appt.status === 'confirmed' ? 'success' : 'warning'} float-end`}>{appt.status}</span>
                    </li>
                  ))}
                  {appointments.length === 0 && (
                    <li className="list-group-item border-0 text-muted ps-0 small">No recent consultations found.</li>
                  )}
                </ul>
                <button className="btn btn-outline-primary mt-auto w-100" onClick={() => navigate('/consultation/history')}>
                  View Full History
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Tips */}
      <section className="mt-5 p-4 rounded shadow-sm bg-white">
        <h2 className="text-center text-success mb-4">Health Tips for You</h2>
        <ul className="list-group list-group-flush fs-6">
          <li className="list-group-item">🥤 Stay hydrated with at least 8 glasses of water.</li>
          <li className="list-group-item">🏃‍♂️ Exercise for 30 minutes daily to stay active.</li>
          <li className="list-group-item">🛌 Sleep for 7-8 hours to help your body recover.</li>
        </ul>
      </section>
    </div>
  );
};

export default UserHome;

