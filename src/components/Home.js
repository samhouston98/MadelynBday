// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import songs from '../data/songList';
import './Home.css';

// Array of image URLs for the carousel
const images = [
  '/media/pic.jpg',
  '/media/pic2.jpg',
  '/media/pic3.jpg',
  '/media/pic4.jpg',
  '/media/pic5.jpg',

  // Add more image paths as needed
];

const Home = () => {
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, "Videos"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const audioPlayer = useRef(new Audio());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const currentAudioPlayer = audioPlayer.current;
    return () => {
      currentAudioPlayer.pause();
    };
  }, []);

  const playNextSong = () => {
    if (isFirstPlay) {
      playSong(currentSongIndex);
      setIsFirstPlay(false);
    } else {
      let nextSongIndex = currentSongIndex + 1;
      if (nextSongIndex >= songs.length) {
        nextSongIndex = 0;
      }
      setCurrentSongIndex(nextSongIndex);
      playSong(nextSongIndex);
    }
  };

  const playSong = (index) => {
    const song = songs[index];
    if (audioPlayer.current.src !== song) {
      audioPlayer.current.src = song;
    }
    audioPlayer.current.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.error("Playback failed", error);
    });
  };

  const togglePause = () => {
    if (audioPlayer.current.paused) {
      audioPlayer.current.play();
      setIsPlaying(true);
    } else {
      audioPlayer.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="birthday-title">Happy Birthday Madelyn!</h1>
      <button onClick={playNextSong} className="music-button">
        {isFirstPlay ? 'Play Song' : 'Play New Song'}
      </button>
      {!isFirstPlay && (
        <button onClick={togglePause} className="music-button">
          {isPlaying ? 'Pause' : 'Resume'}
        </button>
      )}
      <img src={images[currentImageIndex]} alt="Slideshow" className="homepage-slideshow" />
      {years.map(year => (
        <Link key={year} to={`/year/${year}`} style={{ textDecoration: 'none' }}>
          <button className="year-button">{year}</button>
        </Link>
      ))}
      {/* Insert additional elements or components here as needed */}
    </div>
  );
};

export default Home;
