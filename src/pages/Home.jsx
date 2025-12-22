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
                className="group relative bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                <Link 
                  to={`/ritual/${ritual.id}`} 
                  className="absolute inset-0 z-0" 
                  aria-label={`View ${ritual.title}`}
                />

                <div className="p-5 flex flex-col h-full relative z-10 pointer-events-none">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-saffron transition-colors">
                      {ritual.title}
                    </h3>
                    
                    {user?.id === ritual.user_id && (
                      <div className="flex gap-1.5 pointer-events-auto shrink-0">
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/ritual/${ritual.id}/edit`); }}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center gap-1 text-xs font-medium"
                          title="Edit Ritual"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(ritual.id); }}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-1 text-xs font-medium"
                          title="Delete Ritual"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {ritual.description}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <MapPin size={14} className="shrink-0" />
                      <span className="truncate">{ritual.region}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ritual.tags?.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-600 text-[10px] tracking-wider px-2 py-1 rounded-md border border-orange-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-50 flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-1 text-xs">
                        <Heart size={14} className={ritual.likes > 0 ? "text-red-400 fill-red-400" : ""} />
                        <span>{ritual.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <MessageCircle size={14} />
                        <span>{ritual.comments || 0}</span>
                      </div>
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
