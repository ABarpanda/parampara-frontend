import React from 'react';
import { Heart, Mail, Info, Globe, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-12 pb-8">
      <div className="max-container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-saffron">●</span> Parampara
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Preserving and sharing cultural traditions from every corner of India and the diaspora.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-saffron transition">About Us</Link></li>
              <li><Link to="/explore" className="hover:text-saffron transition">Browse Rituals</Link></li>
              <li><Link to="/guidelines" className="hover:text-saffron transition">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/contact" className="hover:text-saffron transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-saffron transition">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-saffron transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-500 hover:text-saffron transition"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-500 hover:text-saffron transition"><Github size={18} /></a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-500 hover:text-saffron transition"><Mail size={18} /></a> {/*mailto:support@ourparampara.in*/}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {currentYear} Parampara Community. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            {/* <a 
              href="https://yourportfolio.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-slate-800 hover:text-saffron transition"
            >
              ABarpanda
            </a> */}
            <p className="font-medium text-slate-800">ABarpanda</p>
          </div>
        </div>
      </div>
    </footer>
  );
}