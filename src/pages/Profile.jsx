import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI, connectionsAPI, ritualsAPI } from '../services/api';
import { User, Heart, MapPin, Edit, Trash2 } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [myRituals, setMyRituals] = useState([]);
  const [activeTab, setActiveTab] = useState('rituals');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfile(user);
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const [ritualsRes] = await Promise.all([
        ritualsAPI.getAll(1, 100, { userId: user.id }),
      ]);

      setMyRituals(ritualsRes.data.rituals);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="empty-message">Loading profile...</div>;
  }

  const handleDeleteRitual = async (ritualId) => {
    if (!window.confirm('Are you sure you want to delete this ritual?')) return;
    try {
      await ritualsAPI.delete(ritualId);
      setMyRituals(prev => prev.filter(r => r.id !== ritualId));
    } catch (err) {
      console.error('Failed to delete ritual:', err);
    }
  };

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await usersAPI.deleteProfile();
      logout();
      navigate('/register', { replace: true });
      alert("Profile deleted successfully.");
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete profile"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-info-section">
            <div className="profile-user-info">
              <div className="profile-pic-container">
                {user.profile_pic ? (
                  <img 
                    src={user.profile_pic} 
                    alt={user.full_name}
                    className="profile-pic"
                  />
                ) : (
                  <div className="profile-pic-placeholder">
                    <User size={48} strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <div className="user-details">
                <h1>{user.full_name}</h1>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
            <div>
              <p className="user-location">
                <MapPin size={18} />
                {user.state_name}
              </p>
            </div>
            <div className="header-actions">
              <button
                onClick={handleEdit}
                className="edit-profile-btn"
              >
                <Edit size={18} /> Edit
              </button>
              <button
                onClick={handleDeleteProfile}
                className="delete-profile-btn"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-value">{myRituals.length}</div>
              <div className="stat-label">Rituals Shared</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs-card">
          <div className="tabs-header">
            <button
              onClick={() => setActiveTab('rituals')}
              className={`tab-btn ${activeTab === 'rituals' ? 'active' : 'inactive'}`}
            >
              My Rituals ({myRituals.length})
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'rituals' && (
              <div>
                {myRituals.length > 0 ? (
                  <div className="ritual-list">
                    {myRituals.map(ritual => (
                      <div
                        key={ritual.id}
                        className="my-ritual-item"
                      >
                        <div className="ritual-item-header">
                          <div>
                            <h3 className="ritual-item-title">{ritual.title}</h3>
                            <p className="ritual-item-desc">{ritual.description}</p>
                            <div className="ritual-item-meta">
                              <span>{ritual.region}</span>
                              <span>{ritual.frequency}</span>
                            </div>
                          </div>
                          <div className="ritual-item-actions">
                            <button
                              onClick={() => navigate(`/ritual/${ritual.id}/edit`)}
                              className="ritual-edit-btn"
                            >
                              <Edit size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteRitual(ritual.id)}
                              className="ritual-delete-btn"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">You haven't shared any rituals yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
