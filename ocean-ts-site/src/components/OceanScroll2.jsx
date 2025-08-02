import React, { useState, useEffect } from 'react';
import "./OceanScroll1.css";
import ScrollAnimal from "./ScrollAnimal";

const OceanScroll = () => {
  const [currentDepth, setCurrentDepth] = useState(0);
  const [currentZone, setCurrentZone] = useState('surface');

  // Depth markers and their corresponding scroll positions
  const depthMarkers = React.useMemo(() => [
    { depth: 0, scrollPos: 0, zone: 'surface' },
    { depth: 10, scrollPos: 0, zone: 'snorkel' },
    { depth: 40, scrollPos: 1600, zone: 'scuba' },
    { depth: 300, scrollPos: 2400, zone: 'commercial' },
    { depth: 1000, scrollPos: 3200, zone: 'exosuit' },
    { depth: 1200, scrollPos: 4000, zone: 'limit' },
    { depth: 4000, scrollPos: 4800, zone: 'twilight' },
    { depth: 6000, scrollPos: 5600, zone: 'abyssal' },
    { depth: 11000, scrollPos: 6400, zone: 'hadal' }
  ], []);

  const zoneData = {
    surface: {
      title: "Surface Waters",
      narration: "Welcome, brave explorer! Ready to dive into the mysteries of the deep? The ocean awaits... Just swimming gear needed here!",
      image: "🏊‍♂️"
    },
    snorkel: {
      title: "Snorkel Zone",
      subtitle: "(0-10m)",
      narration: "🥽 EQUIPMENT: Snorkel gear (mask, fins, snorkel). ⚠️ RISKS: Completely safe - pressure only ~1.5x atmospheric. 🌊 FACT: Air is still breathable from the surface. Perfect for coral reefs!",
      image: "🤿"
    },
    scuba: {
      title: "Scuba Diving Depth",
      subtitle: "(10-40m)",
      narration: "🥽 EQUIPMENT: Scuba suit with oxygen tanks. ⚠️ RISKS: Nitrogen narcosis can make you feel drunk underwater! Also beware of decompression sickness ('the bends'). 🌊 FACT: Must ascend slowly to avoid dangerous gas bubbles in blood.",
      image: "🏊‍♂️"
    },
    commercial: {
      title: "Commercial Diving",
      subtitle: "(40-300m)",
      narration: "🥽 EQUIPMENT: Atmospheric diving suits like JIM suit or Newtsuit. ⚠️ RISKS: Without suit, you'd experience lung collapse and blood vessel rupture! 🌊 FACT: These suits maintain normal 1 atm pressure inside.",
      image: "🤖"
    },
    exosuit: {
      title: "Exosuit Territory",
      subtitle: "(300-1000m)",
      narration: "🥽 EQUIPMENT: Exosuit - high-tech ADS with thrusters and lights. ⚠️ RISKS: Over 100x atmospheric pressure could crush a car instantly! 🌊 FACT: These suits cost millions of dollars each.",
      image: "⚙️"
    },
    limit: {
      title: "Human Limit",
      subtitle: "(1000-1200m)",
      narration: "🥽 EQUIPMENT: Maximum depth JIM suit can reach. ⚠️ RISKS: This is the absolute limit for human survival in any suit! 🌊 FACT: Record depth: ~1200m by JIM suit. Beyond here, only submersibles work!",
      image: "🚫"
    },
    twilight: {
      title: "Twilight Zone",
      subtitle: "(1200-4000m)",
      narration: "🥽 EQUIPMENT: DSV Alvin, Nereus submersibles only. ⚠️ RISKS: Crushing pressure - no human can survive here in suits. 🌊 FACT: The Titanic wreck lies at ~3,800m depth in this zone!",
      image: "🚢"
    },
    abyssal: {
      title: "Abyssal Zone",
      subtitle: "(4000-6000m)",
      narration: "🥽 EQUIPMENT: ROVs (Remote Operated Vehicles) and Bathyscaphes only. ⚠️ RISKS: Complete darkness and extreme pressure. 🌊 FACT: No manned vessels dare come here - too dangerous even for submarines!",
      image: "🤖"
    },
    hadal: {
      title: "Hadal Zone",
      subtitle: "(6000-11000m)",
      narration: "🥽 EQUIPMENT: DSV Limiting Factor (Victor Vescovo, 2019). ⚠️ RISKS: Maximum ocean depth pressure! 🌊 FACT: Deepest human dive: 10,927m in Mariana Trench. Challenger Deep: 10,984m. You've reached the bottom of Earth!",
      image: "🏆"
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      
      // Calculate current depth based on scroll position
      const maxScroll = 6400;
      const depth = Math.round((scrollTop / maxScroll) * 11000);
      setCurrentDepth(Math.min(depth, 11000));
      
      // Determine current zone
      for (let i = depthMarkers.length - 1; i >= 0; i--) {
        if (scrollTop >= depthMarkers[i].scrollPos) {
          setCurrentZone(depthMarkers[i].zone);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [depthMarkers]);

  // Calculate background based on depth - smooth blue to black gradient
  const getBackgroundStyle = () => {
    const scrollRatio = Math.min(window.pageYOffset / 6400, 1);
    
    // Smooth blue to black gradient
    const topBlue = { r: 70, g: 130, b: 180 }; // Steel blue
    const midBlue = { r: 30, g: 80, b: 120 };  // Medium blue  
    const deepBlue = { r: 15, g: 40, b: 80 };  // Deep blue
    const black = { r: 0, g: 0, b: 0 };        // Black
    
    // Create smooth gradient based on scroll position
    let currentColor;
    if (scrollRatio < 0.3) {
      const ratio = scrollRatio / 0.3;
      currentColor = {
        r: Math.round(topBlue.r * (1 - ratio) + midBlue.r * ratio),
        g: Math.round(topBlue.g * (1 - ratio) + midBlue.g * ratio),
        b: Math.round(topBlue.b * (1 - ratio) + midBlue.b * ratio)
      };
    } else if (scrollRatio < 0.7) {
      const ratio = (scrollRatio - 0.3) / 0.4;
      currentColor = {
        r: Math.round(midBlue.r * (1 - ratio) + deepBlue.r * ratio),
        g: Math.round(midBlue.g * (1 - ratio) + deepBlue.g * ratio),
        b: Math.round(midBlue.b * (1 - ratio) + deepBlue.b * ratio)
      };
    } else {
      const ratio = (scrollRatio - 0.7) / 0.3;
      currentColor = {
        r: Math.round(deepBlue.r * (1 - ratio) + black.r * ratio),
        g: Math.round(deepBlue.g * (1 - ratio) + black.g * ratio),
        b: Math.round(deepBlue.b * (1 - ratio) + black.b * ratio)
      };
    }
    
    return {
      background: `linear-gradient(to bottom, 
        rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b}) 0%, 
        rgb(${Math.max(0, currentColor.r - 10)}, ${Math.max(0, currentColor.g - 10)}, ${Math.max(0, currentColor.b - 10)}) 50%,
        rgb(${Math.max(0, currentColor.r - 20)}, ${Math.max(0, currentColor.g - 20)}, ${Math.max(0, currentColor.b - 20)}) 100%)`
    };
  };

  const currentZoneData = zoneData[currentZone];

  return (
    <div style={{
      ...getBackgroundStyle(),
      minHeight: '800vh',
      position: 'relative',
      fontFamily: "'Inter', sans-serif",
      color: 'white'
    }}>
      {/* Gradient Lines */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '2px',
            height: '100vh',
            left: `${i * 2}%`,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)',
            animation: `wave-${i % 2} 4s ease-in-out infinite`,
            opacity: i % 2 === 0 ? 1 : 0.5
          }} />
        ))}
      </div>

      {/* AI Bot - Right Side */}
      <div style={{
        position: 'fixed',
        top: '150px',
        right: '30px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        maxWidth: '450px'
      }}>
        {/* Speech Bubble */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '20px',
          padding: '25px 30px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          backdropFilter: 'blur(15px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          minWidth: '320px'
        }}>
          {/* Speech bubble pointer */}
          <div style={{
            content: '',
            position: 'absolute',
            right: '-12px',
            top: '30px',
            width: 0,
            height: 0,
            border: '12px solid transparent',
            borderLeftColor: 'rgba(255, 255, 255, 0.98)'
          }} />
          
          <div style={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #0066cc, #0080ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.3rem',
            marginBottom: '12px',
            letterSpacing: '0.5px'
          }}>
            {currentDepth}m deep
          </div>
          
          <div style={{
            fontWeight: 'bold',
            color: '#003366',
            marginBottom: '15px',
            fontSize: '1.1rem',
            letterSpacing: '0.3px'
          }}>
            {currentZoneData.title}
          </div>
          
          <div style={{
            fontSize: '1rem',
            color: '#333',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            {currentZoneData.narration}
          </div>
        </div>

        {/* AI Bot Avatar */}
        <div style={{
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'float 3s ease-in-out infinite'
        }}>
          {/* Bot icon placeholder - you can replace with actual image */}
          <img src="/bot.png" alt="AI Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Content Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Initial blank space */}
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #00ffea, #00fbf7, #01ffc8)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease infinite',
            fontWeight: 700,
            textShadow: '0 0 30px rgba(0, 255, 234, 0.3)'
          }}>
            Deep Ocean Explorer
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 400,
            lineHeight: '1.8',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            Scroll down to begin your descent...
          </p>
        </div>

        {/* Depth Sections */}
        {depthMarkers.slice(1).map((marker, index) => {
          const data = zoneData[marker.zone];
          const isDeepZone = true;
          
          return (
            <div key={marker.depth} style={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              position: 'relative',
              background: isDeepZone ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
              borderTop: isDeepZone ? '1px solid rgba(255, 255, 100, 0.1)' : 'none',
              borderBottom: isDeepZone ? '1px solid rgba(255, 255, 100, 0.1)' : 'none'
            }}>
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                fontSize: '3rem',
                fontWeight: 'bold',
                color: isDeepZone ? '#ffff80' : '#00ffff',
                textShadow: isDeepZone ? '0 0 20px rgba(255, 255, 128, 0.7)' : '0 0 20px rgba(0, 255, 255, 0.7)',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 1s forwards'
              }}>
                {marker.depth}m
              </div>
              
              <div style={{
                maxWidth: '1200px',
                textAlign: 'center'
              }}>
                {/* Zone Title - Just Text with Google Fonts */}
                <h2 style={{
                  fontSize: '2.5rem',
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 700,
                  background: isDeepZone ? 
                    'linear-gradient(90deg, #FFD700, #FFA500, #FF8C00)' : 
                    'linear-gradient(90deg, #4169E1, #1E90FF, #00BFFF)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 5s ease infinite',
                  textAlign: 'center',
                  margin: '0 0 1rem 0',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '1px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'fadeInUp 1s forwards'
                }}>
                  {data.title}
                  {data.subtitle && (
                    <span style={{
                      fontSize: '1.4rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      color: isDeepZone ? '#FFEBA0' : '#87CEEB',
                      WebkitBackgroundClip: 'unset',
                      WebkitTextFillColor: 'unset',
                      display: 'block',
                      marginTop: '0.5rem',
                      opacity: 0.9
                    }}>
                      {data.subtitle}
                    </span>
                  )}
                </h2>
              </div>
            </div>
          );
        })}

        {/* Example animals using your ScrollAnimal component */}
        <ScrollAnimal
          image="/parrotfish.png"
          top={1200}
          left={200}
          alt="Parrotfish"
          size={140}
          info="Parrotfish\nParrotfish sleep in a bubble of their own mucus to protect themselves from predators.\n\nThey poop sand — their beak-like teeth crush coral, and the leftovers become the white sand on tropical beaches."
        />

        <ScrollAnimal
          image="/dolphin.png"
          top={1300}
          left={600}
          size={180}
          alt="Bottlenose Dolphin"
          audio="/dolphin_noise.mp3"
          info="Bottlenose Dolphin\nBottlenose dolphins are highly intelligent marine mammals known for their complex social behavior, echolocation, and playful nature. They can swim up to 35 km/h and live in pods.\n\nBottlenose dolphins call each other by unique name-like whistles."
        />

        <ScrollAnimal
          image="/jellyfish.png"
          top={2500}
          left={400}
          alt="Deep Sea Jellyfish"
          size={160}
          info="Deep Sea Jellyfish\nThese transparent creatures drift through the ocean depths, some species can glow with bioluminescence.\n\nMany deep-sea jellyfish are over 95% water and have survived for over 500 million years."
        />

        {/* Mission Complete Section */}
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f0f23)',
          position: 'relative',
          padding: '60px 40px',
          borderTop: '3px solid rgba(74, 144, 226, 0.3)'
        }}>
          {/* Subtle background pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(99, 184, 255, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(30, 60, 120, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }} />
          
          <div style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #4A90E2, #63B8FF, #87CEEB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              textShadow: '0 4px 20px rgba(74, 144, 226, 0.3)',
              letterSpacing: '2px'
            }}>
              MISSION COMPLETE
            </div>
            
            <div style={{
              width: '200px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #4A90E2, transparent)',
              margin: '0 auto 3rem',
              borderRadius: '2px'
            }} />
            
            <p style={{
              fontSize: '1.4rem',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.8',
              fontWeight: 300,
              letterSpacing: '0.5px'
            }}>
              You have successfully completed the ultimate deep ocean exploration journey.
            </p>
            
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '3rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.6',
              fontWeight: 300
            }}>
              From the sunlit surface waters to the crushing depths of the Hadal Zone at 11,000 meters — 
              you've witnessed the full spectrum of Earth's most mysterious frontier.
            </p>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #4A90E2, #63B8FF)',
                border: 'none',
                borderRadius: '30px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(74, 144, 226, 0.4)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(74, 144, 226, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.4)';
              }}
            >
              ↑ Return to Surface
            </button>
          </div>
        </div>
      </div>

      {/* Add keyframe animations via style tag */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        
        @keyframes wave-0 {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }
        
        @keyframes wave-1 {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-8px); }
        }
      `}</style>
    </div>
  );
};

export default OceanScroll;