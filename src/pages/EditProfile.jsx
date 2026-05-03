import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI, statesAPI } from '../services/api';
import './EditProfile.css';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    state_name: '',
    region: '',
    profile_pic: null
  });
  const [existingPic, setExistingPic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    loadStates();
    // load current user profile to prefill form
    const loadProfile = async () => {
      try {
        const res = await usersAPI.getMyProfile();
        const data = res.data || {};
        setFormData(prev => ({
          ...prev,
          full_name: data.full_name || '',
          email: data.email || '',
          state_name: data.state_name || '',
          region: data.region || '',
          password: '',
          confirmPassword: ''
        }));
        setExistingPic(data.profile_pic || null);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    setError("");
    setLoading(true);

    try {
      let imageUrl = null;
      // if user chose a new file, upload it; otherwise keep existingPic
      if (formData.profile_pic instanceof File) {
        imageUrl = await uploadProfilePic(formData.profile_pic);
      } else {
        imageUrl = existingPic;
      }

      const newFormData = { 
        ...formData, 
        profile_pic: imageUrl
      };

      await usersAPI.updateMyProfile(newFormData);
      alert("Profile updated successfully!\nPlease login again.");
      logout();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePic = async (file) => {
    // If no file is selected, return null immediately
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
      throw err; // Throw so handleSubmit catches it
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h1 className="edit-profile-title">
          Update your profile
        </h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Your Name"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0] || null; // Handle cancellation
                setFormData(prev => ({ ...prev, profile_pic: file }));
                // clear existing preview if user selects a new file
                if (file) setExistingPic(null);
              }}
              className="file-input"
            />
          {existingPic && (
            <div className="current-pic-container">
              <p className="current-pic-label">Current picture:</p>
              <img src={existingPic} alt="Profile" className="current-pic-img" />
            </div>
          )}
          </div>

          {/* State */}
          <div className="form-group">
            <label>State</label>
            <select
              name="state_name"
              value={formData.state_name}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state.id} value={state.state_name}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
