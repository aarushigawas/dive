import React, { useEffect, useState } from "react";
import "./IntroCard.css";

const IntroCard = ({ onStartDive, videoSrc }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate bubbles for intro card
  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = 15; // Fixed count for intro
    
    for (let i = 0; i < bubbleCount; i++) {
      const delay = i * 0.5;
      const size = Math.random() * 30 + 10;
      const left = Math.random() * 90 + 5;
      const animationDuration = Math.random() * 5 + 6;
      const opacity = Math.random() * 0.5 + 0.1;
      
      bubbles.push(
        <div
          key={i}
          className="intro-bubble transparent-bubble"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${animationDuration}s`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
          }}
        />
      );
    }
    return bubbles;
  };

  // Generate floating particles
  const generateParticles = () => {
    const particles = [];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 20 + 25;
      
      particles.push(
        <div
          key={i}
          className="intro-particle"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="intro-card-container">
      {/* Video Background */}
      <div className="video-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to darken video and blend with effects */}
        <div className="video-overlay"></div>
      </div>

      {/* Floating bubbles */}
      <div className="intro-bubbles-container">
        {generateBubbles()}
      </div>
      
      {/* Floating particles */}
      <div className="intro-particles-container">
        {generateParticles()}
      </div>
      
      {/* Caustic light effects */}
      <div className="intro-caustic-lights">
        <div className="intro-caustic-pattern intro-caustic-1" />
        <div className="intro-caustic-pattern intro-caustic-2" />
        <div className="intro-caustic-pattern intro-caustic-3" />
      </div>

      {/* Interactive mouse light effect */}
      <div 
        className="mouse-light-effect"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Main content */}
      <div className="intro-content">
        <div className="intro-header">
          <h1 className="intro-title">
            <span className="title-ocean">Ocean</span>
            <span className="title-depths">Depths</span>
          </h1>
          <p className="intro-subtitle">Dive into the mysterious world beneath the waves</p>
        </div>

        <div className="intro-stats">
          <div className="stat-item">
            <div className="stat-number">11,000m</div>
            <div className="stat-label">Maximum Depth</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">7</div>
            <div className="stat-label">Ocean Zones</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Unexplored</div>
          </div>
        </div>

        <div className="intro-description">
          <p>
            Journey through the ocean's mysterious layers, from the sunlit surface 
            to the crushing depths of the hadal zone. Discover incredible creatures 
            that have adapted to life in one of Earth's most extreme environments.
          </p>
        </div>

        <button className="start-dive-btn" onClick={onStartDive}>
          <span>Start Your Dive</span>
          <div className="btn-bubbles">
            <div className="btn-bubble"></div>
            <div className="btn-bubble"></div>
            <div className="btn-bubble"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default IntroCard;