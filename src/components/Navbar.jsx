import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Plus, Search, User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-saffron via-green to-navy bg-clip-text text-transparent">
              परंपरा
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-slate-600">Parampara</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-saffron transition">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="flex items-center gap-2 text-slate-600 hover:text-saffron transition">
              <Search size={20} />
              <span>Explore</span>
            </Link>
            {user && (
              <>
                <Link to="/create" className="flex items-center gap-2 bg-saffron text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition">
                  <Plus size={20} />
                  <span>Create</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 text-slate-600 hover:text-saffron transition">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="text-slate-600 hover:text-saffron transition">
                  Login
                </Link>
                <Link to="/register" className="bg-saffron text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-saffron transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <Link to="/" className="block py-2 text-slate-600 hover:text-saffron transition">
              Home
            </Link>
            <Link to="/explore" className="block py-2 text-slate-600 hover:text-saffron transition">
              Explore
            </Link>
            {user && (
              <>
                <Link to="/create" className="block py-2 text-slate-600 hover:text-saffron transition">
                  Create Ritual
                </Link>
                <Link to="/profile" className="block py-2 text-slate-600 hover:text-saffron transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="block py-2 text-slate-600 hover:text-saffron transition">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-slate-600 hover:text-saffron transition">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
