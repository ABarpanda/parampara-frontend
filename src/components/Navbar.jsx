import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Plus, Search, User, LogOut, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <Link to="/" className="logo-container">
            <div className="logo-text-gradient">
              <img src="/logo.png" className="logo-img" alt="Logo" />
            </div>
            <span className="brand-name">Parampara</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <Link to="/" className="nav-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="nav-link">
              <Search size={20} />
              <span>Explore</span>
            </Link>
            {user && (
              <>
                <Link to="/create" className="nav-button-primary">
                  <Plus size={20} />
                  <span>Create</span>
                </Link>
                <Link to="/profile" className="nav-link">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="logout-button"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-button-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link">
              Home
            </Link>
            <Link to="/explore" className="mobile-nav-link">
              Explore
            </Link>
            {user && (
              <>
                <Link to="/create" className="mobile-nav-link">
                  Create Ritual
                </Link>
                <Link to="/profile" className="mobile-nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="mobile-logout-button"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="mobile-nav-link">
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link">
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
