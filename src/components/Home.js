// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ togglePlayPause, isPlaying, playNextSong, hasStartedPlaying, setHasStartedPlaying }) => {
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, "Videos"];

  const handlePlaySong = () => {
    if (!hasStartedPlaying) {
      setHasStartedPlaying(true); // Mark as started
      playNextSong(); // Play the song
    } else {
      playNextSong(); // Play the next song
    }
  };

  return (
    <div className="home-container">
      <h1 className="birthday-title">Happy Birthday Madelyn!</h1>
      <button onClick={handlePlaySong} className="music-button">
        {hasStartedPlaying ? 'Play Next Song' : 'Play Song'}
      </button>
      {hasStartedPlaying && (
        <button onClick={togglePlayPause} className="music-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      )}
      {years.map(year => (
        <Link key={year} to={`/year/${year}`} style={{ textDecoration: 'none' }}>
          <button className="year-button">{year}</button>
        </Link>
      ))}
      {/* Additional content */}
    </div>
  );
};

export default Home;
