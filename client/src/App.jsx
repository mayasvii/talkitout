import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { ToastProvider } from './context/ToastContext';

import ErrorBoundary from './components/common/ErrorBoundary';
import ToastContainer from './components/common/ToastContainer';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AudioPlayer from './components/player/AudioPlayer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Audiobooks from './pages/Audiobooks';
import Music from './pages/Music';
import Breathe from './pages/Breathe';
import Counselling from './pages/Counselling';
import AdminDashboard from './pages/AdminDashboard';
import Journal from './pages/Journal';
import Emergency from './pages/Emergency';

/**
 * Inner layout wrapper that applies dynamic bottom padding
 * when the fixed audio player is currently active.
 */
const AppLayout = () => {
  const { currentTrack } = usePlayer();

  return (
    <div className={`app-shell ${currentTrack ? 'has-active-player' : ''}`}>
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/audiobooks" element={<Audiobooks />} />
          <Route path="/music" element={<Music />} />
          <Route path="/breathe" element={<Breathe />} />
          <Route path="/counselling" element={<Counselling />} />
          <Route path="/emergency" element={<Emergency />} />

          {/* Student Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {/* Toast Notifications Overlay */}
      <ToastContainer />
      {/* Persistent global audio player fixed at the bottom */}
      <AudioPlayer />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <PlayerProvider>
            <ToastProvider>
              <AppLayout />
            </ToastProvider>
          </PlayerProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
