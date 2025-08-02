import React, { useRef, useState } from "react";
import "./ScrollAnimal.css";

const ScrollAnimal = ({
  image,
  top,
  left,
  size = 120,
  alt,
  info,
  audio,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioClick = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div
      className="scroll-animal"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <img
        src={image}
        alt={alt}
        className="animal-image"
        style={{
          width: `${size}px`,
          height: "auto",
        }}
      />

      <div className="animal-info">
        <div className="info-text">{info}</div>
        {audio && (
          <>
            <div
              className={`audio-icon ${isPlaying ? "playing" : ""}`}
              onClick={handleAudioClick}
              title="Play Sound"
            >
              🔊
            </div>
            <audio ref={audioRef} src={audio} preload="auto" />
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollAnimal;
