import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AvailableHospitals.css';

const AvailableHospitals = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/v1/hospitals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHospitals(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch hospitals. Showing demo data.');

        // Fallback demo data
        setHospitals([
          {
            id: 1,
            name: 'City Care Hospital',
            location: 'Downtown',
            specialization: 'Cardiology, Neurology, Orthopedics',
          },
          {
            id: 2,
            name: 'Sunrise Multispeciality',
            location: 'Green Park',
            specialization: 'General Medicine, Pediatrics',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleRegister = (hospitalId) => {
    navigate(`/consultation/register/${hospitalId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary fw-bold mb-4">Available Hospitals</h1>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {error && <div className="alert alert-warning text-center">{error}</div>}

      <div className="row gy-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm rounded-4">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold text-primary">{hospital.name}</h5>
                <p className="mb-1"><strong>Location:</strong> {hospital.location}</p>
                <p className="mb-3 text-muted"><strong>Specializations:</strong> {hospital.specialization}</p>
                <button
                  className="btn btn-success mt-auto w-100 rounded-pill"
                  onClick={() => handleRegister(hospital.id)}
                >
                  Register for Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableHospitals;
