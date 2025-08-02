import React, { useState, useEffect } from 'react';

// Horror stories data
const horrorStories = [
  {
    id: 1,
    title: "The Captain's Last Entry",
    background: "linear-gradient(135deg, #0c1445 0%, #1a1a2e 50%, #16213e 100%)",
    story: "The fog rolled in thick that night, swallowing our ship whole. The compass spun wildly, pointing to directions that shouldn't exist. Captain Morrison's final log entry spoke of voices beneath the waves, calling our names in languages we'd never heard. When dawn broke, we found his cabin empty, the window wide open to the churning sea. On his desk, carved deep into the wood with trembling hands: 'They're not gone. They're waiting.' The crew whispers that on moonless nights, you can still hear him pacing the deck above, forever searching for a harbor that exists only in the depths of madness."
  },
  {
    id: 2,
    title: "Echoes from the Hull",
    background: "linear-gradient(135deg, #2d1b69 0%, #11001c 50%, #0f3460 100%)",
    story: "Deep in the ship's belly, where sunlight has never touched, something stirs in the darkness. The crew reported strange sounds—metal groaning, not from the sea's pressure, but from within. Scratching. Tapping. A rhythm too deliberate to be random. When brave souls ventured below with lanterns, they found scratch marks on the inner hull, forming symbols that hurt to look at directly. The marks were fresh. But this ship has been underwater for seventy years, and no living thing could survive in those flooded chambers. Yet the sounds continue, growing louder with each passing storm, as if whatever dwells below grows stronger with time."
  },
  {
    id: 3,
    title: "The Anchor's Pull",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    story: "The anchor chain stretches down into an abyss so deep that no light penetrates its depths. Divers who have tried to follow it report the same terrifying experience: the chain doesn't end at the sea floor. It continues descending into a void that seems to swallow sound itself. Those who venture too far speak of a presence at the chain's end—something vast and patient, holding the ship not as debris, but as bait. The chain pulls at the ship with unnatural force during certain tides, as if whatever lurks below grows restless, testing its bonds, waiting for the right moment to reel in its catch."
  },
  {
    id: 4,
    title: "Whispers from the Deck",
    background: "linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #2d1b69 100%)",
    story: "On calm nights, when the sea is glass-still, the deck comes alive with phantom footsteps. Witnesses describe the sound of rope being coiled, orders being shouted in voices that carry no weight in the air. The ghostly crew performs their eternal duties, unaware that death has claimed them. But it's not the dead sailors that terrify those who've heard them—it's the sound of something else moving among them. Heavy, deliberate steps that don't match the crew's familiar patterns. Something that walks the deck with purpose, commanding the spirits with authority that extends beyond the grave. And sometimes, just sometimes, those heavy footsteps pause at the ship's edge, as if whatever casts them is looking up through the water, directly at you."
  },
  {
    id: 5,
    title: "The Crow's Nest Vigil",
    background: "linear-gradient(135deg, #0c1445 0%, #2d1b69 50%, #11001c 100%)",
    story: "High above the deck, the crow's nest sways with currents that shouldn't reach it. From this vantage point, the lookout once watched for dangers on the horizon. Now, something else keeps vigil there. Divers report a figure silhouetted against the murky water, always facing away, always watching the endless dark. When approached, the figure never turns, but the water around the crow's nest grows impossibly cold. Those brave enough to reach the platform find it empty, yet the impression of someone standing there remains. The brass telescope, untouched by corrosion, points not toward the surface or the seafloor, but into the deep ocean trenches where no light has ever shone. And through its lens, they say, you can see what the eternal watchman sees: the things that swim in the spaces between spaces, waiting for their turn to rise."
  },
  {
    id: 6,
    title: "Cabin of Perpetual Night",
    background: "linear-gradient(135deg, #11001c 0%, #0c1445 50%, #16213e 100%)",
    story: "Behind a door that should have rotted away decades ago, the captain's cabin remains perfectly preserved. No water has entered this room, though the ship has been submerged for generations. The air inside is thick and stale, filled with the scent of old leather and something else—something that makes visitors' skin crawl with primitive fear. Maps on the walls show coastlines that don't exist, marking islands that appear on no earthly chart. The captain's chair faces away from the door, and though it appears empty, the leather seat bears the permanent impression of someone who has never left. On the desk, an inkwell that never dries feeds a quill that writes by itself, adding entries to a logbook with dates that haven't happened yet. Each entry describes storms that haven't come, crews that haven't sailed, and horrors that are yet to be unleashed upon the world above."
  }
];

const Mysteries = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentStoryId, setCurrentStoryId] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHotspotClick = (storyId) => {
    setCurrentStoryId(storyId);
    setCurrentPage('story');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // Hotspot component
  const Hotspot = ({ left, top, id, name, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
    
    return (
      <div
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: '25px',
          height: '25px',
          cursor: 'pointer',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleHotspotClick(id)}
      >
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '10px',
          height: '10px',
          background: isHovered ? 'rgba(255, 100, 100, 0.9)' : 'rgba(100, 200, 255, 0.9)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(255, 100, 100, 0.8), 0 0 35px rgba(255, 100, 100, 0.5)' 
            : '0 0 15px rgba(100, 200, 255, 0.7), 0 0 25px rgba(100, 200, 255, 0.4)',
          animation: 'pulse 2s infinite ease-in-out'
        }} />
        
        {/* Pulse ring */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '25px',
          height: '25px',
          border: `2px solid ${isHovered ? 'rgba(255, 100, 100, 0.5)' : 'rgba(100, 200, 255, 0.5)'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'ripple 2.5s infinite ease-out'
        }} />
        
        {/* Tooltip */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            bottom: '35px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(100, 200, 255, 0.4)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
            zIndex: 20
          }}>
            {name}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0, 0, 0, 0.9)'
            }} />
          </div>
        )}
      </div>
    );
  };

  // Story page component
  const StoryPage = ({ storyId }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const story = horrorStories.find(s => s.id === storyId) || horrorStories[0];

    useEffect(() => {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsLoaded(false);
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }, [storyId]);

    useEffect(() => {
      if (currentIndex < story.story.length && isLoaded) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + story.story[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 25);
        return () => clearTimeout(timer);
      }
    }, [currentIndex, story.story, isLoaded]);

    return (
      <div style={{
        minHeight: '100vh',
        background: story.background,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '900px',
          width: '100%',
          zIndex: 3,
          position: 'relative',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1s ease'
        }}>
          <button 
            onClick={handleBackToHome}
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(100, 150, 200, 0.4)',
              color: 'rgba(100, 200, 255, 0.9)',
              padding: '14px 28px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderRadius: '8px',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <span>←</span>
            <span>Return to Ship</span>
          </button>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            marginBottom: '2.5rem',
            color: '#fff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(100, 200, 255, 0.2)',
            lineHeight: 1.2
          }}>
            {story.title}
          </h1>
          
          <div style={{
            fontSize: '1.3rem',
            lineHeight: 1.9,
            color: 'rgba(255, 255, 255, 0.92)',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Georgia, serif',
            textAlign: 'justify'
          }}>
            {displayedText}
            <span style={{
              opacity: 1,
              animation: 'blink 1.2s infinite',
              color: 'rgba(100, 200, 255, 0.8)',
              fontWeight: 'bold'
            }}>|</span>
          </div>
        </div>
        
        {/* Floating particles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              style={{
                position: 'absolute',
                width: i % 3 === 0 ? '4px' : i % 3 === 1 ? '6px' : '3px',
                height: i % 3 === 0 ? '4px' : i % 3 === 1 ? '6px' : '3px',
                background: i % 3 === 0 ? 'rgba(100, 200, 255, 0.5)' : i % 3 === 1 ? 'rgba(255, 100, 150, 0.5)' : 'rgba(150, 255, 100, 0.5)',
                borderRadius: '50%',
                left: `${20 + (i * 15) % 60}%`,
                opacity: 0.3,
                animation: `particleFloat${i % 3} ${15 + (i % 5)}s infinite linear`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Calculate boat position - start from middle of 2nd section, move VERY slowly
  const getBoatPosition = () => {
    const windowHeight = window.innerHeight;
    const firstSectionHeight = windowHeight; // First section (title)
    const secondSectionStart = windowHeight; // Second section starts
    const secondSectionMiddle = windowHeight * 1.5; // Middle of second section
    
    // Don't show boat until second section
    if (scrollY < secondSectionStart) {
      return windowHeight + 200; // Hide boat
    }
    
    // Start boat at middle of second section
    const boatStartPosition = windowHeight * 0.5; // Middle of screen
    
    // Very slow movement - boat moves down only 200px over entire scroll range
    const scrollRange = windowHeight * 5; // Large scroll range for slow movement
    const scrollProgress = Math.min((scrollY - secondSectionMiddle) / scrollRange, 1);
    const maxMovement = 200; // Only move 200px maximum
    
    return boatStartPosition + (scrollProgress * maxMovement);
  };

  // Hotspot positions on the boat
  const hotspots = [
    { id: 1, left: 30, top: 25, name: "Captain's Cabin" },
    { id: 2, left: 45, top: 70, name: "Hull" },
    { id: 3, left: 15, top: 80, name: "Anchor" },
    { id: 4, left: 55, top: 40, name: "Deck" },
    { id: 5, left: 75, top: 15, name: "Crow's Nest" },
    { id: 6, left: 65, top: 60, name: "Lower Cabin" }
  ];

  if (currentPage === 'story') {
    return <StoryPage storyId={currentStoryId} />;
  }

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.3); }
          }
          
          @keyframes ripple {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
          }
          
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          
          @keyframes particleFloat0 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10%, 90% { opacity: 0.3; }
            50% { transform: translateY(50vh) translateX(100px); }
            100% { transform: translateY(-10vh) translateX(-50px); opacity: 0; }
          }
          
          @keyframes particleFloat1 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10%, 90% { opacity: 0.3; }
            50% { transform: translateY(40vh) translateX(-80px); }
            100% { transform: translateY(-10vh) translateX(80px); opacity: 0; }
          }
          
          @keyframes particleFloat2 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10%, 90% { opacity: 0.3; }
            50% { transform: translateY(60vh) translateX(50px); }
            100% { transform: translateY(-10vh) translateX(-100px); opacity: 0; }
          }
          
          @keyframes titleWave {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10%, 90% { opacity: 0.1; }
            50% { transform: translateY(-20vh) rotate(180deg); opacity: 0.3; }
          }
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { font-family: Arial, sans-serif; overflow-x: hidden; }
        `}
      </style>
      
      <div style={{ position: 'relative' }}>
        {/* Fixed Background with Ocean Colors */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          background: `
            linear-gradient(135deg, 
              #0a1628 0%, 
              #1e3a5f 15%, 
              #2d5a87 30%, 
              #1a4c7a 45%, 
              #0f2847 60%, 
              #1c3d5a 75%, 
              #0d1b2a 90%, 
              #061016 100%
            )
          `,
          zIndex: -2,
          transform: `translateY(${scrollY * 0.2}px)`
        }} />
        
        {/* Animated water effect */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(64, 164, 223, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(30, 144, 255, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 80%, rgba(0, 119, 190, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 10%, rgba(135, 206, 250, 0.08) 0%, transparent 45%)
          `,
          zIndex: -2,
          animation: 'waterFlow 20s ease-in-out infinite'
        }} />
        
        {/* Fallback background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, #0a1628 0%, #1e3a5f 25%, #2d5a87 50%, #1a4c7a 75%, #0f2847 100%)',
          zIndex: -3
        }} />
        
        {/* Floating elements */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1
        }}>
          {[...Array(15)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: i % 4 === 0 ? '60px' : i % 4 === 1 ? '40px' : i % 4 === 2 ? '80px' : '50px',
              height: i % 4 === 0 ? '60px' : i % 4 === 1 ? '40px' : i % 4 === 2 ? '80px' : '50px',
              background: i % 4 === 0 ? 'rgba(100, 200, 255, 0.3)' : i % 4 === 1 ? 'rgba(255, 100, 150, 0.3)' : i % 4 === 2 ? 'rgba(150, 255, 100, 0.3)' : 'rgba(255, 200, 100, 0.3)',
              borderRadius: '50%',
              left: `${10 + (i * 20) % 80}%`,
              opacity: 0.1,
              animation: `float ${20}s infinite ease-in-out`,
              animationDelay: `${i * -5}s`
            }} />
          ))}
        </div>
        
        {/* Content sections */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(2px)'
          }}>
            <h1 style={{
              fontSize: '6rem',
              fontWeight: 200,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: '2rem',
              display: 'flex',
              gap: '0.1em',
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 1s ease',
              textShadow: '0 0 20px rgba(100, 200, 255, 0.5), 0 0 40px rgba(100, 200, 255, 0.3)'
            }}>
              {'MYSTERIES'.split('').map((letter, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  animation: titleVisible ? `titleWave 3s infinite ease-in-out ${i * 0.1}s` : 'none'
                }}>
                  {letter}
                </span>
              ))}
            </h1>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: titleVisible ? 1 : 0,
              animation: titleVisible ? 'fadeInUp 1s ease-out 2s forwards' : 'none'
            }}>
              <div style={{
                fontSize: '2rem',
                color: 'rgba(100, 200, 255, 0.8)',
                animation: 'titleWave 2s infinite'
              }}>↓</div>
              <span style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em'
              }}>Dive Deeper</span>
            </div>
          </section>

          {/* Boat Section */}
          <section style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5%',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(1px)'
          }}>
            <div>
              <h2 style={{
                fontSize: '3.5rem',
                fontWeight: 300,
                color: '#fff',
                marginBottom: '1rem'
              }}>
                <span style={{
                  textShadow: '0 0 20px rgba(255, 100, 100, 0.5), 2px 0 0 rgba(255, 0, 0, 0.3), -2px 0 0 rgba(0, 255, 255, 0.3)'
                }}>Abandoned</span>{' '}
                <span style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                }}>Boat</span>
              </h2>
              <p style={{
                fontSize: '1.3rem',
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
              }}>Scroll down to uncover the mysteries</p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <h2 style={{
                fontSize: '2.8rem',
                fontWeight: 300,
                color: '#fff',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem'
              }}>
                <span>The</span>
                <span>stories</span>
                <span>are</span>
                <span>neverending</span>
              </h2>
            </div>
          </section>

          {/* Interactive Section */}
          <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 5 }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: '#fff',
                textShadow: '0 0 20px rgba(100, 200, 255, 0.5)',
                marginBottom: '0.5rem'
              }}>Explore the Depths</h2>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>Click on the glowing points to discover their secrets</p>
            </div>
          </section>

          {          /* Extra space for scrolling */}
          <div style={{ height: '200vh', background: 'rgba(0, 0, 0, 0.8)' }} />
        </div>

        {/* Scrolling Boat - Appears in 2nd section, moves very slowly */}
        {scrollY > window.innerHeight * 0.8 && (
          <div style={{
            position: 'fixed',
            left: '50%',
            top: `${getBoatPosition()}px`,
            transform: 'translateX(-50%)',
            zIndex: 10,
            transition: 'top 0.05s ease-out' // Smoother transition
          }}>
            <img 
              src="/boat.png" 
              alt="Scrolling Boat" 
              style={{
                maxWidth: '500px',
                maxHeight: '400px',
                width: 'auto',
                height: 'auto',
                filter: 'drop-shadow(0 0 30px rgba(100, 150, 200, 0.4))',
                opacity: 0.95
              }}
            />
            
            {/* Water ripples */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '120px',
              pointerEvents: 'none'
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  border: '2px solid rgba(100, 200, 255, 0.4)',
                  borderRadius: '50%',
                  width: `${60 + i * 40}px`,
                  height: `${30 + i * 20}px`,
                  left: `${40 - i * 5}%`,
                  top: `${50 - i * 10}%`,
                  animation: 'ripple 4s infinite ease-out',
                  animationDelay: `${i * 1.3}s`
                }} />
              ))}
            </div>
            
            {/* Hotspots - show when boat is visible */}
            {scrollY > window.innerHeight * 1.2 && hotspots.map((hotspot, index) => (
              <Hotspot
                key={hotspot.id}
                left={hotspot.left}
                top={hotspot.top}
                id={hotspot.id}
                name={hotspot.name}
                delay={index * 300}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Mysteries;