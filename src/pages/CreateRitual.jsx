import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI, categoriesAPI, statesAPI } from '../services/api';
import './CreateRitual.css';

export default function CreateRitual() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    state: '',
    significance: '',
    frequency: 'Yearly'
  });

  useEffect(() => {
    loadCategories();
    loadStates();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };  
  
  const loadStates = async () => {
    try {
      const response = await statesAPI.getAll();
      setStates(response.data);
    } catch (err) {
      console.error('Failed to load states:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ritual = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        userId: user.id
      };

      await ritualsAPI.create(ritual);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ritual');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ritual-form-page bg-gradient-body">
      <div className="ritual-form-card">
        <div className="form-inner-card">
          <h1 className="form-title">
            Share Your Family Ritual
          </h1>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="ritual-form">
            <div className="form-group">
              <label className="form-label">
                Ritual Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Diwali Preparation Ritual"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                State *
              </label>
              <select
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="" disabled>Select a State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Describe your ritual in detail. Include what it is, when it's performed, who participates, and what it means to your family..."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Significance
              </label>
              <textarea
                name="significance"
                value={formData.significance}
                onChange={handleChange}
                rows="3"
                placeholder="Why is this ritual important to your family? What values does it represent?"
                className="form-textarea"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Occasional">Occasional</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., family, festival, cooking, celebration"
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? 'Publishing...' : 'Publish Ritual'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
