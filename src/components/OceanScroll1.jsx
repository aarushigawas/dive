import React, { useEffect, useState } from "react";
import "./OceanScroll1.css";
import ScrollAnimal from "./ScrollAnimal";

const oceanZones = [
  { name: "Sunlight Zone", start: 0, end: 200, hasLight: true },
  { name: "Twilight Zone", start: 200, end: 1000, hasLight: true },
  { name: "Midnight Zone", start: 1000, end: 4000, hasLight: false },
  { name: "Abyss Zone", start: 4000, end: 6000, hasLight: false },
  { name: "Upper Hadal", start: 6000, end: 8000, hasLight: false },
  { name: "Deep Hadal", start: 8000, end: 9000, hasLight: false },
  { name: "Trench Floor", start: 9000, end: 11000, hasLight: false },
];

const OceanScroll1 = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileAdjust = (desktop, mobile) => {
    return isMobile ? mobile : desktop;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    const handleResize = () => setVH();
    const handleOrientationChange = () => {
      setTimeout(setVH, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    let lastTouchEnd = 0;
    const handleTouchEnd = (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', handleTouchEnd, false);

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('mobile-device');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('touchend', handleTouchEnd, false);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const headers = document.querySelectorAll(".zone-name, .depth-marker, .intro-message");
    headers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function interpolateColor(color1, color2, factor) {
    const c1 = color1.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [0, 0, 0];
    const c2 = color2.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [0, 0, 0];
    const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  }

  const rawRatio = scrollY / scrollHeight;
  const scrollRatio = Math.min(Math.pow(rawRatio, 1.8), 1);
  
  const topColor = interpolateColor("#4A90E2", "#0B1426", scrollRatio * 0.7);
  const midColor = interpolateColor("#2E86AB", "#1B4965", scrollRatio);
  const bottomColor = interpolateColor("#1B4965", "#000000", scrollRatio);
  const dynamicBackground = `linear-gradient(to bottom, ${topColor} 0%, ${midColor} 40%, ${bottomColor} 100%)`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const headers = document.querySelectorAll(".zone-name, .depth-marker, .intro-message");
    headers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const baseOffset = 130;
  const boatDepthPx = scrollY + baseOffset;
  
  const time = scrollY / 100;
  const bobbing = Math.sin(time * 2) * 8 + Math.cos(time * 1.5) * 4;
  const sway = Math.sin(time * 0.8) * 15;
  const tilt = Math.sin(time * 1.2) * 3;
  
  const currentDepth = scrollY * 10;
  const isInAphoticZone = currentDepth > 1000;
  
  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = Math.min(Math.floor(scrollY / 80), isMobile ? 15 : 25);
    
    for (let i = 0; i < bubbleCount; i++) {
      const delay = i * 0.4;
      const size = isMobile ? Math.random() * 15 + 5 : Math.random() * 25 + 8;
      const left = Math.random() * 90 + 5;
      const animationDuration = Math.random() * 4 + 5;
      const opacity = Math.random() * 0.4 + 0.1;
      
      bubbles.push(
        <div
          key={i}
          className="bubble transparent-bubble"
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

  const generateParticles = () => {
    const particles = [];
    const particleCount = Math.min(Math.floor(scrollRatio * (isMobile ? 15 : 30)), isMobile ? 15 : 30);
    
    for (let i = 0; i < particleCount; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 15 + 20;
      
      particles.push(
        <div
          key={i}
          className="floating-particle"
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
    <div
      className="ocean-scroll-container"
      style={{ background: dynamicBackground }}
    >
      <button
        onClick={() => window.location.href = '/DeepDiving'}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          padding: isMobile ? '8px 12px' : '12px 20px',
          color: '#ffffff',
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(0px)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
      >
        <span style={{ fontSize: isMobile ? '14px' : '16px' }}>←</span>
        Back to Main
      </button>

      <div className="bubbles-container">
        {generateBubbles()}
      </div>
      
      <div className="particles-container">
        {generateParticles()}
      </div>
      
      {isInAphoticZone && (
        <div 
          className="flashlight-effect"
          style={{
            top: `${scrollY + 50}px`,
          }}
        />
      )}
      
      {!isInAphoticZone && (
        <div className="caustic-lights">
          <div className="caustic-pattern caustic-1" />
          <div className="caustic-pattern caustic-2" />
          <div className="caustic-pattern caustic-3" />
        </div>
      )}

      <div className="intro-dive-area">
        <div className="intro-messages">
          <div className="intro-message message-1">
            <h2>Welcome to the Ocean Depths</h2>
            <p>Your underwater journey begins now...</p>
          </div>
          
          <div className="intro-message message-2">
            <h3>Prepare for Descent</h3>
            <p>Each zone holds unique mysteries and creatures</p>
          </div>
          
          <div className="intro-message message-3">
            <h3>Currently: Surface Level</h3>
            <p>Scroll down to dive deeper into the unknown</p>
          </div>
        </div>
      </div>

      <div className="diver-container">
        <img
          src="/diver.png"
          alt="Diver"
          className="scrolling-boat enhanced-diver animated-diver"
          style={{
            position: "absolute",
            top: `${boatDepthPx + bobbing}px`,
            left: `${mobileAdjust(20, 10) + sway}px`,
            width: `${mobileAdjust(350, 250)}px`,
            transform: `rotate(${60 + tilt}deg)`,
            filter: isInAphoticZone ? 'brightness(0.7) contrast(1.2)' : 'brightness(1)',
          }}
        />
        
        <div 
          className="diver-bubbles"
          style={{
            position: "absolute",
            top: `${boatDepthPx + bobbing + 40}px`,
            left: `${mobileAdjust(50, 30) + sway}px`,
          }}
        >
          <div className="diver-bubble diver-bubble-1"></div>
          <div className="diver-bubble diver-bubble-2"></div>
          <div className="diver-bubble diver-bubble-3"></div>
        </div>
      </div>

      {oceanZones.map((zone, index) => (
        <div key={index} className={`ocean-zone ${!zone.hasLight ? 'aphotic-zone' : ''}`}>
          <div className="zone-header">
            <div className="line-title">
              <div className="zone-line"></div>
              <h2 className="zone-name">
                <span className="font-cursive gradient-text">
                  {zone.name.split(" ")[0]}
                </span>{" "}
                <span className="font-sans text-fade">
                  {zone.name.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <div className="zone-line"></div>
            </div>
          </div>

          <div className="depth-markers">
            {Array.from({
              length: Math.ceil((Math.min(zone.end, 9000) - zone.start) / 100) + 1,
            }).map((_, i) => {
              const depth = zone.start + i * 100;
              if (depth > 9000) return null;
              return (
                <div key={i} className="depth-marker">
                  <span>{depth}m</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <ScrollAnimal
        image="/parrotfish.png"
        top={mobileAdjust(1250, 950)}
        left={mobileAdjust(1130, 200)}
        alt="Parrotfish"
        size={mobileAdjust(160, 120)}
        info={`Parrotfish\nParrotfish sleep in a bubble of their own mucus to protect themselves from predators.\n\nThey poop sand — their beak-like teeth crush coral, and the leftovers become the white sand on tropical beaches.`}
      />

      <ScrollAnimal
        image="/man_o_war.png"
        top={mobileAdjust(1165, 880)}
        left={mobileAdjust(970, 150)}
        alt="Portuguese Man o' War"
        size={mobileAdjust(220, 160)}
        info={`Portuguese Man o' War\nIt's made of four separate animals working together — one acts as the float, one stings, one digests, and one reproduces.\n\nIts long blue tentacles can stretch over 30 meters, delivering painful stings even after it's dead.`}
      />

      <ScrollAnimal
        image="/dolphin.png"
        top={mobileAdjust(1130, 850)}
        left={mobileAdjust(730, 50)}
        size={mobileAdjust(250, 180)}
        alt="BottleNose Dolphin"
        audio="/dolphin_noise.mp3"
        info={`BottleNose Dolphin\nBottlenose dolphins are highly intelligent marine mammals known for their complex social behavior, echolocation, and playful nature. They can swim up to 35 km/h and live in pods.\n\nBottlenose dolphins call each other by unique name-like whistles.`}
      />

      <ScrollAnimal
        image="/seal.png"
        top={mobileAdjust(1180, 890)}
        left={mobileAdjust(380, 250)}
        size={mobileAdjust(170, 130)}
        alt="Seal"
        audio="/seal.mp3"
        info={`Seal\nSeals are semi-aquatic marine mammals with streamlined bodies and flippers.\n\nThey are agile swimmers and use blubber for warmth in cold waters.`}
      />

      <ScrollAnimal
        image="/stingray.png"
        top={mobileAdjust(1050, 790)}
        left={mobileAdjust(1150, 100)}
        size={mobileAdjust(300, 200)}
        alt="Stingray"
        info={`Stingray\nStingrays are flat-bodied fish with venomous barbed tails used for defense.\n\nThey often bury themselves in sand to ambush prey.`}
      />

      <ScrollAnimal
        image="/cephalopods.png"
        top={mobileAdjust(1100, 830)}
        left={mobileAdjust(540, 180)}
        size={mobileAdjust(220, 160)}
        alt="Cephalopods"
        info={`Cephalopods\nCephalopods include octopuses, squids, and cuttlefish.\n\nThey are known for their ability to change color and display intricate patterns for camouflage and communication.`}
      />

      <ScrollAnimal
        image="/ribbon_eel.png"
        top={mobileAdjust(1280, 970)}
        left={mobileAdjust(520, 220)}
        size={mobileAdjust(180, 140)}
        alt="Ribbon Eel"
        info={`Ribbon Eel\nRibbon eels are colorful, snake-like fish known for their striking blue and yellow colors.\n\nThey live in sandy burrows and have a long, ribbon-like body.`}
      />

      <ScrollAnimal
        image="/leafy_sea_dragon.png"
        top={mobileAdjust(1300, 980)}
        left={mobileAdjust(260, 80)}
        size={mobileAdjust(200, 150)}
        alt="Leafy Sea Dragon"
        info={`Leafy Sea Dragon\nLeafy sea dragons resemble floating seaweed for camouflage.\n\nThey are closely related to seahorses and move slowly using small fins.`}
      />

      <ScrollAnimal
        image="/orca.png"
        top={mobileAdjust(1120, 840)}
        left={mobileAdjust(250, 50)}
        size={mobileAdjust(220, 160)}
        alt="Orca"
        audio="/whale.mp3"
        info={`Orca\nAlso known as killer whales, orcas are apex predators.\n\nThey live in pods and use sophisticated hunting techniques and vocal communication.`}
      />

      <ScrollAnimal
        image="/sea_turtle.png"
        top={mobileAdjust(1300, 980)}
        left={mobileAdjust(680, 150)}
        size={mobileAdjust(220, 160)}
        alt="Sea Turtle"
        info={`Sea Turtle\nSea turtles are ancient reptiles that live in oceans around the world.\n\nThey are known for long migrations and a hard shell for protection.`}
      />

      <ScrollAnimal
        image="/hermit_crab.png"
        top={mobileAdjust(1350, 1020)}
        left={mobileAdjust(1200, 250)}
        size={mobileAdjust(180, 140)}
        alt="Hermit Crab"
        info={`Hermit Crab\nHermit crabs are small crustaceans that protect their soft abdomens by living inside empty shells.\n\nThey switch shells as they grow and are known for their scavenging behavior.`}
      />

      <ScrollAnimal
        image="/diver_2nd.png"
        top={mobileAdjust(1600, 1200)}
        left={mobileAdjust(150, 30)}
        alt="Scuba Diver"
        size={mobileAdjust(300, 180)}
        info={`Scuba Diver\nWith an oxygen tank and pressure-resistant wetsuit, divers can reach reef walls, shipwrecks, and underwater caves.`}
      />

      <ScrollAnimal
        image="/oxygen_tank.png"
        top={mobileAdjust(1700, 1300)}
        left={mobileAdjust(550, 180)}
        alt="Oxygen Tank"
        size={mobileAdjust(200, 150)}
        info={`Oxygen Tank\nEssential diving equipment that allows divers to breathe underwater for extended periods.`}
      />

      <ScrollAnimal
        image="/Deepwater Octopus (e.g. Graneledone).png"
        top={mobileAdjust(1550, 1170)}
        left={mobileAdjust(700, 100)}
        size={mobileAdjust(230, 170)}
        alt="Deepwater Octopus"
        info={`Deepwater Octopus (e.g. Graneledone)\nThese deep-sea octopuses lack ink sacs and adapt to extreme cold and pressure in the deep ocean.`}
      />

      <ScrollAnimal
        image="/Flabby Whalefish.png"
        top={mobileAdjust(1560, 1180)}
        left={mobileAdjust(300, 200)}
        size={mobileAdjust(220, 160)}
        alt="Flabby Whalefish"
        info={`Flabby Whalefish\nKnown for their soft, gelatinous bodies, these fish live at extreme depths and undergo major changes during growth.`}
      />

      <ScrollAnimal
        image="/Chimaera (Ghost Shark).png"
        top={mobileAdjust(1640, 1240)}
        left={mobileAdjust(350, 80)}
        size={mobileAdjust(300, 220)}
        alt="Chimaera"
        info={`Chimaera (Ghost Shark)\nDeep-sea relatives of sharks with long tails and sensory organs on their snouts.`}
      />

      <ScrollAnimal
        image="/Cookiecutter Shark.png"
        top={mobileAdjust(1600, 1210)}
        left={mobileAdjust(950, 180)}
        size={mobileAdjust(220, 160)}
        alt="Cookiecutter Shark"
        info={`Cookiecutter Shark\nThese sharks remove round plugs of flesh from larger animals and glow to lure prey.`}
      />

      <ScrollAnimal
        image="/Zombie Worms (Osedax).png"
        top={mobileAdjust(1760, 1330)}
        left={mobileAdjust(750, 150)}
        size={mobileAdjust(240, 180)}
        alt="Zombie Worms"
        info={`Zombie Worms (Osedax)\nThese worms feed on the bones of dead whales and use symbiotic bacteria to digest fats.`}
      />

      <ScrollAnimal
        image="/Pelican Eel (Gulper Eel).png"
        top={mobileAdjust(1800, 1360)}
        left={mobileAdjust(220, 50)}
        size={mobileAdjust(350, 250)}
        alt="Pelican Eel"
        info={`Pelican Eel (Gulper Eel)\nThese eels have enormous mouths used to gulp prey whole, even larger than their body.`}
      />

      <ScrollAnimal
        image="/Comb Jellies.png"
        top={mobileAdjust(1850, 1400)}
        left={mobileAdjust(1100, 220)}
        size={mobileAdjust(190, 140)}
        alt="Comb Jellies"
        info={`Comb Jellies\nThese gelatinous animals use rows of cilia for swimming and often glow with bioluminescence.`}
      />

      <ScrollAnimal
        image="/Glass Squid.png"
        top={mobileAdjust(1900, 1440)}
        left={mobileAdjust(530, 120)}
        size={mobileAdjust(300, 220)}
        alt="Glass Squid"
        info={`Glass Squid\nTransparent deep-sea squid that use bioluminescence to avoid predators.`}
      />

      <ScrollAnimal
        image="/Stomiidae.png"
        top={mobileAdjust(2020, 1530)}
        left={mobileAdjust(390, 180)}
        size={mobileAdjust(250, 180)}
        alt="Stomiidae"
        info={`Stomiidae (Barbeled Dragonfish)\nPredators with fang-like teeth and light-producing organs to lure prey in the dark depths.`}
      />

      <ScrollAnimal
        image="/Viperfish.png"
        top={mobileAdjust(1930, 1460)}
        left={mobileAdjust(770, 80)}
        size={mobileAdjust(240, 180)}
        alt="Viperfish"
        info={`Viperfish\nOne of the fiercest deep-sea predators, with long fangs and a light organ to attract prey.`}
      />

      <ScrollAnimal
        image="/Bristlemouth.png"
        top={mobileAdjust(2050, 1550)}
        left={mobileAdjust(950, 200)}
        size={mobileAdjust(300, 220)}
        alt="Bristlemouth"
        info={`Bristlemouth\nPossibly the most abundant vertebrate on Earth. Small fish with light-producing organs and bristle-like teeth.`}
      />

      <ScrollAnimal
        image="/Lanternfish.png"
        top={mobileAdjust(2160, 1630)}
        left={mobileAdjust(650, 150)}
        size={mobileAdjust(220, 160)}
        alt="Lanternfish"
        info={`Lanternfish\nA key part of the deep-sea food chain, lanternfish use bioluminescent photophores to communicate and blend in.`}
      />

      <ScrollAnimal
        image="/Great_white_shark.png"
        top={mobileAdjust(1300, 980)}
        left={mobileAdjust(890, 180)}
        size={mobileAdjust(230, 170)}
        alt="Great White Shark"
        info={`Great White Shark\nOne of the largest predatory fish, known for powerful jaws and acute senses.`}
      />

      <ScrollAnimal
        image="/Yeti Crab.png"
        top={mobileAdjust(2400, 1810)}
        left={mobileAdjust(300, 80)}
        size={mobileAdjust(205, 150)}
        alt="Yeti Crab"
        info={`Yeti Crab\nA deep-sea crab with hairy claws that cultivate bacteria for food.`}
      />

      <ScrollAnimal
        image="/Barreleye.png"
        top={mobileAdjust(2440, 1840)}
        left={mobileAdjust(850, 200)}
        size={mobileAdjust(220, 160)}
        alt="Barreleye"
        info={`Barreleye\nTransparent-headed fish with upward-facing tubular eyes to spot prey in the dark.`}
      />

      <ScrollAnimal
        image="/Zombie Shrimp (Rimicaris).png"
        top={mobileAdjust(2480, 1870)}
        left={mobileAdjust(580, 120)}
        size={mobileAdjust(240, 180)}
        alt="Zombie Shrimp"
        info={`Zombie Shrimp (Rimicaris)\nFound near hydrothermal vents, they survive via symbiotic bacteria in their gills.`}
      />

      <ScrollAnimal
        image="/Deep-sea Hatchetfish.png"
        top={mobileAdjust(2600, 1960)}
        left={mobileAdjust(1100, 250)}
        size={mobileAdjust(220, 160)}
        alt="Hatchetfish"
        info={`Deep-sea Hatchetfish\nNamed for their hatchet shape, they use counter-illumination to avoid predators.`}
      />

      <ScrollAnimal
        image="/Rattail_fish.png"
        top={mobileAdjust(2610, 1970)}
        left={mobileAdjust(280, 50)}
        size={mobileAdjust(300, 220)}
        alt="Grenadier"
        info={`Grenadier (Rattail Fish)\nLong-tailed deep-sea fish with large heads and slow metabolism.`}
      />

      <ScrollAnimal
        image="/Benthocodon.png"
        top={mobileAdjust(2650, 2000)}
        left={mobileAdjust(790, 180)}
        size={mobileAdjust(270, 200)}
        alt="Benthoctodon"
        info={`Benthoctodon\nA genus of deep-sea comb jellies that use bioluminescence in dark waters.`}
      />

      <ScrollAnimal
        image="/Faceless Fish.png"
        top={mobileAdjust(2790, 2110)}
        left={mobileAdjust(560, 120)}
        size={mobileAdjust(250, 180)}
        alt="Faceless Fish"
        info={`Faceless Fish\nRare deep-sea fish with no visible eyes or mouth, adapted to pitch-black depths.`}
      />

      <ScrollAnimal
        image="/Dumbo Octopus.png"
        top={mobileAdjust(2820, 2130)}
        left={mobileAdjust(1000, 200)}
        size={mobileAdjust(300, 220)}
        alt="Dumbo Octopus"
        info={`Dumbo Octopus\nNamed for its ear-like fins, this soft-bodied octopus glides through deep-sea currents.`}
      />

      <ScrollAnimal
        image="/Giant Amphipod.png"
        top={mobileAdjust(2930, 2210)}
        left={mobileAdjust(300, 80)}
        size={mobileAdjust(220, 160)}
        alt="Giant Amphipod"
        info={`Giant Amphipod\nA crustacean scavenger found in the deepest parts of the ocean, over 9 cm long.`}
      />

      <ScrollAnimal
        image="/Tripod Fish.png"
        top={mobileAdjust(3000, 2260)}
        left={mobileAdjust(800, 180)}
        size={mobileAdjust(220, 160)}
        alt="Tripod Fish"
        info={`Tripod Fish\nUses elongated fins to 'stand' on the seafloor and face into currents to feed.`}
      />

      <ScrollAnimal
        image="/Black Swallower.png"
        top={mobileAdjust(3150, 2380)}
        left={mobileAdjust(550, 120)}
        size={mobileAdjust(300, 220)}
        alt="Black Swallower"
        info={`Black Swallower\nCan consume prey much larger than itself thanks to an expandable stomach.`}
      />

      <ScrollAnimal
        image="/Deep-sea Lizardfish.png"
        top={mobileAdjust(3200, 2420)}
        left={mobileAdjust(1050, 250)}
        size={mobileAdjust(330, 240)}
        alt="Deep-sea Lizardfish"
        info={`Deep-sea Lizardfish\nLong, predatory fish with needle-like teeth and light-producing organs.`}
      />

      <ScrollAnimal
        image="/Anglerfish (female).png"
        top={mobileAdjust(3300, 2490)}
        left={mobileAdjust(300, 80)}
        size={mobileAdjust(220, 160)}
        alt="Anglerfish"
        info={`Anglerfish (female)\nFamous for their glowing lure used to attract prey in the dark ocean.`}
      />

      <ScrollAnimal
        image="/Basket Star.png"
        top={mobileAdjust(3400, 2570)}
        left={mobileAdjust(700, 150)}
        size={mobileAdjust(300, 220)}
        alt="Basket Star"
        info={`Basket Star\nA deep-sea brittle star with arms that branch like coral and unfurl to trap drifting plankton.`}
      />

      <ScrollAnimal
        image="/Sea Spider.png"
        top={mobileAdjust(3550, 2680)}
        left={mobileAdjust(300, 80)}
        size={mobileAdjust(300, 220)}
        alt="Sea Spider"
        info={`Sea Spider\nNot a true spider, but a leggy marine crawler that thrives in crushing deep-sea pressure.`}
      />

      <ScrollAnimal
        image="/Blobfish.png"
        top={mobileAdjust(3620, 2730)}
        left={mobileAdjust(1050, 250)}
        size={mobileAdjust(270, 200)}
        alt="Blobfish"
        info={`Blobfish\nDeep-sea dweller with a gelatinous body, adapted to survive the immense pressure of the midnight zone.`}
      />

      <ScrollAnimal
        image="/Bigfin Squid.png"
        top={mobileAdjust(3700, 2790)}
        left={mobileAdjust(560, 120)}
        size={mobileAdjust(500, 350)}
        alt="Bigfin Squid"
        info={`Bigfin Squid\nElbowed limbs that stretch over 6 meters long, drifting like drapes through the deep sea.`}
      />

      <ScrollAnimal
        image="/Sperm Whale.png"
        top={mobileAdjust(4000, 3020)}
        left={mobileAdjust(300, 50)}
        size={mobileAdjust(420, 300)}
        alt="Sperm Whale"
        info={`Sperm Whale\nThe deepest-diving mammal, known to hunt giant squid at depths over 3000 meters.`}
      />

      <ScrollAnimal
        image="/Colossal Squid.png"
        top={mobileAdjust(4200, 3170)}
        left={mobileAdjust(900, 200)}
        size={mobileAdjust(350, 250)}
        alt="Colossal Squid"
        info={`Colossal Squid\nHeavier than the giant squid, with massive hooks on tentacles. Rarely seen, lives in Antarctic depths.`}
      />

      <ScrollAnimal
        image="/Giant Squid (Architeuthis dux).png"
        top={mobileAdjust(4350, 3280)}
        left={mobileAdjust(350, 80)}
        size={mobileAdjust(300, 220)}
        alt="Giant Squid"
        info={`Giant Squid (Architeuthis dux)\nA legend of the deep. Its enormous eyes spot prey in the blackness of the ocean.`}
      />

      <ScrollAnimal
        image="/Japanese Spider Crab.png"
        top={mobileAdjust(4600, 3470)}
        left={mobileAdjust(570, 150)}
        size={mobileAdjust(300, 220)}
        alt="Japanese Spider Crab"
        info={`Japanese Spider Crab\nWorld's largest arthropod by leg span — up to 3.7 meters. Creeps across deep seafloors like a monster.`}
      />

      <ScrollAnimal
        image="/Cusk Eel.png"
        top={mobileAdjust(4500, 3390)}
        left={mobileAdjust(900, 250)}
        size={mobileAdjust(280, 200)}
        alt="Cusk Eel"
        info={`Cusk Eel\nA long-bodied deep-sea fish that glides near the sea floor. Often found near vents, it looks both ancient and eerie.`}
      />

      <ScrollAnimal
        image="/Snailfish.png"
        top={mobileAdjust(4730, 3570)}
        left={mobileAdjust(320, 80)}
        size={mobileAdjust(300, 220)}
        alt="Snailfish"
        info={`Snailfish\nThe softest, deepest-living fish ever discovered. Its gelatinous body helps it survive intense pressure.`}
      />

      <ScrollAnimal
        image="/Pancake Urchin.png"
        top={mobileAdjust(5000, 3770)}
        left={mobileAdjust(600, 150)}
        size={mobileAdjust(270, 200)}
        alt="Pancake Urchin"
        info={`Pancake Urchin\nA flat deep-sea urchin that glows faintly and crawls silently over abyssal plains like a living saucer.`}
      />

      <ScrollAnimal
        image="/Bearded Sea Devil.png"
        top={mobileAdjust(4870, 3670)}
        left={mobileAdjust(950, 250)}
        size={mobileAdjust(270, 200)}
        alt="Bearded Sea Devil"
        info={`Bearded Sea Devil\nA terrifying deep anglerfish with glowing lures and creepy facial filaments. Extremely rare and ghost-like.`}
      />

      <ScrollAnimal
        image="/Abyssal Anemone.png"
        top={mobileAdjust(5300, 3990)}
        left={mobileAdjust(320, 80)}
        size={mobileAdjust(215, 160)}
        alt="Abyssal Anemone"
        info={`Abyssal Anemone\nAnchored to the trench floor, it survives in total darkness.\nSoft tentacles catch drifting food in freezing water.`}
      />

      <ScrollAnimal
        image="/Abyssal Spiderfish.png"
        top={mobileAdjust(5310, 4000)}
        left={mobileAdjust(760, 180)}
        size={mobileAdjust(350, 250)}
        alt="Abyssal Spiderfish"
        info={`Abyssal Spiderfish\nLong-finned hunter with sharp teeth.\nAmbushes prey while gliding silently over the deep seafloor.`}
      />

      <ScrollAnimal
        image="/Psychropotes longicauda.png"
        top={mobileAdjust(5460, 4120)}
        left={mobileAdjust(430, 120)}
        size={mobileAdjust(340, 250)}
        alt="Psychropotes longicauda"
        info={`Psychropotes longicauda\nCalled the 'headless chicken monster'.\nA floating sea cucumber that swims using its fin-like tail.`}
      />

      <ScrollAnimal
        image="/Abyssal Dumbo Octopus.png"
        top={mobileAdjust(5600, 4220)}
        left={mobileAdjust(1100, 280)}
        size={mobileAdjust(260, 190)}
        alt="Abyssal Dumbo Octopus"
        info={`Abyssal Dumbo Octopus\nIts ear-like fins help it flap through the abyss.\nOne of the cutest yet rare deep-sea dwellers.`}
      />

      <ScrollAnimal
        image="/Abyssal Holothurian.png"
        top={mobileAdjust(5700, 4300)}
        left={mobileAdjust(240, 60)}
        size={mobileAdjust(360, 260)}
        alt="Abyssal Holothurian"
        info={`Abyssal Holothurian\nA type of deep-sea sea cucumber.\nCrawls the ocean floor, feeding on organic-rich sediment.`}
      />

      <ScrollAnimal
        image="/Eelpout.png"
        top={mobileAdjust(5680, 4280)}
        left={mobileAdjust(750, 180)}
        size={mobileAdjust(270, 200)}
        alt="Eelpout"
        info={`Eelpout\nEel-shaped fish adapted to extreme pressure.\nIts body produces antifreeze proteins for survival.`}
      />

      <ScrollAnimal
        image="/Eurythenes plasticus_8000.png"
        top={mobileAdjust(7300, 5500)}
        left={mobileAdjust(380, 120)}
        size={mobileAdjust(250, 180)}
        alt="Eurythenes plasticus"
        info={`Eurythenes plasticus\nFound 8,000m deep with plastic in its gut.\nA shocking sign of human impact reaching trench depths.`}
      />

      <ScrollAnimal
        image="/Hirondellea gigas.png"
        top={mobileAdjust(5930, 4470)}
        left={mobileAdjust(600, 150)}
        size={mobileAdjust(230, 170)}
        alt="Hirondellea gigas"
        info={`Hirondellea gigas\nA trench-dwelling amphipod with aluminum armor.\nFeeds on wood, bones, and even carcasses at hadal depths.`}
      />

      <ScrollAnimal
        image="/Abyssal Ctenophore.png"
        top={mobileAdjust(6100, 4600)}
        left={mobileAdjust(740, 180)}
        size={mobileAdjust(270, 200)}
        alt="Abyssal Ctenophore"
        info={`Abyssal Ctenophore\nA glowing jelly-like creature.\nPulses with shimmering cilia in pitch-black waters.`}
      />

      <ScrollAnimal
        image="/Scotoplanes.png"
        top={mobileAdjust(6000, 4520)}
        left={mobileAdjust(350, 100)}
        size={mobileAdjust(270, 200)}
        alt="Scotoplanes"
        info={`Scotoplanes\nAlso called sea pigs, they crawl in herds.\nUse snouts and legs to search the deep mud for nutrients.`}
      />

      <ScrollAnimal
        image="/Slime Starfish.png"
        top={mobileAdjust(5840, 4400)}
        left={mobileAdjust(1140, 290)}
        size={mobileAdjust(260, 190)}
        alt="Slime Starfish"
        info={`Slime Starfish\nSoft-bodied, brightly colored starfish that oozes mucus when disturbed. Crawls slowly across abyssal mud.`}
      />

      <ScrollAnimal
        image="/Abyssal Xenophyophore.png"
        top={mobileAdjust(6200, 4680)}
        left={mobileAdjust(530, 130)}
        size={mobileAdjust(460, 330)}
        alt="Abyssal Xenophyophore"
        info={`Abyssal Xenophyophore\nGiant single-celled organism that creates intricate sediment shells. Dominant lifeform on abyssal plains.`}
      />

      <ScrollAnimal
        image="/Macrourid Rattail.png"
        top={mobileAdjust(6350, 4790)}
        left={mobileAdjust(980, 250)}
        size={mobileAdjust(300, 220)}
        alt="Macrourid Rattail"
        info={`Macrourid Rattail\nDeep abyssal fish with huge olfactory bulbs to detect prey. Constantly prowls above the seafloor.`}
      />

      <ScrollAnimal
        image="/Abyssal Tunicate.png"
        top={mobileAdjust(6500, 4900)}
        left={mobileAdjust(640, 160)}
        size={mobileAdjust(270, 200)}
        alt="Abyssal Tunicate"
        info={`Abyssal Tunicate\nFilter-feeding sea squirt that resembles a soft bulb. Lives embedded in mud, nearly transparent.`}
      />

      <ScrollAnimal
        image="/(Nemertea.png"
        top={mobileAdjust(6670, 5030)}
        left={mobileAdjust(320, 80)}
        size={mobileAdjust(230, 170)}
        alt="Nemertea"
        info={`Nemertea (Ribbon Worm)\nLong, elastic worm that hides under rocks or sediment. Uses a proboscis to capture prey.`}
      />

      <ScrollAnimal
        image="/Abyssal Scaly-foot Snail.png"
        top={mobileAdjust(6650, 5010)}
        left={mobileAdjust(1070, 270)}
        size={mobileAdjust(300, 220)}
        alt="Scaly-foot Snail"
        info={`Scaly-foot Snail\nUnique snail armored with iron scales. Found only in extreme abyssal hydrothermal vent fields.`}
      />

      <ScrollAnimal
        image="/Deep-sea Lollipop Sea Pen.png"
        top={mobileAdjust(6800, 5130)}
        left={mobileAdjust(780, 190)}
        size={mobileAdjust(270, 200)}
        alt="Lollipop Sea Pen"
        info={`Lollipop Sea Pen\nBioluminescent colony that looks like a glowing lollipop. Stays rooted to abyssal plains.`}
      />

      <ScrollAnimal
        image="/Abyssal Venus Flytrap Anemone.png"
        top={mobileAdjust(6900, 5200)}
        left={mobileAdjust(480, 130)}
        size={mobileAdjust(270, 200)}
        alt="Venus Flytrap Anemone"
        info={`Venus Flytrap Anemone\nUnusual deep-sea anemone that captures food like a carnivorous plant. Found in abyssal plains.`}
      />

      <ScrollAnimal
        image="/Abyssal Feather Star.png"
        top={mobileAdjust(6960, 5250)}
        left={mobileAdjust(1000, 250)}
        size={mobileAdjust(240, 180)}
        alt="Feather Star"
        info={`Feather Star\nFree-floating echinoderm with feathery arms. Drifts above the abyssal seafloor like a living flower.`}
      />

      <ScrollAnimal
        image="/Hadal DragonFish.png"
        top={mobileAdjust(7250, 5470)}
        left={mobileAdjust(920, 230)}
        size={mobileAdjust(300, 220)}
        alt="Hadal DragonFish"
        info={`Hadal DragonFish\nA rare predator with long fangs and light organs adapted for deep trench hunting.`}
      />

      <ScrollAnimal
        image="/Trench Holothurian.png"
        top={mobileAdjust(7350, 5540)}
        left={mobileAdjust(750, 180)}
        size={mobileAdjust(300, 220)}
        alt="Trench Holothurian"
        info={`Trench Holothurian\nA soft-bodied sea cucumber that roams the trench floor, absorbing nutrients from sediment.`}
      />

      <ScrollAnimal
        image="/Hadal Polychaete with Bioluminescent Bristles.png"
        top={mobileAdjust(7550, 5690)}
        left={mobileAdjust(320, 80)}
        size={mobileAdjust(230, 170)}
        alt="Hadal Polychaete"
        info={`Hadal Polychaete\nIts glowing bristles flash blue light to deter predators in the trench depths.`}
      />

      <ScrollAnimal
        image="/Blind Hadal Sea Spider.png"
        top={mobileAdjust(7600, 5730)}
        left={mobileAdjust(1100, 280)}
        size={mobileAdjust(250, 180)}
        alt="Blind Hadal Sea Spider"
        info={`Blind Hadal Sea Spider\nLong-limbed and eyeless, this sea spider walks silently across the trench bottom.`}
      />

      <ScrollAnimal
        image="/Hadal Scavenger Eelpout.png"
        top={mobileAdjust(7530, 5680)}
        left={mobileAdjust(1040, 260)}
        size={mobileAdjust(240, 180)}
        alt="Hadal Scavenger Eelpout"
        info={`Hadal Scavenger Eelpout\nFeeds on decaying matter in the upper hadal zone, using enhanced pressure sensors.`}
      />

      <ScrollAnimal
        image="/Deep Trench Glass Sponge.png"
        top={mobileAdjust(7900, 5960)}
        left={mobileAdjust(900, 230)}
        size={mobileAdjust(225, 170)}
        alt="Deep Trench Glass Sponge"
        info={`Deep Trench Glass Sponge\nSilica-based body with a lattice design, anchored to trench walls.`}
      />

      <ScrollAnimal
        image="/Trench Amphipod.png"
        top={mobileAdjust(7950, 6000)}
        left={mobileAdjust(430, 120)}
        size={mobileAdjust(270, 200)}
        alt="Trench Amphipod"
        info={`Trench Amphipod\nTiny but resilient, this amphipod survives immense trench pressure.`}
      />

      <ScrollAnimal
        image="/Mariana Mud Shrimp.png"
        top={mobileAdjust(7740, 5840)}
        left={mobileAdjust(600, 150)}
        size={mobileAdjust(280, 200)}
        alt="Mariana Mud Shrimp"
        info={`Mariana Mud Shrimp\nBurrows into soft trench sediment, possibly endemic to the Mariana Trench.`}
      />

      <ScrollAnimal
        image="/Paraliparis hada.png"
        top={mobileAdjust(8150, 6150)}
        left={mobileAdjust(850, 210)}
        size={mobileAdjust(250, 180)}
        alt="Paraliparis hada"
        info={`Paraliparis hada\nA translucent snailfish found at hadal depths with a soft, pressure-tolerant body.`}
      />

      <ScrollAnimal
        image="/Hadal Isopod.png"
        top={mobileAdjust(8200, 6190)}
        left={mobileAdjust(700, 170)}
        size={mobileAdjust(320, 230)}
        alt="Hadal Isopod"
        info={`Hadal Isopod\nA giant scavenger crustacean that thrives under extreme pressure.`}
      />

      <ScrollAnimal
        image="/Trench Cusk-Eel.png"
        top={mobileAdjust(8390, 6330)}
        left={mobileAdjust(330, 90)}
        size={mobileAdjust(260, 190)}
        alt="Trench Cusk-Eel"
        info={`Trench Cusk-Eel\nHolds the record for deepest-living fish, found near trench bottoms.`}
      />

      <ScrollAnimal
        image="/Hadal Cephalopod.png"
        top={mobileAdjust(8400, 6340)}
        left={mobileAdjust(880, 220)}
        size={mobileAdjust(340, 250)}
        alt="Hadal Cephalopod"
        info={`Hadal Cephalopod\nA deep-sea octopod relative with large fins and soft gelatinous body.`}
      />

      <ScrollAnimal
        image="/Hadal Enigma Worm (Polychaete sp.).png"
        top={mobileAdjust(8650, 6530)}
        left={mobileAdjust(690, 170)}
        size={mobileAdjust(240, 180)}
        alt="Hadal Enigma Worm"
        info={`Hadal Enigma Worm\nStill unnamed, this mysterious worm lives burrowed in deep trench mud.`}
      />

      <ScrollAnimal
        image="/Hadal Snailfish.png"
        top={mobileAdjust(8800, 6640)}
        left={mobileAdjust(330, 90)}
        size={mobileAdjust(300, 220)}
        alt="Hadal Snailfish"
        info={`Hadal Snailfish\nPossibly the most pressure-resistant fish, spotted in multiple hadal trenches.`}
      />

      <ScrollAnimal
        image="/Trench Gobyfish.png"
        top={mobileAdjust(8800, 6640)}
        left={mobileAdjust(950, 240)}
        size={mobileAdjust(300, 220)}
        alt="Trench Gobyfish"
        info={`Trench Gobyfish\nClings to steep trench walls with suction-like fins, adapted for vertical life.`}
      />

      <ScrollAnimal
        image="/Trench Mysid Shrimp.png"
        top={mobileAdjust(8930, 6740)}
        left={mobileAdjust(650, 160)}
        size={mobileAdjust(220, 160)}
        alt="Trench Mysid Shrimp"
        info={`Trench Mysid Shrimp\nFast-moving and often in swarms, these shrimp dominate hadal trenches.`}
      />

      <ScrollAnimal
        image="/Black Sea Devil.png"
        top={mobileAdjust(9300, 7020)}
        left={mobileAdjust(300, 80)}
        size={mobileAdjust(300, 220)}
        alt="Black Sea Devil"
        info={`Black Sea Devil\nA deep-sea anglerfish with a bioluminescent lure to attract prey in darkness.`}
      />

      <ScrollAnimal
        image="/Paraliparis manduriensis.png"
        top={mobileAdjust(9400, 7090)}
        left={mobileAdjust(1100, 280)}
        size={mobileAdjust(270, 200)}
        alt="Paraliparis mandurriensis"
        info={`Paraliparis mandurriensis\nA type of snailfish adapted to extreme trench pressures.`}
      />

      <ScrollAnimal
        image="/Careproctus profundicola.png"
        top={mobileAdjust(9500, 7170)}
        left={mobileAdjust(660, 160)}
        size={mobileAdjust(300, 220)}
        alt="Careproctus profundicola"
        info={`Careproctus profundicola\nA soft-bodied fish found in deep cold waters of the Pacific.`}
      />

      <ScrollAnimal
        image="/Paraliparis bathybius.png"
        top={mobileAdjust(9600, 7240)}
        left={mobileAdjust(400, 110)}
        size={mobileAdjust(260, 190)}
        alt="Paraliparis bathybius"
        info={`Paraliparis bathybius\nLives at abyssal depths, navigating with sensitive lateral lines.`}
      />

      <ScrollAnimal
        image="/Liparid Sp. CT9901.png"
        top={mobileAdjust(9620, 7260)}
        left={mobileAdjust(990, 250)}
        size={mobileAdjust(240, 180)}
        alt="Liparid Sp. CT9901"
        info={`Liparid Sp. CT9901\nUndescribed deep-sea snailfish species identified from hadal zones.`}
      />

      <ScrollAnimal
        image="/Echiodon neotes (Deep Pearlfish).png"
        top={mobileAdjust(9890, 7460)}
        left={mobileAdjust(300, 80)}
        size={mobileAdjust(220, 160)}
        alt="Echiodon neotes"
        info={`Echiodon neotes (Deep Pearlfish)\nA slender fish known to inhabit extreme depths and sometimes hide inside invertebrates.`}
      />

      <ScrollAnimal
        image="/Notoliparis kermadecensi.png"
        top={mobileAdjust(9700, 7320)}
        left={mobileAdjust(700, 170)}
        size={mobileAdjust(300, 220)}
        alt="Notoliparis kermadecensi"
        info={`Notoliparis kermadecensi\nA hadal snailfish native to the Kermadec Trench region.`}
      />

      <ScrollAnimal
        image="/Pseudoliparis belyaevi.png"
        top={mobileAdjust(9800, 7390)}
        left={mobileAdjust(1000, 250)}
        size={mobileAdjust(350, 250)}
        alt="Pseudoliparis belyaevi"
        info={`Pseudoliparis belyaevi\nOne of the world's deepest-living fish, recorded below 8000 meters.`}
      />

      <ScrollAnimal
        image="/Pseudoliparis swirei (Mariana Snailfish).png"
        top={mobileAdjust(10000, 7540)}
        left={mobileAdjust(680, 170)}
        size={mobileAdjust(250, 180)}
        alt="Pseudoliparis swirei"
        info={`Pseudoliparis swirei (Mariana Snailfish)\nLives in the Mariana Trench, holds records for deepest fish ever filmed.`}
      />

      <div className="ocean-floor">
        <div className="floor-text">
          🏔️ Ocean Floor Reached 🏔️ <br />
          The dive ends here.
        </div>
      </div>
    </div>
  );
};

export default OceanScroll1;