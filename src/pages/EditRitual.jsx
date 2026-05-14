import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ritualsAPI, categoriesAPI, statesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './EditRitual.css';

export default function EditRitual() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    state: "",
    significance: "",
    frequency: "",
    tags: []
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchRitual = async () => {
      try {
        const res = await ritualsAPI.getById(id);

        if (res.data.userId && user?.id !== res.data.userId) {
          navigate("/");
          return;
        }

        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "",
          state: res.data.state || "",
          significance: res.data.significance || "",
          frequency: res.data.frequency || "",
          tags: res.data.tags || []
        });
      } catch (err) {
        setError("Failed to load ritual");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchRitual();
  }, [id, user, navigate]);

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map(t => t.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await ritualsAPI.update(id, formData);
      navigate(`/ritual/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  return (
    <div className="ritual-form-page">
      <div className="ritual-form-card">
        <div className="form-inner-card">
          <h1 className="form-title">Edit Ritual</h1>

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
                <option value="Diaspora">Diaspora / International</option>
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
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')}
                  onChange={handleTagsChange}
                  placeholder="e.g., family, festival, cooking, celebration"
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-submit"
            >
              {saving ? 'Updating...' : 'Update Ritual'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
