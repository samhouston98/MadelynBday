import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './YearPage.css';

const YearPage = () => {
  let navigate = useNavigate();
  let { year } = useParams();
  
  const goBack = () => {
    navigate('/');
  };

  // Sample data structure - replace with your actual data
  const yearMemories = [
    { type: "image", src: "path/to/image1.jpg" },
    { type: "video", src: "path/to/video1.mp4" }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="year-page-container">
      <button onClick={goBack} className="back-button">Go Back</button>
      <h1 className="year-title">Memories from {year}</h1>
      <Slider {...settings}>
        {yearMemories.map((memory, index) => (
          <div key={index} className="memory-item">
            {memory.type === 'image' && <img src={memory.src} alt={`Memory from ${year}`} className="memory-image" />}
            {memory.type === 'video' && <video src={memory.src} controls className="memory-video"></video>}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default YearPage;
