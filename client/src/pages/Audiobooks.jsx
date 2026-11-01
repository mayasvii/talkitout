import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { usePlayer } from '../context/PlayerContext';
import {
  PlayIcon,
  PauseIcon,
  ClockIcon,
  HeadphonesIcon,
  AlertIcon,
} from '../components/common/Icons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const CATEGORIES = [
  { id: 'all', label: 'All Audiobooks', value: '' },
  { id: 'stress', label: 'Exam & Academic Stress', value: 'stress' },
  { id: 'motivation', label: 'Daily Motivation', value: 'motivation' },
  { id: 'self-help', label: 'Self-Help & Confidence', value: 'self-help' },
];

const Audiobooks = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

  useEffect(() => {
    const fetchAudiobooks = async () => {
      setLoading(true);
      setError('');
      try {
        let endpoint = '/media?type=audiobook';
        if (selectedCategory) {
          endpoint += `&category=${selectedCategory}`;
        }
        const res = await api.get(endpoint);
        if (res && res.data) {
          setAudiobooks(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch audiobooks:', err);
        setError('Unable to load audiobooks. Please check if your backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, [selectedCategory]);

  const handleTrackClick = (track) => {
    if (currentTrack && currentTrack._id === track._id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  // Only display audiobooks with verified real audio files to prevent dead play buttons
  const validAudiobooks = audiobooks.filter((book) => {
    if (!book || !book.audioUrl) return false;
    const knownPlaceholders = [
      'quiet-the-mind.mp3',
      'college-resilience.mp3',
      'imposter-syndrome.mp3',
      'social-confidence.mp3',
    ];
    return !knownPlaceholders.some((placeholder) => book.audioUrl.endsWith(placeholder));
  });

  return (
    <div className="media-page page-container">
      {/* Page Header */}
      <div className="media-page-header">
        <div className="media-page-badge">
          <HeadphonesIcon size={18} />
          <span>Student Audio Therapy</span>
        </div>
        <h1 className="media-page-title">Audiobooks for the Student Mind</h1>
        <p className="media-page-subtitle">
          Bite-sized, expert-backed audio sessions crafted to help you navigate exam pressure, silence imposter syndrome, and study with clarity.
        </p>

        {/* Category Filters */}
        <div className="filter-pill-group">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.value)}
              className={`filter-pill ${selectedCategory === cat.value ? 'active' : ''}`}
            >
              {cat.label}
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
              Tip: Start the backend server in <code>/server</code> with <code>npm run dev</code> and populate it with <code>npm run seed</code>.
            </p>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div style={{ padding: '4rem 0' }}>
          <LoadingSpinner message="Gathering calming audiobooks for you..." />
        </div>
      ) : validAudiobooks.length === 0 ? (
        <EmptyState
          icon={HeadphonesIcon}
          title={
            selectedCategory === 'self-help'
              ? 'Self-Help audiobooks coming soon'
              : 'No audiobooks found in this category'
          }
          description={
            selectedCategory === 'self-help'
              ? 'We are curating and verifying new public-domain recordings for self-help and confidence. In the meantime, explore our Exam Stress and Daily Motivation audiobooks!'
              : 'Try switching categories or view All Audiobooks.'
          }
          actionLabel="View All Audiobooks"
          onAction={() => setSelectedCategory('')}
        />
      ) : (
        /* Audiobooks Grid */
        <div className="media-grid">
          {validAudiobooks.map((book) => {
            const isThisTrackPlaying = currentTrack && currentTrack._id === book._id && isPlaying;
            const isThisTrackSelected = currentTrack && currentTrack._id === book._id;

            return (
              <div
                key={book._id}
                className={`media-card ${isThisTrackSelected ? 'card-now-playing' : ''}`}
              >
                <div className="media-cover-container">
                  <img
                    src={book.coverImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600'}
                    alt={book.title}
                    className="media-cover-img"
                  />
                  <div className="media-cover-overlay">
                    <button
                      onClick={() => handleTrackClick(book)}
                      className={`media-play-overlay-btn ${isThisTrackPlaying ? 'playing' : ''}`}
                      aria-label={isThisTrackPlaying ? 'Pause audiobook' : 'Play audiobook'}
                    >
                      {isThisTrackPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
                    </button>
                  </div>
                  <span className="media-duration-tag">
                    <ClockIcon size={14} />
                    <span>{book.duration}</span>
                  </span>
                </div>

                <div className="media-card-body">
                  <div className="media-meta-row">
                    <span className="media-category-badge">{book.category}</span>
                    {isThisTrackPlaying && (
                      <span className="now-playing-indicator">
                        <span className="pulse-dot"></span>
                        Now Playing
                      </span>
                    )}
                  </div>

                  <h3 className="media-card-title">{book.title}</h3>
                  <p className="media-card-desc">{book.description}</p>

                  <button
                    onClick={() => handleTrackClick(book)}
                    className={`btn btn-block ${isThisTrackPlaying ? 'btn-outline' : 'btn-primary'}`}
                  >
                    {isThisTrackPlaying ? (
                      <>
                        <PauseIcon size={18} />
                        <span>Pause Session</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon size={18} />
                        <span>Listen Now</span>
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

export default Audiobooks;
