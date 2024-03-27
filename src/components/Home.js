import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import songs from '../data/songList';
import './Home.css';

const Home = () => {
  const years = [2020, 2021, 2022];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true); // New state to track the first play
  const audioPlayer = useRef(new Audio());

  const playSong = (index) => {
    const song = songs[index];
    if (audioPlayer.current.src !== song) {
      audioPlayer.current.src = song;
    }
    audioPlayer.current.play().then(() => {
      setIsPlaying(true);
      setIsFirstPlay(false); // After first play, set to false
    }).catch(error => {
      console.error("Playback failed", error);
    });
  };

  const playNextSong = () => {
    let nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= songs.length) {
      nextSongIndex = 0;
    }
    setCurrentSongIndex(nextSongIndex);
    playSong(nextSongIndex);
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

  useEffect(() => {
    const currentAudioPlayer = audioPlayer.current;
    return () => {
      currentAudioPlayer.pause();
    };
  }, []);

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
      {years.map(year => (
        <Link key={year} to={`/year/${year}`} style={{ textDecoration: 'none' }}>
          <button className="year-button">{year}</button>
        </Link>
      ))}
      <img src="path/to/decorative/image1.png" alt="Decorative" className="decorative-image" />
    </div>
  );
};

export default Home;
