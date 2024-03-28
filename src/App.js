// App.js
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import YearPage from './components/YearPage';
import songs from './data/songList';

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const audioPlayer = useRef(new Audio());

  useEffect(() => {
    audioPlayer.current.src = songs[currentSongIndex];
    if (isPlaying) {
      audioPlayer.current.play().catch(error => console.log("Playback failed", error));
    }
  }, [currentSongIndex, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    if (!hasStartedPlaying) {
      setHasStartedPlaying(true);
      setIsPlaying(true);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home playNextSong={playNextSong} togglePlayPause={togglePlayPause} isPlaying={isPlaying} hasStartedPlaying={hasStartedPlaying} setHasStartedPlaying={setHasStartedPlaying} />} />
        <Route path="/year/:year" element={<YearPage togglePlayPause={togglePlayPause} isPlaying={isPlaying} />} />
      </Routes>
    </Router>
  );
}

export default App;
