import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI, connectionsAPI, ritualsAPI } from '../services/api';
import { Users, Heart, MapPin, Edit, Trash2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [myRituals, setMyRituals] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [activeTab, setActiveTab] = useState('rituals');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [ritualsRes, followingRes, followersRes] = await Promise.all([
        ritualsAPI.getAll(1, 100, { userId: user.id }),
        connectionsAPI.getFollowing(),
        connectionsAPI.getFollowers()
      ]);

      setMyRituals(ritualsRes.data.rituals);
      setFollowing(followingRes.data);
      setFollowers(followersRes.data);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ritualId) => {
    if (!window.confirm('Are you sure you want to delete this ritual?')) return;
    try {
      await ritualsAPI.delete(ritualId);
      setMyRituals(prev => prev.filter(r => r.id !== ritualId));
    } catch (err) {
      console.error('Failed to delete ritual:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-saffron to-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.fullName}</h1>
              <p className="text-slate-600 flex items-center gap-2 mb-2">
                <MapPin size={18} />
                {user.region}
              </p>
              <p className="text-slate-600">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-saffron/10 to-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-saffron">{myRituals.length}</div>
              <div className="text-sm text-slate-600">Rituals Shared</div>
            </div>
            <div className="bg-gradient-to-br from-green/10 to-emerald-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green">{following.length}</div>
              <div className="text-sm text-slate-600">Following</div>
            </div>
            <div className="bg-gradient-to-br from-navy/10 to-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-navy">{followers.length}</div>
              <div className="text-sm text-slate-600">Followers</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('rituals')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'rituals'
                  ? 'text-saffron border-b-2 border-saffron bg-saffron/5'
                  : 'text-slate-600 hover:text-saffron'
              }`}
            >
              My Rituals ({myRituals.length})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'following'
                  ? 'text-saffron border-b-2 border-saffron bg-saffron/5'
                  : 'text-slate-600 hover:text-saffron'
              }`}
            >
              Following ({following.length})
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'followers'
                  ? 'text-saffron border-b-2 border-saffron bg-saffron/5'
                  : 'text-slate-600 hover:text-saffron'
              }`}
            >
              Followers ({followers.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'rituals' && (
              <div>
                {myRituals.length > 0 ? (
                  <div className="space-y-4">
                    {myRituals.map(ritual => (
                      <div
                        key={ritual.id}
                        className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-slate-800 mb-2">{ritual.title}</h3>
                            <p className="text-slate-600 text-sm mb-3 line-clamp-2">{ritual.description}</p>
                            <div className="flex gap-4 text-sm text-slate-500">
                              <span>{ritual.region}</span>
                              <span>{ritual.frequency}</span>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600 py-8">You haven't shared any rituals yet</p>
                )}
              </div>
            )}

            {activeTab === 'following' && (
              <div>
                {following.length > 0 ? (
                  <div className="space-y-4">
                    {following.map(person => (
                      <div
                        key={person.id}
                        className="flex items-center justify-between border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white font-bold">
                            {person.fullName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{person.fullName}</h4>
                            <p className="text-sm text-slate-600">{person.region}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600 py-8">You're not following anyone yet</p>
                )}
              </div>
            )}

            {activeTab === 'followers' && (
              <div>
                {followers.length > 0 ? (
                  <div className="space-y-4">
                    {followers.map(person => (
                      <div
                        key={person.id}
                        className="flex items-center justify-between border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center text-white font-bold">
                            {person.fullName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{person.fullName}</h4>
                            <p className="text-sm text-slate-600">{person.region}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600 py-8">You don't have any followers yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
