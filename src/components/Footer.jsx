import React from 'react';
import { Heart, Mail, Info, Globe, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="max-container">
        <div className="footer-grid">
          
          {/* Brand Section */}
          <div className="footer-brand-section">
            <h2 className="footer-brand-title">
              <span className="footer-brand-dot">●</span> Parampara
            </h2>
            <p className="footer-brand-description">
              Preserving and sharing cultural traditions from every corner of India and the diaspora.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Community</h3>
            <ul className="footer-list">
              <li className="footer-list-item"><Link to="/about" className="footer-link">About Us</Link></li>
              <li className="footer-list-item"><Link to="/explore" className="footer-link">Browse Rituals</Link></li>
              <li className="footer-list-item"><Link to="/guidelines" className="footer-link">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-list">
              <li className="footer-list-item"><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li className="footer-list-item"><Link to="/faq" className="footer-link">FAQs</Link></li>
              <li className="footer-list-item"><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-social-links">
              <a href="#" className="footer-social-icon"><Twitter size={18} /></a>
              <a href="https://github.com/ABarpanda/parampara-frontend" className="footer-social-icon"><Github size={18} /></a>
              <a href="mailto:support@parampara.com" className="footer-social-icon"><Mail size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Parampara Community. All rights reserved.
          </p>
          
          <div className="footer-made-with">
            <span>Made with</span>
            <Heart size={16} className="heart-icon" />
            <span>by</span>
            <p className="footer-author">ABarpanda</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
