import React, { useState, useRef, useEffect } from "react";
import "./ScrollAnimal.css";

const ScrollAnimal = ({
  image,
  top,
  left,
  alt,
  info,
  audio,
  size = 120,
  zoneOffset = 0
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [infoPosition, setInfoPosition] = useState('position-right');
  const audioRef = useRef(null);
  const animalRef = useRef(null);

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

  // Calculate smart positioning for the info box
  useEffect(() => {
    const calculatePosition = () => {
      if (!animalRef.current) return;

      const rect = animalRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const infoBoxWidth = 320;
      const infoBoxHeight = 150; // Approximate height

      // Check if there's enough space on the right
      if (rect.right + infoBoxWidth + 20 > windowWidth) {
        // Not enough space on right, try left
        if (rect.left - infoBoxWidth - 20 > 0) {
          setInfoPosition('position-left');
        } else {
          // Not enough space on left either, try top or bottom
          if (rect.top - infoBoxHeight - 20 > 0) {
            setInfoPosition('position-top');
          } else {
            setInfoPosition('position-bottom');
          }
        }
      } else {
        setInfoPosition('position-right');
      }
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [left, top]);

  const calculatedTop = top + zoneOffset;

  return (
    <div
      ref={animalRef}
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
     
      <div className={`animal-info ${infoPosition}`}>
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