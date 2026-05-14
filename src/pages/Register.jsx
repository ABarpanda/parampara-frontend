import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { statesAPI } from '../services/api';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    state_name: '',
    region: '',
    profile_pic: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
      try {
        const response = await statesAPI.getAll();
        setStates(response.data);
      } catch (err) {
        console.error('Failed to load states:', err);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadProfilePic(formData.profile_pic);
      await register(
        formData.email,
        formData.password,
        formData.full_name,
        formData.state_name,
        imageUrl
      );
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePic = async (file) => {
    if (!file) return null;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const profilePicFormData = new FormData();
    
    profilePicFormData.append('file', file);
    profilePicFormData.append('upload_preset', 'parampara'); 

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: profilePicFormData }
      );
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }
      return data.secure_url; 
    } catch (err) {
      console.error("Cloudinary Error:", err);
      throw err;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          Join Parampara
        </h1>

        {error && (
          <div className="error-alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setFormData(prev => ({ ...prev, profile_pic: file }));
              }}
              className="form-file-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              State
            </label>
            <select
              name="state_name"
              value={formData.state_name}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state.id} value={state.state_name}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>
            
          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-auth"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
