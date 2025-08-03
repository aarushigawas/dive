import React from 'react';
import { motion } from 'framer-motion';
import './DeepDiving.css';

const DeepDiving = ({ onExploreAnimals, onExploreSuits }) => {
  
  const backgroundVideoSrc = '/jellyfish_wanted.mp4'; 

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
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    textAlign: 'center'
  };

  const improvedTitleStyle = {
    fontSize: '5rem',
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
    letterSpacing: '2px',
    background: 'linear-gradient(135deg, #00d4ff, #7b2cbf, #06ffa5, #4cc9f0)',
    backgroundSize: '400% 400%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 4px 20px rgba(0, 150, 255, 0.3))'
  };

  const taglineStyle = {
    fontSize: '1.4rem',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: '"Inter", "Arial", sans-serif',
    letterSpacing: '1px',
    textShadow: '0 0 20px rgba(0, 200, 255, 0.6), 0 2px 10px rgba(0, 0, 0, 0.3)',
    marginTop: '0.5rem'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 5,
    paddingTop: '40vh',
    paddingBottom: '20vh',
    minHeight: '200vh'
  };

  const improvedBoxStyle = {
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

  const improvedImageStyle = {
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
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  };

  const textContentStyle = {
    flex: 1,
    color: '#ffffff'
  };

  const improvedHeadingStyle = {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: '"Poppins", "Inter", sans-serif',
    background: 'linear-gradient(135deg, #00d4ff, #06ffa5, #4cc9f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))',
    textShadow: '0 0 30px rgba(0, 200, 255, 0.4)'
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
    fontFamily: '"Inter", sans-serif'
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

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    animationDelay: Math.random() * 5
  }));

  // Animation variants
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      filter: 'blur(20px)' 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.2
      } 
    }
  };

  const taglineVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 1
      } 
    }
  };

  const boxVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2 
      } 
    }
  };

  return (
    <div style={containerStyle} className="deep-diving-container">
      
      <link 
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
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
      
      <div style={titleContainerStyle}>
        <motion.h1 
          style={improvedTitleStyle} 
          className="improved-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Deep Diving
        </motion.h1>
        <motion.p 
          style={taglineStyle} 
          className="tagline"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
        >
          Uncover what lies beneath the surface
        </motion.p>
      </div>

      
      <div style={contentContainerStyle}>
      
        <motion.div 
          className="transparent-box improved-box" 
          style={improvedBoxStyle}
          onClick={onExploreAnimals}
          variants={boxVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            scale: 1.02, 
            y: -8,
            boxShadow: '0 35px 70px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 200, 255, 0.3)',
            transition: { duration: 0.3 }
          }}
        >
          <div style={boxContentStyle} className="box-content">
            <motion.div 
              className="image-placeholder improved-image" 
              style={improvedImageStyle}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src="/sardines_deep.jpg" 
                alt="Deep Sea Fish" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  borderRadius: "13px"
                }} 
              />
            </motion.div>
            <motion.div 
              style={textContentStyle} 
              className="text-content"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 style={improvedHeadingStyle}>Explore About the Animals</h2>
              <motion.p 
                style={paragraphStyle}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Discover the mysterious creatures of the deep ocean
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Suits Section */}
        <motion.div 
          className="transparent-box improved-box" 
          style={improvedBoxStyle}
          onClick={onExploreSuits}
          variants={boxVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            scale: 1.02, 
            y: -8,
            boxShadow: '0 35px 70px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 200, 255, 0.3)',
            transition: { duration: 0.3 }
          }}
        >
          <div style={boxContentStyle} className="box-content">
            <motion.div 
              className="image-placeholder improved-image" 
              style={improvedImageStyle}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src="/deep_scuba.jpg" 
                alt="Deep Diving Suit" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  borderRadius: "13px"
                }} 
              />
            </motion.div>
            <motion.div 
              style={textContentStyle} 
              className="text-content"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 style={improvedHeadingStyle}>Explore About the Suits</h2>
              <motion.p 
                style={paragraphStyle}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Learn about advanced diving equipment and technology
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <div style={{ height: '100vh' }}></div>
      </div>

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