import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI } from '../services/api';
import { Search, Filter, MapPin, Edit, Trash2 } from 'lucide-react';

export default function Explore() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [page, setPage] = useState(1);

  const REGIONS = [
    'North India',
    'South India',
    'East India',
    'West India',
    'Northeast India',
    'Central India',
    'Diaspora'
  ];

  useEffect(() => {
    loadRituals();
  }, [page, selectedRegion]);

  const loadRituals = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedRegion) filters.region = selectedRegion;
      
      const response = await ritualsAPI.getAll(page, 12, filters);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        const response = await ritualsAPI.search(searchQuery);
        setRituals(response.data);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Explore Rituals</h1>
          <p className="text-slate-600 text-lg">Discover family traditions and rituals from across India</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals by title, tags, or keywords..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-saffron text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition font-semibold"
            >
              Search
            </button>
          </form>

          {/* Region Filter */}
          {/* <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedRegion('');
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full transition ${
                selectedRegion === ''
                  ? 'bg-saffron text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Regions
            </button>
            {REGIONS.map(region => (
              <button
                key={region}
                onClick={() => {
                  setSelectedRegion(region);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full transition ${
                  selectedRegion === region
                    ? 'bg-saffron text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div> */}
        </div>

        {/* Rituals Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
          </div>
        ) : rituals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rituals.map(ritual => (
                <div
                  key={ritual.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/ritual/${ritual.id}`} className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-saffron transition">
                          {ritual.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{ritual.description}</p>
                      </Link>

                      {user?.id === ritual.userId && (
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

                    <div className="flex items-center gap-2 mb-3 text-slate-500 text-sm">
                      <MapPin size={16} />
                      {ritual.region}
                    </div>

                    <div className="mb-4">
                      <span className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                        {ritual.frequency}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ritual.tags?.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-saffron/10 text-saffron text-xs px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-slate-700 font-medium">Page {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No rituals found</h3>
            <p className="text-slate-600">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
