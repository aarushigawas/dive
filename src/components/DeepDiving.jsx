import React from 'react';
import './DeepDiving.css';

const DeepDiving = ({ onExploreAnimals, onExploreSuits }) => {
  // Add your video file path here (should be in public folder)
  const backgroundVideoSrc = '/jellyfish_wanted.mp4'; // Replace with your actual video file name

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    overflowX: 'hidden'
  };

  const backgroundOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 50, 100, 0.3), rgba(0, 30, 60, 0.4), rgba(20, 80, 120, 0.3))',
    zIndex: 1
  };

  const titleContainerStyle = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    textAlign: 'center'
  };

  const waveTextStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textShadow: `
      0 0 20px rgba(0, 150, 255, 0.8),
      0 0 40px rgba(0, 100, 200, 0.6),
      0 0 60px rgba(0, 50, 150, 0.4)
    `,
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '3px',
    background: 'linear-gradient(45deg, #00c9ff, #92fe9d, #00c9ff, #92fe9d)',
    backgroundSize: '300% 300%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'wave-animation 3s ease-in-out infinite, gradient-shift 4s ease infinite'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 5,
    paddingTop: '40vh',
    paddingBottom: '20vh',
    minHeight: '200vh'
  };

  const transparentBoxStyle = {
    margin: '8rem auto',
    maxWidth: '1000px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(15px) saturate(180%)',
    WebkitBackdropFilter: 'blur(15px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '3rem',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
    `,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const boxContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem'
  };

  const imagePlaceholderStyle = {
    flex: '0 0 200px',
    height: '200px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  };

  const placeholderTextStyle = {
    fontSize: '4rem',
    filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3))'
  };

  const textContentStyle = {
    flex: 1,
    color: '#ffffff'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#ffffff',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #00c9ff, #92fe9d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
  };

  const floatingParticleStyle = {
    position: 'fixed',
    width: '6px',
    height: '6px',
    background: 'radial-gradient(circle, #00c9ff, transparent)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 1,
    boxShadow: '0 0 10px #00c9ff'
  };

  // Generate random positions for particles
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    animationDelay: Math.random() * 5
  }));

  return (
    <div style={containerStyle} className="deep-diving-container">
      {/* Video Background - Fixed */}
      <div className="video-background-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
          src={backgroundVideoSrc}
        >
          <source src={backgroundVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={backgroundOverlayStyle} className="video-overlay"></div>
      </div>
      
      {/* Animated Title */}
      <div style={titleContainerStyle}>
        <h1 style={waveTextStyle} className="wave-text">Deep Diving</h1>
      </div>

      {/* Scrollable Content */}
      <div style={contentContainerStyle}>
        {/* Animals Section */}
        <div 
          className="transparent-box" 
          style={transparentBoxStyle}
          onClick={onExploreAnimals}
        >
          <div style={boxContentStyle} className="box-content">
            <div className="image-placeholder" style={imagePlaceholderStyle}>
              <div style={placeholderTextStyle} className="placeholder-text">
                <img src="/sardines_deep.jpg" alt="Fish" style={{ width: "100%", height: "auto" }} />
              </div>

            </div>
            <div style={textContentStyle} className="text-content">
              <h2 style={headingStyle}>Explore About the Animals</h2>
              <p style={paragraphStyle}>Discover the mysterious creatures of the deep ocean</p>
            </div>
          </div>
        </div>

        {/* Suits Section */}
        <div 
          className="transparent-box" 
          style={transparentBoxStyle}
          onClick={onExploreSuits}
        >
          <div style={boxContentStyle} className="box-content">
            <div className="image-placeholder" style={imagePlaceholderStyle}>
              <div style={placeholderTextStyle} className="placeholder-text">
  <img src="/deep_scuba.jpg" alt="Fish" style={{ width: "100%", height: "auto" }} />
</div>

            </div>
            <div style={textContentStyle} className="text-content">
              <h2 style={headingStyle}>Explore About the Suits</h2>
              <p style={paragraphStyle}>Learn about advanced diving equipment and technology</p>
            </div>
          </div>
        </div>

        {/* Additional spacing for scroll effect */}
        <div style={{ height: '100vh' }}></div>
      </div>

      {/* Floating particles effect */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            ...floatingParticleStyle,
            left: `${particle.x}px`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            animationDelay: `${particle.animationDelay}s`
          }}
        />
      ))}
    </div>
  );
};

export default DeepDiving;