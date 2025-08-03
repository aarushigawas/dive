import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const horrorStories = [
  {
    id: 'yonaguni',
    title: "The Yonaguni Monument",
    mystery: "The Yonaguni Monument",
    whatHappened: "Is it a lost city or just natural rock erosion?",
    story: `Beneath the crystalline waters off Japan's coast lies a structure that defies explanation. Massive stone blocks, perfectly carved steps, and geometric walls rise from the ocean floor like the remnants of a civilization that time forgot.

Local divers speak in hushed tones of the monument's eerie perfection. The angles are too precise, the formations too deliberate to be mere tricks of erosion. Ancient tool marks scar the stone surfaces, and underwater photographers report their equipment malfunctioning when they venture too close to certain sections.

Some believe it's the remains of a 12,000-year-old city, swallowed by rising seas when the world was young. Others whisper of something more sinister—a temple to forgotten gods, whose influence still seeps through the water, calling to those who dare to explore its shadowed corridors beneath the waves.`,
    background: '/for_mystery.jpg',
    leftImage: '/yonagumi2.jpg',
    rightImage: '/yonaguni.jpg',
    primaryColor: '#0a1a0a',
    accentColor: '#1a3d1a',
    glowColor: '#00ff7f'
  },
  {
    id: 'titan-sub',
    title: "The Titan's Final Descent",
    mystery: "OceanGate Titan Sub Disaster",
    whatHappened: "How did the high-tech sub implode at 3800m?",
    story: `In June 2023, the submersible Titan began its descent to the Titanic's grave, 3,800 meters below the surface. Five souls aboard, seeking to witness history's most famous maritime tragedy. They would become part of it instead.

At crushing depths where the pressure could implode steel in milliseconds, something went catastrophically wrong. The sub simply vanished from sonar, its final transmission lost to the abyss. When debris was found, investigators discovered the truth—the vessel had been compressed into fragments no larger than pieces of a shattered dream.

But the ocean keeps its secrets. Rescue teams reported strange sonar readings near the wreck site—sounds that resembled human voices calling from impossible depths. Some say the Titan's crew joined the eternal vigil of those who came before, forever trapped in the darkness where the pressure crushes not just metal, but hope itself.`,
    background: '/for_mystery.jpg',
    leftImage: '/titan.jpg',
    rightImage: '/titan2.jpg',
    primaryColor: '#1a1a2e',
    accentColor: '#16213e',
    glowColor: '#ff4757'
  },
  {
    id: 'mermaids',
    title: "Sirens of the Deep",
    mystery: "Mermaids and Sirens",
    whatHappened: "Could sailor myths be based on real creatures?",
    story: `They are not the beautiful creatures of fairy tales. Real mermaids are something far more ancient and terrifying—evolutionary nightmares that evolved in trenches where light has never touched and sanity goes to die.

Sailors throughout history have reported encounters with these beings: pale, elongated forms with too many joints, eyes like black pearls that reflect no light, and voices that bypass the ears and speak directly to the soul. Their songs don't lure men to love—they lure them to madness.

Modern sonar has detected their calls in frequencies that should be impossible for any living creature to produce. Marine biologists who study these recordings often quit their careers, claiming the sounds follow them home. They speak of dreams where they swim deeper and deeper, following a song that promises to reveal the ocean's greatest secret—if only they'll stop fighting the urge to breathe water instead of air.`,
    background: '/for_mystery.jpg',
    leftImage: '/mermaid.jpg',
    rightImage: '/mermaids-bg.jpg',
    primaryColor: '#2c1810',
    accentColor: '#4a2c17',
    glowColor: '#20b2aa'
  },
  {
    id: 'bermuda-triangle',
    title: "The Triangle's Embrace",
    mystery: "The Bermuda Triangle",
    whatHappened: "Why do planes and ships vanish here?",
    story: `Flight 19 was supposed to be a routine training mission. Five torpedo bombers disappeared without a trace, their final radio transmission speaking of waters that "don't look right" and compasses spinning wildly. But they didn't crash—they were taken.

The Triangle is not a place but a doorway. Beneath its cursed waters lies a city of impossible geometry, where time flows backward and the laws of physics bend to the will of ancient entities. Ships and planes don't sink or crash here—they're collected, added to a growing fleet of the lost.

The crews remain conscious, trapped in their vessels, sailing endless patrols through dimensions that shouldn't exist. On calm nights, their ghostly transmissions still reach our radios: desperate pleas for help from coordinates that place them simultaneously in the past, present, and future. The Triangle feeds on confusion, on the terror of being lost between worlds, forever searching for a way home that leads only deeper into the maze.`,
    background: '/for_mystery.jpg',
    leftImage: '/bermuda.jpg',
    rightImage: '/bermuda-bg.jpg',
    primaryColor: '#2a1810',
    accentColor: '#8b4513',
    glowColor: '#ff8c00'
  },
  {
    id: 'atlantis',
    title: "Atlantis Rising",
    mystery: "Atlantis – The Lost City",
    whatHappened: "Did Plato describe a real place that sank?",
    story: `The lost city was never destroyed—it was hidden. Deep beneath the waves, Atlantis continues to thrive, its inhabitants evolved into something that no longer resembles humanity. They have been watching us, learning our weaknesses, preparing for their return.

Recent seismic activity isn't natural. It's the sound of massive structures breaking free from the ocean floor. Ancient spires pierce the darkness, and bioluminescent lights begin to glow in patterns too complex for human comprehension. The Atlanteans are awakening from their long slumber.

Coastal towns report strange dreams shared by their entire populations: visions of rising waters and cities of living coral. Children draw pictures of beings with too many limbs and eyes like black pearls. The ocean calls to them in languages older than recorded history, promising a new world beneath the waves where the worthy will breathe water and the rest will simply drown.`,
    background: '/for_mystery.jpg',
    leftImage: '/atlantic.jpg',
    rightImage: '/atlantis-bg.jpg',
    primaryColor: '#1a3b3b',
    accentColor: '#2d5f5f',
    glowColor: '#40e0d0'
  },
  {
    id: 'titanic',
    title: "The Titanic's Eternal Voyage",
    mystery: "The Titanic",
    whatHappened: "Was it just an iceberg, or more?",
    story: `The cold Atlantic waters still echo with the screams of 1,500 souls, but the ship never truly sank. It exists now in a realm between worlds, sailing endless routes through dimensions of ice and despair, its ghostly passengers forever reliving their final moments.

Divers who venture too deep report seeing the grand staircase illuminated by phantom lights, the orchestra still playing in the ballroom where dancers waltz with partners made of mist and memory. The ship's manifest shows passengers who were never aboard, and crew members who died decades before the maiden voyage.

But the most terrifying truth is that the Titanic is still taking passengers. Modern vessels that pass over the wreck site sometimes report seeing the ship's lights rising from the depths, offering rescue to those lost at sea. Those who accept the invitation join the eternal cruise, forever trapped in a luxury liner that sails not through water, but through the spaces between nightmares.`,
    background: '/for_mystery.jpg',
    leftImage: '/titanic.jpg',
    rightImage: '/titanic-bg.jpg',
    primaryColor: '#1a4b5c',
    accentColor: '#2d7a8a',
    glowColor: '#4fb3d9'
  },
  {
    id: 'flying-dutchman',
    title: "The Flying Dutchman's Curse",
    mystery: "The Flying Dutchman",
    whatHappened: "Why do sailors still report ghost ship sightings?",
    story: `Captain Hendrick van der Decken made a pact he didn't understand. Desperate to round the Cape of Good Hope in a terrible storm, he swore to sail until the end of time if necessary. The sea took him at his word, and his ship has been cutting through the waves for over three centuries.

The Flying Dutchman appears as an omen of doom, its spectral sails billowing with winds from another world. Those who see it report that the ship seems to sail through the water rather than on it, leaving no wake, making no sound except for the endless creaking of timber that should have rotted to nothing centuries ago.

But the curse is spreading. Modern ships that encounter the Dutchman find their navigation systems failing, their compasses pointing toward magnetic north that doesn't exist. Crew members begin to age rapidly, their hair turning white as they realize they're becoming part of the ghost ship's eternal voyage. The only escape is to find another soul willing to take the captain's place—a bargain that ensures the curse will never truly end.`,
    background: '/for_mystery.jpg',
    leftImage: '/dutchman.jpg',
    rightImage: '/dutchman-bg.jpg',
    primaryColor: '#1a1a1a',
    accentColor: '#2d2d2d',
    glowColor: '#32cd32'
  },
  {
    id: 'deepwater-horizon',
    title: "The Black Tide's Legacy",
    mystery: "Deepwater Horizon Oil Spill",
    whatHappened: "What caused the explosion and oil disaster?",
    story: `April 20, 2010: The Deepwater Horizon rig exploded in the Gulf of Mexico, spilling millions of barrels of oil into the pristine waters. But the official story only tells half the truth. They never mentioned what came up with the oil from the deepest drilling site in history.

The oil wasn't just petroleum—it was something older, darker, that had been sleeping in geological layers predating human civilization. Marine life in the area began to change, evolving at impossible speeds into forms that defied biological classification. Fish with too many eyes, crabs with shells that pulsed like hearts, and things that might once have been dolphins but now sang in harmonics that drove listeners to madness.

The cleanup crews reported strange phenomena: oil that moved against currents, forming patterns that resembled ancient script. Beaches where the tar seemed to whisper in languages that predated human speech. And in the deepest parts of the spill zone, sonar detected structures rising from the ocean floor—structures that the oil had been feeding, nurturing, awakening from a slumber that should have lasted until the end of the world.`,
    background: '/for_mystery.jpg',
    leftImage: '/deepwater_oil.jpg',
    rightImage: '/deepwater2.jpg',
    primaryColor: '#0f0f0f',
    accentColor: '#1a1a0a',
    glowColor: '#ffd700'
  }
];

const StoryDetailPage = ({ story, onBack }) => {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    setTimeout(() => setShowContent(true), 1000);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  const mysteryBoxes = [
    {
      title: "THE MYSTERY",
      content: story.mystery,
      image: story.leftImage,
      isLeft: true
    },
    {
      title: "WHAT REALLY HAPPENED?",
      content: story.whatHappened,
      image: story.rightImage,
      isLeft: false
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(/for_mystery.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed', // Fixed bg causes issues on mobile
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${story.glowColor}` }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        style={{
          position: 'fixed',
          top: isMobile ? '15px' : '30px',
          left: isMobile ? '15px' : '30px',
          background: `rgba(0,0,0,0.8)`,
          color: story.glowColor,
          border: `2px solid ${story.glowColor}`,
          padding: isMobile ? '8px 16px' : '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: isMobile ? '0.9rem' : '1rem',
          zIndex: 100,
          fontFamily: 'Georgia, serif'
        }}
      >
        ← Return to the Depths
      </motion.button>

     
      <section style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ 
            textAlign: 'center', 
            maxWidth: isMobile ? '90%' : '800px', 
            padding: isMobile ? '0 20px' : '0 50px' 
          }}
        >
          <motion.h1
            style={{
              fontSize: isMobile ? 'clamp(2rem, 8vw, 4rem)' : 'clamp(3rem, 8vw, 6rem)',
              color: story.glowColor,
              textShadow: `0 0 30px ${story.glowColor}`,
              marginBottom: '30px',
              fontFamily: 'Times New Roman, serif',
              letterSpacing: '0.05em'
            }}
          >
            {story.title}
          </motion.h1>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
              width: '100px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${story.glowColor}, transparent)`,
              margin: '0 auto',
              boxShadow: `0 0 10px ${story.glowColor}`
            }}
          />
        </motion.div>
      </section>

      
      <section style={{
        minHeight: '100vh',
        padding: isMobile ? '50px 20px' : '100px 50px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: showContent ? 0 : -50, opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              color: story.glowColor,
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '60px',
              textShadow: `0 0 20px ${story.glowColor}`
            }}
          >
            Unraveling the Mystery
          </motion.h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '30px' : '40px',
            marginBottom: isMobile ? '60px' : '80px'
          }}>
            {mysteryBoxes.map((box, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: showContent ? 0 : 100, opacity: showContent ? 1 : 0 }}
                transition={{ delay: 0.3 * index, duration: 0.8 }}
                whileHover={!isMobile ? {
                  scale: 1.05,
                  y: -10,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${story.glowColor}30`
                } : {}}
                style={{
                  background: `linear-gradient(135deg, ${story.primaryColor}dd, ${story.accentColor}aa)`,
                  borderRadius: '15px',
                  border: `2px solid ${story.glowColor}40`,
                  padding: isMobile ? '30px 20px' : '40px 30px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${box.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.3,
                  zIndex: 0
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.3rem' : '1.5rem',
                    color: story.glowColor,
                    marginBottom: '20px',
                    textShadow: `0 0 10px ${story.glowColor}`,
                    fontWeight: 'bold'
                  }}>
                    {box.title}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    color: '#e0e0e0',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}>
                    {box.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {mysteryBoxes.slice(0, 2).map((box, index) => (
        <section key={index} style={{
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '60px 20px' : '100px 50px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center'
          }}>
            
            <motion.div
              initial={{ x: isMobile ? 0 : (box.isLeft ? -100 : 100), opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{
                order: isMobile ? 1 : (box.isLeft ? 1 : 2),
                background: `linear-gradient(135deg, ${story.primaryColor}aa, ${story.accentColor}77)`,
                padding: isMobile ? '30px 20px' : '50px',
                borderRadius: '20px',
                border: `1px solid ${story.glowColor}33`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                color: story.glowColor,
                marginBottom: '20px',
                textShadow: `0 0 15px ${story.glowColor}`
              }}>
                {box.title}
              </h3>
              
              <p style={{
                fontSize: isMobile ? '1.1rem' : '1.4rem',
                lineHeight: '1.8',
                color: '#e0e0e0',
                marginBottom: '30px'
              }}>
                {box.content}
              </p>
              
              
              <div style={{
                borderTop: `1px solid ${story.glowColor}30`,
                paddingTop: '20px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: '#ccc',
                fontStyle: 'italic'
              }}>
                {index === 0 
                  ? "Witnesses report inexplicable phenomena that defy conventional explanation..."
                  : "Scientists struggle to provide answers that satisfy the mounting evidence..."
                }
              </div>
            </motion.div>

           
            <motion.div
              initial={{ x: isMobile ? 0 : (box.isLeft ? 100 : -100), opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                order: isMobile ? 2 : (box.isLeft ? 2 : 1),
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                height: isMobile ? '250px' : '400px',
                boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${story.glowColor}20`
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${box.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.8) contrast(1.1)'
              }} />
              
              
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at center, transparent 0%, ${story.glowColor}10 100%)`,
                mixBlendMode: 'overlay'
              }} />
            </motion.div>
          </div>
        </section>
      ))}

      
      <section style={{
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '60px 20px' : '100px 50px',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'center'
        }}>
          
          <motion.div
            initial={{ x: isMobile ? 0 : -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              background: `linear-gradient(135deg, ${story.primaryColor}aa, ${story.accentColor}77)`,
              padding: isMobile ? '30px 20px' : '50px',
              borderRadius: '20px',
              border: `1px solid ${story.glowColor}33`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              color: story.glowColor,
              marginBottom: '30px',
              textShadow: `0 0 15px ${story.glowColor}`
            }}>
              The Full Story
            </h2>
            
            <div style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              lineHeight: '1.8',
              color: '#e0e0e0',
              whiteSpace: 'pre-line'
            }}>
              {showContent && <TypewriterText text={story.story} speed={20} />}
            </div>
          </motion.div>

         
          <motion.div
            initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{ textAlign: 'center' }}
          >
           
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
              gap: isMobile ? '15px' : '20px',
              marginTop: '40px'
            }}>
              {[
                { label: 'Incidents', value: Math.floor(Math.random() * 100) + 50 },
                { label: 'Witnesses', value: Math.floor(Math.random() * 500) + 100 },
                { label: 'Years Active', value: Math.floor(Math.random() * 200) + 50 },
                { label: 'Unexplained', value: '100%' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                  style={{
                    background: `linear-gradient(135deg, ${story.primaryColor}, ${story.accentColor})`,
                    padding: isMobile ? '15px' : '20px',
                    borderRadius: '10px',
                    border: `1px solid ${story.glowColor}33`,
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: 'bold',
                    color: story.glowColor,
                    textShadow: `0 0 10px ${story.glowColor}`
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                    color: '#ccc',
                    marginTop: '5px'
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

     
      {[...Array(isMobile ? 8 : 15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: story.glowColor,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 6px ${story.glowColor}`
          }}
          animate={{
            y: [-30, -150],
            opacity: [0, 1, 0],
            scale: [1, 2, 1]
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8
          }}
        />
      ))}
    </div>
  );
};


const TypewriterText = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return <span>{displayedText}</span>;
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentStory, setCurrentStory] = useState(null);
  const [showStory, setShowStory] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleStorySelect = (storyId) => {
    const selectedStory = horrorStories.find(s => s.id === storyId);
    setCurrentStory(selectedStory);
    setCurrentView('story');
    setShowStory(false);
    
    
    window.scrollTo(0, 0);
    
    
    setTimeout(() => setShowStory(true), 1000);
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentStory(null);
    setShowStory(false);
    window.scrollTo(0, 0);
  };
  
  const hotspots = [
    { id: 'yonaguni-spot', x: 85, y: 25, story: 'yonaguni', label: 'Yonaguni' },
    { id: 'titan-sub-spot', x: 25, y: 40, story: 'titan-sub', label: 'Titan Sub' },
    { id: 'mermaids-spot', x: 60, y: 30, story: 'mermaids', label: 'Sirens' },
    { id: 'bermuda-spot', x: 70, y: 50, story: 'bermuda-triangle', label: 'Bermuda Triangle' },
    { id: 'atlantis-spot', x: 45, y: 65, story: 'atlantis', label: 'Atlantis' },
    { id: 'titanic-spot', x: 30, y: 25, story: 'titanic', label: 'Titanic' },
    { id: 'dutchman-spot', x: 80, y: 75, story: 'flying-dutchman', label: 'Flying Dutchman' },
    { id: 'deepwater-spot', x: 55, y: 80, story: 'deepwater-horizon', label: 'Black Tide' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      color: '#fff',
      overflow: currentView === 'story' ? 'auto' : 'auto',
      background: '#000',
      
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/for_mystery.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed',minHeight: '100vh'
    }}>
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
           
            <section style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 6rem)' : 'clamp(4rem, 10vw, 10rem)',
                  fontFamily: 'Times New Roman, serif',
                  textAlign: 'center',
                  textShadow: `
                    0 0 20px #4a90e2,
                    0 0 40px #4a90e2,
                    0 0 60px #4a90e2
                  `,
                  animation: 'flicker 4s infinite alternate',
                  letterSpacing: '0.1em',
                  padding: isMobile ? '0 20px' : '0'
                }}
              >
                Ocean Mysteries
              </motion.h1>
              
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '30px' : '50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'bounce 2s infinite'
                }}
              >
                <div style={{
                  width: isMobile ? '25px' : '30px',
                  height: isMobile ? '25px' : '30px',
                  borderRight: '3px solid #4a90e2',
                  borderBottom: '3px solid #4a90e2',
                  transform: 'rotate(45deg)'
                }} />
              </motion.div>
            </section>

            
            <section style={{
              height: isMobile ? 'auto' : '100vh',
              minHeight: isMobile ? '100vh' : 'auto',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: isMobile ? '60px 0' : '0'
            }}>
              <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '0 20px' : '0 50px',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '40px' : '50px',
                alignItems: 'center'
              }}>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  style={{ 
                    textAlign: 'center',
                    order: isMobile ? 2 : 1
                  }}
                >
                  <motion.img
                    variants={itemVariants}
                    src="/boat.png"
                    alt="Abandoned Vessel"
                    style={{
                      width: isMobile ? '100%' : '120%',
                      maxWidth: isMobile ? '400px' : '700px',
                      height: 'auto',
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                    }}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  style={{ 
                    padding: isMobile ? '0' : '20px',
                    order: isMobile ? 1 : 2
                  }}
                >
                  <motion.h2
                    variants={itemVariants}
                    style={{
                      fontSize: isMobile ? '2.5rem' : '3.5rem',
                      color: '#4a90e2',
                      textShadow: '0 0 20px #4a90e2',
                      marginBottom: '30px',
                      fontFamily: 'Times New Roman, serif',
                      textAlign: isMobile ? 'center' : 'left'
                    }}
                  >
                    The Mysteries That Remain
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    style={{
                      fontSize: isMobile ? '1.2rem' : '1.4rem',
                      lineHeight: '1.8',
                      color: '#e0e0e0',
                      marginBottom: '20px',
                      textAlign: isMobile ? 'center' : 'left'
                    }}
                  >
                    Deep beneath the ocean's surface lies a vessel shrouded in darkness and secrets. 
                    This abandoned ship holds the key to mysteries that have puzzled mankind for centuries.
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    style={{
                      fontSize: isMobile ? '1.2rem' : '1.4rem',
                      lineHeight: '1.8',
                      color: '#e0e0e0',
                      fontStyle: 'italic',
                      textAlign: isMobile ? 'center' : 'left'
                    }}
                  >
                    Each section of this ghostly vessel whispers tales of the unknown. Are you brave 
                    enough to uncover what lies within?
                  </motion.p>
                </motion.div>
              </div>
            </section>

            
            <section style={{
              height: isMobile ? 'auto' : '100vh',
              minHeight: isMobile ? '100vh' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: isMobile ? '60px 0' : '0'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                style={{
                  position: 'relative',
                  width: isMobile ? '100%' : '400%',
                  maxWidth: isMobile ? '100%' : '3000px',
                  textAlign: 'center',
                  padding: isMobile ? '20px' : '50px'
                }}
              >
                <motion.h2
                  initial={{ y: -50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    color: '#4a90e2',
                    textShadow: '0 0 15px #4a90e2',
                    marginBottom: '30px'
                  }}
                >
                  Explore the Vessel
                </motion.h2>
                
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <motion.img
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    src="/boat.png"
                    alt="Interactive Vessel"
                    style={{
                      width: '100%',
                      maxWidth: isMobile ? '100%' : '900px',
                      height: 'auto',
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))',
                      transform: isMobile ? 'scale(1)' : 'scale(1.3)',
                    }}
                  />
                  
                  
                  {hotspots.map((hotspot, index) => (
                    <motion.div
                      key={hotspot.id}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                      style={{
                        position: 'absolute',
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: isMobile ? '30px' : '40px',
                        height: isMobile ? '30px' : '40px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #4a90e2 0%, rgba(74, 144, 226, 0.3) 70%)',
                        cursor: 'pointer',
                        zIndex: 10,
                        animation: 'pulse 2s infinite',
                        boxShadow: '0 0 20px #4a90e2'
                      }}
                      whileHover={{ 
                        scale: isMobile ? 1.3 : 1.5,
                        background: 'radial-gradient(circle, #ff6b6b 0%, rgba(255, 107, 107, 0.3) 70%)',
                        boxShadow: '0 0 30px #ff6b6b'
                      }}
                      onHoverStart={() => !isMobile && setHoveredHotspot(hotspot)}
                      onHoverEnd={() => !isMobile && setHoveredHotspot(null)}
                      onClick={() => {
                        if (isMobile) {
                          
                          setHoveredHotspot(hotspot);
                          setTimeout(() => {
                            setHoveredHotspot(null);
                            handleStorySelect(hotspot.story);
                          }, 1000);
                        } else {
                          handleStorySelect(hotspot.story);
                        }
                      }}
                    />
                  ))}
                  
                  
                  <AnimatePresence>
                    {hoveredHotspot && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        style={{
                          position: 'absolute',
                          left: `${hoveredHotspot.x}%`,
                          top: `${hoveredHotspot.y - 15}%`,
                          transform: 'translate(-50%, -100%)',
                          background: 'rgba(0,0,0,0.9)',
                          color: '#fff',
                          padding: isMobile ? '6px 12px' : '8px 16px',
                          borderRadius: '5px',
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          fontWeight: 'bold',
                          border: '2px solid #4a90e2',
                          boxShadow: '0 0 15px rgba(74, 144, 226, 0.5)',
                          zIndex: 20,
                          pointerEvents: 'none'
                        }}
                      >
                        {hoveredHotspot.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  style={{
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    color: '#bbb',
                    fontStyle: 'italic',
                    marginTop: '30px',
                    zIndex: 10,        
                    position: 'relative' 
                  }}
                >
                  {isMobile ? 'Tap the glowing points to reveal their secrets...' : 'Hover over the glowing points to reveal their secrets...'}
                </motion.p>
              </motion.div>
              
              
              {[...Array(isMobile ? 6 : 10)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: 'rgba(74, 144, 226, 0.6)',
                    borderRadius: '50%',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -100],
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </section>
          </motion.div>
        ) : (
          
          <motion.div
            key="story"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <StoryDetailPage 
              story={currentStory} 
              onBack={handleBackToHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.8; }
          50% { opacity: 0.9; }
          75% { opacity: 0.7; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-15px); }
          60% { transform: translateX(-50%) translateY(-8px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        /* Touch improvements for mobile */
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          button {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          /* Improve touch targets */
          [style*="cursor: pointer"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Responsive text adjustments */
        @media (max-width: 480px) {
          h1 {
            font-size: clamp(2rem, 10vw, 4rem) !important;
          }
          
          h2 {
            font-size: clamp(1.5rem, 8vw, 2.5rem) !important;
          }
          
          p {
            font-size: clamp(1rem, 4vw, 1.2rem) !important;
          }
        }
        
        /* Prevent horizontal scroll */
        .container {
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        /* Fix for mobile viewport units */
        @supports (-webkit-touch-callout: none) {
          .full-height {
            height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  );
};

export default App;