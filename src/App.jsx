import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRitual from './pages/CreateRitual';
import RitualDetail from './pages/RitualDetail';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import EditRitual from './pages/EditRitual';
// import AboutUs from './pages/AboutUs';

import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/about" element={<AboutUs />} /> */}
              <Route path="/register" element={<Register />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/ritual/:id" element={<RitualDetail />} />
              <Route
                path="/ritual/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditRitual />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateRitual />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer /> 
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
