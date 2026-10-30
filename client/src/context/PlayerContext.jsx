import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Play a track (audiobook or music)
   * @param {Object} track - Media document from backend
   */
  const playTrack = (track) => {
    if (currentTrack && currentTrack._id === track._id) {
      setIsPlaying(true);
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    if (currentTrack) {
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const value = {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    resumeTrack,
    togglePlay,
    closePlayer,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
