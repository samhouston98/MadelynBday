import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import memoriesData from '../data/memoriesData'; // Ensure the path is correct
import './YearPage.css'

const YearPage = () => {
  let navigate = useNavigate();
  let { year } = useParams();
  const yearMemories = memoriesData[year] || [];

  const goBack = () => {
    navigate('/'); // Navigates back to the home page
  };

  return (
    <div className="year-page-container">
      <button onClick={goBack} className="back-button">Go Back</button>
      <h1 className="year-title">Memories from {year}</h1>
      {year === '2017' && yearMemories.length === 0 ? (
        <p className="no-pics-message">No pics from this year lmao</p>
      ) : (
        <div className="memory-content">
          {yearMemories.map((memory, index) => (
            <div key={index} className="memory-item">
              {memory.type === 'image' && <img src={memory.src} alt={`Memory from ${year}`} className="memory-image" />}
              {memory.type === 'video' && <video src={memory.src} controls className="memory-video"></video>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearPage;
