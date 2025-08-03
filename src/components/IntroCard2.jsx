import React, { useEffect, useState } from "react";
import "./IntroCard2.css";

const IntroCard2 = ({ onStartDive, onBackToDeepDiving, onEquipmentComplete }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  
  const handleStartDive = () => {
    setShowTransition(true);
  };

  
  const handleTransitionComplete = () => {
    setShowTransition(false);
  
    if (onEquipmentComplete) {
      onEquipmentComplete();
    } else if (onStartDive) {
      onStartDive();
    }
  };

  
  const generateFloatingOrbs = () => {
    const orbs = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 60 + 20;
      const left = Math.random() * 80 + 10;
      const animationDuration = Math.random() * 15 + 10;
      const animationDelay = Math.random() * 5;
      
      orbs.push(
        <div
          key={i}
          className="floating-orb"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
            background: `radial-gradient(circle, 
              rgba(135, 206, 235, ${Math.random() * 0.6 + 0.2}) 0%, 
              rgba(135, 206, 235, ${Math.random() * 0.3 + 0.1}) 70%, 
              transparent 100%)`
          }}
        />
      );
    }
    return orbs;
  };

  
  const generateStreamingLights = () => {
    const lights = [];
    for (let i = 0; i < 8; i++) {
      const left = Math.random() * 90 + 5;
      const animationDuration = Math.random() * 4 + 3;
      const animationDelay = Math.random() * 3;
      
      lights.push(
        <div
          key={i}
          className="light-stream"
          style={{
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`
          }}
        />
      );
    }
    return lights;
  };

  return (
    <>
      <div className={`intro-card2-container ${isVisible ? 'visible' : ''}`}>
        
        <div className="video-background2">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video2"
          >
            <source src="/intro2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay2"></div>
        </div>

        
        <div className="floating-orbs-container">
          {generateFloatingOrbs()}
        </div>
        
        <div className="streaming-lights-container">
          {generateStreamingLights()}
        </div>

        
        <div 
          className="cursor-glow"
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
        ></div>
        
        <div className="intro2-content">
          <div className="intro2-header">
            <div className="logo-section">
              
            </div>
            <h1 className="intro2-title">
              <span className="title-deep">Deep</span>
              <span className="title-blue">Blue</span>
            </h1>
            <p className="intro2-subtitle">Advanced Deep-Sea Technology & Equipment</p>
          </div>

        
          <div className="intro2-features">
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">⚙️</div>
                <div className="feature-text">
                  <h3>Advanced Suits</h3>
                  <p>Atmospheric diving suits for extreme depths</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔬</div>
                <div className="feature-text">
                  <h3>Research Tools</h3>
                  <p>Scientific equipment for deep-sea exploration</p>
                </div>
              </div>
              
              
            </div>
          </div>

          
          <div className="intro2-stats-section">
            <div className="stats-container">
              <div className="stat-circle">
                <div className="stat-value">1200m</div>
                <div className="stat-label">Max Depth</div>
              </div>
              <div className="stat-circle">
                <div className="stat-value">8hrs</div>
                <div className="stat-label">Battery Life</div>
              </div>
              <div className="stat-circle">
                <div className="stat-value">1 ATM</div>
                <div className="stat-label">Pressure</div>
              </div>
            </div>
          </div>

          
          <div className="intro2-description">
            <p>
              Explore the cutting-edge technology that makes deep-sea exploration possible. 
            </p>
          </div>

          
          <div className="intro2-actions">
            <button 
              className="dive-btn-2"
              onClick={handleStartDive}
            >
              <div className="btn-content">
                <span>🚀 Begin Equipment Tour</span>
                <span className="btn-arrow">→</span>
              </div>
              <div className="btn-glow"></div>
              <div className="btn-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
            </button>

            {onBackToDeepDiving && (
              <button 
                className="back-btn-2"
                onClick={onBackToDeepDiving}
              >
                ← Back to Deep Diving
              </button>
            )}
          </div>
        </div>

      
        <div className="decorative-elements">
          <div className="deco-circle deco-1"></div>
          <div className="deco-circle deco-2"></div>
          <div className="deco-line deco-3"></div>
          <div className="deco-line deco-4"></div>
        </div>
      </div>

      
      {showTransition && (
        <BubbleTransition2 onComplete={handleTransitionComplete} />
      )}
    </>
  );
};

const BubbleTransition2 = ({ onComplete }) => {
  const [bubbles, setBubbles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    
    const initialBubbles = [];
    for (let i = 0; i < 30; i++) {
      initialBubbles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 200,
        size: Math.random() * 80 + 20,
        speed: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`
      });
    }
    setBubbles(initialBubbles);

  
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        onComplete && onComplete();
      }, 1000);
    }, 4500);

  
    const interval = setInterval(() => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed * 2,
          x: bubble.x + Math.sin(Date.now() * 0.001 + bubble.id) * 0.8
        })).filter(bubble => bubble.y > -100)
      );
    }, 50);

    return () => {
      clearTimeout(animationTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="bubble-transition2">
    
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="transition-bubble2"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
            background: `radial-gradient(circle at 30% 30%, ${bubble.color}, rgba(255,255,255,0.1))`,
            animationDelay: `${bubble.id * 0.1}s`
          }}
        />
      ))}

      
      <div className="transition-text2" style={{ opacity: isAnimating ? 1 : 0 }}>
        <div className="transition-main-text">🌊 Diving Deep...</div>
        <div className="transition-sub-text">Preparing Equipment Tour</div>
      </div>
    </div>
  );
};


function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}


setVH();

window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', () => {
  setTimeout(setVH, 100);
});


let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);


if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.classList.add('mobile-device');
}

export default IntroCard2;