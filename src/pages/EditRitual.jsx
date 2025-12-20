import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ritualsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function EditRitual() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    region: "",
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
          region: res.data.region || "",
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded"
        />

        <input
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="Region"
          className="w-full border p-3 rounded"
        />

        <input
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          placeholder="Frequency"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="significance"
          value={formData.significance}
          onChange={handleChange}
          placeholder="Significance"
          rows="3"
          className="w-full border p-3 rounded"
        />

        <input
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="Tags (comma separated)"
          className="w-full border p-3 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Ritual"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}