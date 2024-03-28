// src/components/YearPage.js
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import memoriesData from '../data/memoriesData';
import './YearPage.css'

const YearPage = ({ togglePlayPause, isPlaying }) => {
  let navigate = useNavigate();
  let { year } = useParams();
  const yearMemories = memoriesData[year] || [];
  const videoRefs = useRef([]);

  const goBack = () => navigate('/');

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);

    const handlePlay = () => {
      if (isPlaying) togglePlayPause();
    };

    videos.forEach(video => video.addEventListener('play', handlePlay));

    return () => {
      videos.forEach(video => video.removeEventListener('play', handlePlay));
    };
  }, [isPlaying, togglePlayPause]);

  return (
    <div className="year-page-container">
      <button onClick={goBack} className="back-button">Go Back</button>
      <button onClick={togglePlayPause} className="music-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <h1 className="year-title">Memories from {year}</h1>
      {year === '2017' && yearMemories.length === 0 ? (
        <p className="no-pics-message">No pics from this year lmao</p>
      ) : (
        <div className="memory-content">
          {yearMemories.map((memory, index) => (
            <div key={index} className="memory-item">
              {memory.type === 'image' && <img src={memory.src} alt={`Memory from ${year}`} className="memory-image" />}
              {memory.type === 'video' && (
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={memory.src}
                  controls
                  className="memory-video"
                ></video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearPage;
