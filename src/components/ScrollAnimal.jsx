import React, { useState, useRef } from "react";
import "./ScrollAnimal.css";

const ScrollAnimal = ({ 
  image, 
  top, 
  left, 
  alt, 
  info, 
  audio, 
  size = 120,
  zoneOffset = 0 // New prop to position relative to zone
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Calculate position relative to the viewport + zone offset
  const calculatedTop = top + zoneOffset;

  return (
    <div 
      className="scroll-animal"
      style={{
        top: `${calculatedTop}px`,
        left: `${left}px`,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: 15
      }}
    >
      <img 
        src={image} 
        alt={alt} 
        className="animal-image"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
      
      <div className="animal-info">
        <div className="info-content">
          {info.split('\n').map((line, index) => (
            <p key={index} className="info-text">
              {line}
            </p>
          ))}
        </div>
        
        {audio && (
          <div className="audio-section">
            <span 
              className={`audio-icon ${isPlaying ? 'playing' : ''}`}
              onClick={playAudio}
              role="button"
              aria-label="Play animal sound"
            >
              {isPlaying ? '🔊' : '🔈'}
            </span>
            <audio 
              ref={audioRef} 
              onEnded={handleAudioEnded}
              preload="metadata"
            >
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollAnimal;