import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI, usersAPI, connectionsAPI } from '../services/api';
import { MapPin, Calendar, User, Heart, MessageCircle, Share2, Edit, Trash2 } from 'lucide-react';
import './RitualDetail.css';

export default function RitualDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ritual, setRitual] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    loadRitual();
  }, [id]);

  const loadRitual = async () => {
    try {
      setLoading(true);
      const response = await ritualsAPI.getById(id);
      setRitual(response.data);
      const creatorResponse = await usersAPI.getProfile(response.data.user_id);
      setCreator(creatorResponse.data);
    } catch (err) {
      console.error('Failed to load ritual:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ritual?')) return;
    
    try {
      await ritualsAPI.delete(id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete ritual:', err);
    }
  };

  const handleShare = async (ritual) => {
    const shareData = {
      title: ritual.title,
      text: `Check out this ritual: ${ritual.title} on Parampara`,
      url: `${window.location.origin}/ritual/${ritual.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader animate-spin"></div>
      </div>
    );
  }

  if (!ritual) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h2 className="detail-title">Ritual not found</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-home"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ritual-detail-page bg-gradient-body">
      <div className="detail-container">
        {/* Header */}
        <div className="detail-card">
          <div className="detail-header">
            <div>
              <h1 className="detail-title">{ritual.title}</h1>
              <div className="detail-location">
                <MapPin size={20} />
                <span>{ritual.state}</span>
              </div>
            </div>
            {user?.id === ritual.user_id && (
              <div className="header-actions">
                <button
                  onClick={() => navigate(`/ritual/${id}/edit`)}
                  className="btn-edit-detail"
                >
                  <Edit size={20} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn-delete-detail"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Creator Info */}
          {creator && (
            <div className="creator-info-bar">
              <div className="creator-profile">
                <div className="creator-avatar">
                  {creator.profile_pic || <User/>}
                </div>
                <div>
                  <h3 className="creator-name">{creator.full_name}</h3>
                  <p className="creator-state">{creator.state_name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Ritual Details */}
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value frequency">{ritual.frequency}</div>
              <div className="stat-label">Frequency</div>
            </div>
            <div className="stat-box">
              <div className="stat-value likes">{ritual.likes || 0}</div>
              <div className="stat-label">Likes</div>
            </div>
            <div className="stat-box">
              <div className="stat-value comments">{ritual.comments || 0}</div>
              <div className="stat-label">Comments</div>
            </div>
          </div>

          {/* Tags */}
          {ritual.tags && ritual.tags.length > 0 && (
            <div className="tag-list">
              {ritual.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="detail-tag"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="detail-section">
            <h2 className="section-title">Ritual Description</h2>
            <p className="description-text">{ritual.description}</p>
          </div>

          {/* Significance */}
          {ritual.significance && (
            <div className="detail-section">
              <h2 className="section-title">Significance</h2>
              <div className="significance-box">
                <p className="description-text">{ritual.significance}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="actions-footer">
            <button className="btn-action-footer">
              <Heart size={20} />
              <span>Like</span>
            </button>
            <button className="btn-action-footer">
              <MessageCircle size={20} />
              <span>Comment</span>
            </button>
            <button 
              onClick={() => handleShare(ritual)}
              className="btn-action-footer"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Similar Rituals */}
        <div className="similar-rituals-card">
          <h2 className="section-title">Similar Rituals</h2>
          <p className="creator-state">More rituals from this category coming soon...</p>
        </div>
      </div>
    </div>
  );
}
