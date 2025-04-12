import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const accessToken = JSON.parse(localStorage.getItem('tokens'))?.access?.token;
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken || !userId) {
        setStatus('No user data found. Please login again.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setStatus('Failed to load user data.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
      setFormData(response.data);
      setStatus('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
      setStatus('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-0 rounded-4">
        <h2 className="mb-4 text-center">User Profile</h2>
        {status && <div className="alert alert-info text-center">{status}</div>}

        {!editMode ? (
          <>
            <div className="row">
              {[
                { label: 'Name', value: user.name },
                { label: 'Email', value: user.email },
                { label: 'Phone', value: user.phone },
                { label: 'Role', value: user.role },
                { label: 'Street', value: user.street },
                { label: 'City', value: user.city },
                { label: 'State', value: user.state },
                { label: 'Country', value: user.country },
                { label: 'Pin Code', value: user.pinCode },
              ].map((item, i) => (
                <div className="col-md-6 mb-3" key={i}>
                  <strong>{item.label}</strong>
                  <div className="form-control bg-light">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary px-4" onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="row">
              {[
                'name', 'email', 'phone', 'street', 'city', 'state', 'country', 'pinCode'
              ].map((field, i) => (
                <div className="col-md-6 mb-3" key={i}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className="form-control"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="patient">Patient</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-success me-2" type="submit">Save Changes</button>
              <button className="btn btn-secondary" type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
