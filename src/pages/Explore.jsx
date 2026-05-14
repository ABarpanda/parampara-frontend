import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI } from '../services/api';
import { Search, Filter, MapPin, Edit, Trash2, Heart, MessageCircle } from 'lucide-react';
import './Explore.css';

export default function Explore() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [page, setPage] = useState(1);

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
    <div className="explore-page">
      <div className="explore-container">
        <div className="header-section">
          <h1 className="page-title">Explore Rituals</h1>
          <p className="page-subtitle">Discover family traditions and rituals from across India</p>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals by title, tags, or keywords..."
                className="search-input"
              />
            </div>
            <button
              type="submit"
              className="search-button"
            >
              Search
            </button>
          </form>
        </div>

        {/* Rituals Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner animate-spin"></div>
          </div>
        ) : rituals.length > 0 ? (
          <div className="rituals-grid">
            {rituals.map(ritual => (
              <div
                key={ritual.id}
                className="ritual-card"
              >
                <Link 
                  to={`/ritual/${ritual.id}`} 
                  className="ritual-link" 
                  aria-label={`View ${ritual.title}`}
                />

                <div className="card-content">
                  <div className="card-header">
                    <h3 className="ritual-title">
                      {ritual.title}
                    </h3>
                    
                    {user?.id === ritual.user_id && (
                      <div className="card-actions">
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/ritual/${ritual.id}/edit`); }}
                          className="edit-btn"
                          title="Edit Ritual"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(ritual.id); }}
                          className="delete-btn"
                          title="Delete Ritual"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="ritual-description">
                    {ritual.description}
                  </p>

                  <div className="card-footer">
                    <div className="ritual-location">
                      <MapPin size={14} className="shrink-0" />
                      <span className="location-text">{ritual.state}</span>
                    </div>

                    <div className="tags-container">
                      {ritual.tags?.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="stats-container">
                      <div className="stat-item">
                        <Heart size={14} className={ritual.likes > 0 ? "heart-icon active" : "heart-icon"} />
                        <span>{ritual.likes || 0}</span>
                      </div>
                      <div className="stat-item">
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
          <div className="no-results">
            <h3 className="no-results-title">No rituals yet</h3>
            <p className="no-results-text">Be the first to share your family rituals!</p>
            {user && (
              <Link
                to="/create"
                className="create-btn"
              >
                Create a Ritual
              </Link>
            )}
          </div>
        )}

        {/* Pagination */}
        {rituals.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="page-btn"
            >
              Previous
            </button>
            <span className="page-info">Page {page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              className="page-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
