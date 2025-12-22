import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ritualsAPI, usersAPI, connectionsAPI } from '../services/api';
import { MapPin, Calendar, Users, Heart, MessageCircle, Share2, Edit, Trash2 } from 'lucide-react';

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

  // const handleFollow = async () => {
  //   try {
  //     if (isFollowing) {
  //       await connectionsAPI.unfollow(ritual.userId);
  //     } else {
  //       await connectionsAPI.follow(ritual.userId);
  //     }
  //     setIsFollowing(!isFollowing);
  //   } catch (err) {
  //     console.error('Failed to follow user:', err);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  if (!ritual) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ritual not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-saffron hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">{ritual.title}</h1>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={20} />
                <span>{ritual.state}</span>
              </div>
            </div>
            {user?.id === ritual.userId && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/ritual/${id}/edit`)}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                >
                  <Edit size={20} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Creator Info */}
          {creator && (
            <div className="flex items-center justify-between bg-gradient-to-r from-saffron/10 to-green/10 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white font-bold">
                  {creator.full_name}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{creator.full_name}</h3>
                  <p className="text-sm text-slate-600">{creator.state_name}</p>
                </div>
              </div>
              {user?.id !== ritual.userId && user && (
                // <button
                //   onClick={handleFollow}
                //   className={`px-4 py-2 rounded-lg font-semibold transition ${
                //     isFollowing
                //       ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                //       : 'bg-saffron text-white hover:bg-orange-500'
                //   }`}
                // >
                //   {isFollowing ? 'Following' : 'Follow'}
                // </button>
                <></>
              )}
            </div>
          )}

          {/* Ritual Details */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-saffron">{ritual.frequency}</div>
              <div className="text-sm text-slate-600">Frequency</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green">{ritual.likes || 0}</div>
              <div className="text-sm text-slate-600">Likes</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-navy">{ritual.comments || 0}</div>
              <div className="text-sm text-slate-600">Comments</div>
            </div>
          </div>

          {/* Tags */}
          {ritual.tags && ritual.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {ritual.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-saffron/10 text-saffron px-4 py-2 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Ritual Description</h2>
            <p className="text-slate-700 leading-relaxed">{ritual.description}</p>
          </div>

          {/* Significance */}
          {ritual.significance && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 mb-3">Significance</h2>
              <div className="bg-gradient-to-r from-green/5 to-navy/5 p-4 rounded-lg border-l-4 border-green">
                <p className="text-slate-700">{ritual.significance}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-saffron transition">
              <Heart size={20} />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-saffron transition">
              <MessageCircle size={20} />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-saffron transition">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Similar Rituals */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Similar Rituals</h2>
          <p className="text-slate-600">More rituals from this category coming soon...</p>
        </div>
      </div>
    </div>
  );
}
