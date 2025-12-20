import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI } from '../services/api';
import { Heart, MessageCircle, Share2, MapPin, Edit, Trash2 } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRituals();
  }, [page]);

  const loadRituals = async () => {
    try {
      setLoading(true);
      const response = await ritualsAPI.getAll(page, 10);
      setRituals(response.data.rituals);
    } catch (err) {
      console.error('Failed to load rituals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ritualId) => {
    if (!window.confirm('Are you sure you want to delete this ritual?')) return;
    try {
      await ritualsAPI.delete(ritualId);
      setRituals(prev => prev.filter(r => r.id !== ritualId));
    } catch (err) {
      console.error('Failed to delete ritual:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      {!user && (
        <section className="bg-gradient-to-r from-saffron via-green to-navy text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">परंपरा - Parampara</h1>
            <p className="text-xl mb-8">Discover, Share, and Preserve Family Rituals & Traditions</p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-navy px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Join the Community
              </Link>
              <Link
                to="/explore"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Explore Rituals
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {user && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome, {user.full_name}!</h2>
            <p className="text-slate-600">Discover your rituals from the community</p>
          </div>
        )}

        {/* Rituals Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
          </div>
        ) : rituals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rituals.map(ritual => (
              <div
                key={ritual.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/ritual/${ritual.id}`} className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{ritual.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{ritual.description}</p>
                    </Link>
                    {user?.id === ritual.user_id && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => navigate(`/ritual/${ritual.id}/edit`)}
                          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition text-sm"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ritual.id)}
                          className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 transition text-sm"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm">
                    <MapPin size={16} />
                    {ritual.region}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {ritual.tags?.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-saffron/10 text-saffron text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-slate-500">
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart size={16} /> {ritual.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} /> {ritual.comments || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No rituals yet</h3>
            <p className="text-slate-600 mb-6">Be the first to share your family rituals!</p>
            {user && (
              <Link
                to="/create"
                className="bg-saffron text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition inline-block"
              >
                Create a Ritual
              </Link>
            )}
          </div>
        )}

        {/* Pagination */}
        {rituals.length > 0 && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
