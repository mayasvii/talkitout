import React, { useRef, useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { PlayIcon, PauseIcon, VolumeIcon, VolumeMuteIcon, CloseIcon } from '../common/Icons';

/**
 * Format raw seconds to MM:SS display string
 */
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, closePlayer } = usePlayer();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  // Compute full audio URL
  const audioSrc = React.useMemo(() => {
    if (!currentTrack || !currentTrack.audioUrl) return '';
    const url = currentTrack.audioUrl;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const base = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
      : 'http://localhost:5000';
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  }, [currentTrack]);

  // Sync isPlaying state with HTML audio element
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio autoplay was prevented or failed:', err.message);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioSrc]);

  // Handle track changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <aside className="global-audio-player" aria-label="Audio Player">
      {/* Underlying HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => togglePlay()}
      />

      <div className="player-inner-container">
        {/* Track Info (Left) */}
        <div className="player-track-info">
          <img
            src={currentTrack.coverImage || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=150'}
            alt={currentTrack.title}
            className="player-track-cover"
          />
          <div className="player-track-details">
            <h4 className="player-track-title" title={currentTrack.title}>
              {currentTrack.title}
            </h4>
            <div className="player-track-badge-group">
              <span className="player-track-badge">{currentTrack.type}</span>
              <span className="player-track-category">{currentTrack.category}</span>
            </div>
          </div>
        </div>

        {/* Central Controls and Seek Bar */}
        <div className="player-controls-center">
          <div className="player-buttons-row">
            <button
              onClick={togglePlay}
              className="player-play-btn"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
            </button>
          </div>

          <div className="player-scrubber-row">
            <span className="player-time-text">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="player-seek-slider"
              aria-label="Seek track position"
            />
            <span className="player-time-text">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close (Right) */}
        <div className="player-aux-controls">
          <div className="player-volume-group">
            <button
              onClick={toggleMute}
              className="player-icon-btn"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeMuteIcon size={20} /> : <VolumeIcon size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="player-volume-slider"
              aria-label="Volume slider"
            />
          </div>

          <button
            onClick={closePlayer}
            className="player-icon-btn player-close-btn"
            title="Close Player"
            aria-label="Close Player"
          >
            <CloseIcon size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AudioPlayer;
