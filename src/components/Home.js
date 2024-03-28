// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Array of image URLs for the carousel
const images = [
    '/media/pic.jpg',
    '/media/pic2.jpg',
    '/media/pic3.jpg',
    '/media/pic4.jpg',
    '/media/pic5.jpg',
  ];
  

const Home = ({ togglePlayPause, isPlaying, playNextSong, hasStartedPlaying, setHasStartedPlaying }) => {
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, "Videos"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const handlePlaySong = () => {
    if (!hasStartedPlaying) {
      setHasStartedPlaying(true); // Mark as started
      playNextSong(); // Play the song
      if (!isPlaying) togglePlayPause(); // Ensure the song plays
    } else {
      playNextSong(); // Play the next song
    }
  };

  return (
    <div className="home-container">
      <h1 className="birthday-title">Happy Birthday Madelyn!</h1>
      <img src={images[currentImageIndex]} alt="Slideshow" className="homepage-slideshow" />
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
    </div>
  );
};

export default Home;
