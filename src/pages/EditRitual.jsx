import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ritualsAPI, categoriesAPI, statesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function EditRitual() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);

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
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    state: "",
    significance: "",
    frequency: "",
    tags: []
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Ritual</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
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
                <option value="Diaspora">Diaspora / International</option>
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
  );
}