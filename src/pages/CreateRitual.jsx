import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI, categoriesAPI, statesAPI } from '../services/api';

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

  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-saffron via-green to-navy bg-clip-text text-transparent">
            Share Your Family Ritual
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ritual Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Diwali Preparation Ritual"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State *
              </label>
              <select
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
              >
                <option value="" disabled>Select a State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Describe your ritual in detail. Include what it is, when it's performed, who participates, and what it means to your family..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Significance
              </label>
              <textarea
                name="significance"
                value={formData.significance}
                onChange={handleChange}
                rows="3"
                placeholder="Why is this ritual important to your family? What values does it represent?"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Occasional">Occasional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., family, festival, cooking, celebration"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Ritual'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
