import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI } from '../services/api';
import { Heart, MessageCircle, Share2, MapPin, Edit, Trash2 } from 'lucide-react';
import './Home.css';

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
    <div className="home-container bg-gradient-body">
      {/* Hero Section */}
      {!user && (
        <section className="hero-section bg-gradient-primary">
          <div className="max-container hero-content">
            <h1 className="hero-title">परंपरा - Parampara</h1>
            <p className="hero-subtitle">Discover, Share, and Preserve Family Rituals & Traditions</p>
            <div className="hero-actions">
              <Link
                to="/register"
                className="btn-primary-white"
              >
                Join the Community
              </Link>
              <Link
                to="/explore"
                className="btn-outline-white"
              >
                Explore Rituals
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-container main-content-area">
        {user && (
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome, {user.full_name}!</h2>
            <p className="welcome-subtitle">Discover your rituals from the community</p>
          </div>
        )}

        {/* Rituals Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="loader animate-spin"></div>
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

                <div className="ritual-card-content">
                  <div className="ritual-header">
                    <h3 className="ritual-title">
                      {ritual.title}
                    </h3>
                    
                    {user?.id === ritual.user_id && (
                      <div className="ritual-actions">
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/ritual/${ritual.id}/edit`); }}
                          className="btn-action btn-edit"
                          title="Edit Ritual"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(ritual.id); }}
                          className="btn-action btn-delete"
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

                  <div className="ritual-footer">
                    <div className="ritual-location">
                      <MapPin size={14} className="shrink-0" />
                      <span>{ritual.state}</span>
                    </div>

                    <div className="ritual-tags">
                      {ritual.tags?.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="ritual-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="ritual-stats">
                      <div className="stat-item">
                        <Heart size={14} className={ritual.likes > 0 ? "heart-active" : ""} />
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
          <div className="empty-state">
            <h3 className="empty-title">No rituals yet</h3>
            <p className="empty-text">Be the first to share your family rituals!</p>
            {user && (
              <Link
                to="/create"
                className="btn-create"
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
              className="btn-pagination"
            >
              Previous
            </button>
            <span className="page-info">Page {page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              className="btn-pagination"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
