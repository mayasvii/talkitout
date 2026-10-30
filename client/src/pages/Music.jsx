import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { usePlayer } from '../context/PlayerContext';
import {
  PlayIcon,
  PauseIcon,
  ClockIcon,
  MusicIcon,
  AlertIcon,
  SparklesIcon,
} from '../components/common/Icons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const MOOD_TABS = [
  { id: 'all', label: 'All Soundscapes', value: '' },
  { id: 'sleep', label: '🌙 Deep Sleep', value: 'sleep' },
  { id: 'focus', label: '🎯 Study Focus', value: 'focus' },
  { id: 'anxiety', label: '🌿 Anxiety Relief', value: 'anxiety' },
  { id: 'calm', label: '☁️ Calm & Rest', value: 'calm' },
];

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [activeMood, setActiveMood] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      setError('');
      try {
        let endpoint = '/media?type=music';
        if (activeMood) {
          endpoint += `&category=${activeMood}`;
        }
        const res = await api.get(endpoint);
        if (res && res.data) {
          setTracks(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch music tracks:', err);
        setError('Unable to load soundscapes. Please verify that your backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [activeMood]);

  const handleTrackClick = (track) => {
    if (currentTrack && currentTrack._id === track._id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="media-page page-container">
      {/* Page Header */}
      <div className="media-page-header">
        <div className="media-page-badge" style={{ backgroundColor: 'var(--color-lavender-light)', color: 'var(--color-lavender-dark)' }}>
          <MusicIcon size={18} />
          <span>Binaural & Ambient Soundscapes</span>
        </div>
        <h1 className="media-page-title">Music for Rest, Focus & Relief</h1>
        <p className="media-page-subtitle">
          Tune your frequency. Designed to help college students tune out background dorm chatter, sleep deeply before exams, and unwind after intense study sessions.
        </p>

        {/* Mood Tabs */}
        <div className="mood-tabs-container">
          {MOOD_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMood(tab.value)}
              className={`mood-tab-btn ${activeMood === tab.value ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
          <AlertIcon size={20} />
          <div>
            <p style={{ fontWeight: 600 }}>{error}</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Ensure your Express backend is running on port 5000 (<code>npm run dev</code> in <code>/server</code>).
            </p>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div style={{ padding: '4rem 0' }}>
          <LoadingSpinner message="Tuning calming soundscapes for you..." />
        </div>
      ) : tracks.length === 0 ? (
        <EmptyState
          icon={MusicIcon}
          title="No soundscapes found in this mood"
          description="Try switching tabs or exploring All Soundscapes."
          actionLabel="View All Tracks"
          onAction={() => setActiveMood('')}
        />
      ) : (
        /* Music Grid */
        <div className="media-grid">
          {tracks.map((track) => {
            const isThisTrackPlaying = currentTrack && currentTrack._id === track._id && isPlaying;
            const isThisTrackSelected = currentTrack && currentTrack._id === track._id;

            return (
              <div
                key={track._id}
                className={`media-card ${isThisTrackSelected ? 'card-now-playing' : ''}`}
              >
                <div className="media-cover-container">
                  <img
                    src={track.coverImage || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600'}
                    alt={track.title}
                    className="media-cover-img"
                  />
                  <div className="media-cover-overlay">
                    <button
                      onClick={() => handleTrackClick(track)}
                      className={`media-play-overlay-btn ${isThisTrackPlaying ? 'playing' : ''}`}
                      aria-label={isThisTrackPlaying ? 'Pause soundscape' : 'Play soundscape'}
                    >
                      {isThisTrackPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
                    </button>
                  </div>
                  <span className="media-duration-tag">
                    <ClockIcon size={14} />
                    <span>{track.duration}</span>
                  </span>
                </div>

                <div className="media-card-body">
                  <div className="media-meta-row">
                    <span className="media-category-badge mood-badge">{track.category}</span>
                    {isThisTrackPlaying && (
                      <span className="now-playing-indicator">
                        <span className="pulse-dot"></span>
                        Now Playing
                      </span>
                    )}
                  </div>

                  <h3 className="media-card-title">{track.title}</h3>
                  <p className="media-card-desc">{track.description}</p>

                  <button
                    onClick={() => handleTrackClick(track)}
                    className={`btn btn-block ${isThisTrackPlaying ? 'btn-outline' : 'btn-secondary'}`}
                  >
                    {isThisTrackPlaying ? (
                      <>
                        <PauseIcon size={18} />
                        <span>Pause Track</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon size={18} />
                        <span>Play Soundscape</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Music;
