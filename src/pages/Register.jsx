import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { statesAPI } from '../services/api';

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
      // 1. Get the URL (will be a string or null)
      const imageUrl = await uploadProfilePic(formData.profile_pic);
      // console.log(imageUrl);
      
      // 2. Pass that URL directly into your register function
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron/10 via-green/10 to-navy/10 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-saffron via-green to-navy bg-clip-text text-transparent">
            Join Parampara
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                placeholder="Your Name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                name="profile_pic"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0] || null; // Handle cancellation
                  setFormData(prev => ({ ...prev, profile_pic: file }));
                }}
                className="w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-saffron/10 file:text-saffron
                  hover:file:bg-saffron/20
                  cursor-pointer"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State
              </label>
              <select
                name="state_name"
                value={formData.state_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
              >
                <option value="">Select your state</option>
                {states.map((state) => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Field with Auto-suggest */}
            {/* <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Region
              </label>
              <input
                type="text"
                name="region"
                list="region-list" // Connects to the datalist below
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                placeholder="Type or select a region"
              />
              <datalist id="region-list">
                {REGION.map((reg) => (
                  <option key={reg} value={reg} />
                ))}
              </datalist>
            </div> */}
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-saffron font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
