import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import ScrollAnimal from "./ScrollAnimal";

const zoneData = [
  {
    name: "Snorkel Zone",
    subtitle: "(0–10m)",
    narration: "EQUIPMENT: Snorkel gear (mask, fins, snorkel)\nRISKS: Completely safe – pressure only ~1.5× atmospheric\n FACT: Air is still breathable from the surface. Perfect for coral reefs!"
  },
  {
    name: "Scuba Diving Depth",
    subtitle: "(10–40m)",
    narration: "EQUIPMENT: Scuba suit with oxygen tanks\n RISKS: Nitrogen narcosis can make you feel drunk underwater! Beware decompression sickness (\"the bends\")\nFACT: Must ascend slowly to avoid dangerous gas bubbles in blood"
  },
  {
    name: "Commercial Diving",
    subtitle: "(40–300m)",
    
    narration: "EQUIPMENT: Atmospheric diving suits like JIM suit or Newtsuit\nRISKS: Without suit: lung collapse, blood vessel rupture\nFACT: These suits maintain normal 1 atm pressure inside"
  },
  {
    name: "Exosuit Territory",
    subtitle: "(300–1000m)",
    
    narration: "EQUIPMENT: Exosuit – high-tech ADS with thrusters and lights\n⚠️ RISKS: Over 100× atmospheric pressure – could crush a car instantly!\n FACT: These suits cost millions of dollars each"
  },
  {
    name: "Human Limit",
    subtitle: "(1000–1200m)",
    narration: "EQUIPMENT: Max depth JIM suit can reach\nRISKS: Absolute limit for human survival in any suit\nFACT: Record depth: ~1200m by JIM suit. Beyond this: only submersibles work"
  },
  {
    name: "Twilight Zone",
    subtitle: "(1200–4000m)",
    narration: "EQUIPMENT: DSV Alvin, Nereus submersibles only\nRISKS: Crushing pressure – humans can't survive here in suits\nFACT: Titanic wreck lies at ~3800m in this zone"
  },
  {
    name: "Abyssal Zone",
    subtitle: "(4000–6000m)",
    narration: "EQUIPMENT: ROVs and Bathyscaphes only\nRISKS: Complete darkness, extreme pressure\nFACT: No manned vessels come here – too dangerous even for submarines"
  },
  {
    name: "Hadal Zone",
    subtitle: "(6000–11000m)",
    narration: "EQUIPMENT: DSV Limiting Factor (Victor Vescovo, 2019)\nRISKS: Maximum ocean depth pressure\nFACT: Deepest human dive: 10,927m in Mariana Trench. Challenger Deep: 10,984m. You've reached the bottom of Earth"
  }
];

const ZoneComponent = ({ zone, index, isActive, setActiveZone }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { threshold: 0.5 });

  React.useEffect(() => {
    if (isInView) {
      setActiveZone(index);
    }
  }, [isInView, index, setActiveZone]);

  return (
    <motion.div 
      ref={ref}
      className="diving-zone"
      data-zone={index}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ threshold: 0.3, once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div 
        className="depth-marker"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ threshold: 0.5, once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="depth-label">{zone.subtitle}</span>
      </motion.div>
      
      <motion.div 
        className="zone-content"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ threshold: 0.3, once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div 
          className="zone-header"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.span 
            className="zone-icon"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {zone.icon}
          </motion.span>
          <div className="zone-text">
            <motion.h2 
              className="zone-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {zone.name}
            </motion.h2>
            <motion.p 
              className="zone-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {zone.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const HumanDivingGuide = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeZone, setActiveZone] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    checkMobile();
    setViewportHeight();
    
    window.addEventListener('resize', () => {
      checkMobile();
      setViewportHeight();
    });
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  const scrollRatio = Math.min(scrollY / scrollHeight, 1);
  
  
  const topColor = `rgb(${74 - scrollRatio * 74}, ${144 - scrollRatio * 144}, ${226 - scrollRatio * 226})`;
  const bottomColor = `rgb(${27 - scrollRatio * 27}, ${73 - scrollRatio * 73}, ${101 - scrollRatio * 101})`;
  const dynamicBackground = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;

  
  const mobileAdjust = (desktop, mobile) => isMobile ? mobile : desktop;

  
  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = isMobile ? 10 : 20;
    for (let i = 0; i < bubbleCount; i++) {
      const size = isMobile ? Math.random() * 20 + 10 : Math.random() * 35 + 15;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 12 + 18;
      const delay = Math.random() * 25;
      
      bubbles.push(
        <motion.div
          key={i}
          className="floating-bubble"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{
            duration: animationDuration,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      );
    }
    return bubbles;
  };

  
  const generateBackgroundLines = () => {
    const lines = [];
    const lineCount = isMobile ? 15 : 25;
    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <motion.div 
          key={i} 
          className="background-line" 
          style={{ 
            top: `${i * 8}vh`,
            animationDelay: `${i * 0.2}s`
          }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scaleX: [0.9, 1.1, 0.9]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      );
    }
    return lines;
  };

  const handleGoBack = () => {
   
    window.location.href = '/DeepDiving';
  };

  return (
    <div 
      className="diving-guide-container"
      style={{ background: dynamicBackground }}
    >
     
      <div className="background-lines-overlay">
        {generateBackgroundLines()}
      </div>

      
      <div className="bubbles-overlay">
        {generateBubbles()}
      </div>
      
      <div className="pressure-lines">
        {Array.from({ length: isMobile ? 10 : 15 }).map((_, i) => (
          <motion.div 
            key={i} 
            className="pressure-line" 
            style={{ top: `${i * 15}vh` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      
      <motion.div 
        className="intro-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="intro-content">
          <motion.div 
            className="intro-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1>Human Diving Guide</h1>
            <p>Discover how deep humans can safely explore the ocean</p>
          </motion.div>
          
          <motion.div 
            className="intro-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2>Equipment Evolution</h2>
            <p>From simple snorkels to atmospheric diving suits</p>
          </motion.div>
          
          <motion.div 
            className="intro-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h2>Depth Limits</h2>
            <p>Humans: ~1,200m max • Submersibles: 10,984m deep</p>
          </motion.div>

        
          <motion.div 
            className="infographics"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {[
              { text: "Oxygen\ndecreases\nwith depth" },
              { text: "Pressure\nincreases\n10x per 100m" },
              { text: "Special suits\nneeded below\n300m" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="infographic"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="info-circle">
                  <span className="info-icon">{item.icon}</span>
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <p>Scroll to Begin Your Descent</p>
          </motion.div>
        </div>
      </motion.div>

      
      <motion.div 
        className="bot-guide"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div 
          className="speech-bubble"
          key={activeZone}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>{activeZone === 0 && scrollY < 500 ? "Hi! I'll be your diving guide. Let's explore the depths together!" : zoneData[activeZone]?.narration}</p>
        </motion.div>
        <motion.img 
          src="/bot.png" 
          alt="Diving Bot Guide" 
          className="bot-character"
          animate={{ 
            y: [0, -10, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
        />
      </motion.div>

      
      {zoneData.map((zone, index) => (
        <ZoneComponent 
          key={index}
          zone={zone}
          index={index}
          isActive={activeZone === index}
          setActiveZone={setActiveZone}
        />
      ))}

      <motion.div 
        className="ocean-floor"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ threshold: 0.3, once: true }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🏔️ Ocean Floor Reached 🏔️
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          You've explored the maximum depths humans can reach!
        </motion.p>

        <motion.button 
          className="go-back-btn" 
          onClick={handleGoBack}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 15px 40px rgba(0, 255, 234, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          🌊 Go Back to DeepDiving
        </motion.button>
      </motion.div>

      
      <ScrollAnimal
        image="/scuba_gear_1.png"
        top={mobileAdjust(1100, 800)}
        left={mobileAdjust(340, 20)}
        alt="Snorkel Gear"
        size={mobileAdjust(200, 120)}
        info={`Snorkel Gear\nBasic snorkeling equipment includes a mask, fins, and a snorkel. It's used in shallow waters for observing coral reefs and fish.`}
      />

      <ScrollAnimal
        image="/coral.png"
        top={mobileAdjust(1200, 900)}
        left={mobileAdjust(700, 200)}
        alt="Coral Reef"
        size={mobileAdjust(220, 140)}
        info={`Coral Reef\nSnorkelers explore these vibrant ecosystems teeming with fish, crustaceans, and coral polyps — all thriving in sunlight.`}
      />

      <ScrollAnimal
        image="/girl_1st.png"
        top={mobileAdjust(900, 700)}
        left={mobileAdjust(800, 50)}
        alt="Snorkeler"
        size={mobileAdjust(360, 200)}
        info={`Snorkeler\nFloating on the surface, snorkelers breathe through a tube while viewing sea life. It's peaceful and beginner-friendly!`}
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
        size={mobileAdjust(300, 160)}
        info={`Scuba Tank\nCompressed air tanks allow divers to stay underwater for extended periods — but proper pressure management is crucial.`}
      />

      <ScrollAnimal
        image="/JIM Suit.png"
        top={mobileAdjust(2230, 1800)}
        left={mobileAdjust(250, 40)}
        alt="JIM Suit"
        size={mobileAdjust(270, 150)}
        info={`JIM Suit\nThis atmospheric diving suit protects the diver from crushing pressures while allowing mobility for industrial tasks.`}
      />

      <ScrollAnimal
        image="/diving_head.png"
        top={mobileAdjust(2330, 1900)}
        left={mobileAdjust(720, 200)}
        alt="Diving Helmet"
        size={mobileAdjust(250, 130)}
        info={`Diving Helmet\nHeavy brass or composite helmets supply air and protect the head. Some are connected via long tubes to surface ships.`}
      />

      <ScrollAnimal
        image="/exosuit.png"
        top={mobileAdjust(2700, 2200)}
        left={mobileAdjust(250, 20)}
        alt="Exosuit"
        size={mobileAdjust(450, 240)}
        info={`Exosuit\nA high-tech suit with built-in thrusters and lights. It lets humans dive hundreds of meters deeper than scuba gear.`}
      />

      <ScrollAnimal
        image="/image.png"
        top={mobileAdjust(2800, 2300)}
        left={mobileAdjust(750, 150)}
        alt="Robotic Diver"
        size={mobileAdjust(300, 160)}
        info={`Robotic Diver\nAdvanced diving suits look like mini-submarines! They're made from metal alloys and resist pressures 100x atmospheric.`}
      />

      <ScrollAnimal
        image="/image (2).png"
        top={mobileAdjust(3400, 2800)}
        left={mobileAdjust(250, 50)}
        alt="Pressure Gauge"
        size={mobileAdjust(220, 120)}
        info={`Crushing Pressure\nAt over 1000m deep, pressure exceeds what most suits can handle. One mistake — and it's fatal.`}
      />

      <ScrollAnimal
        image="/image (3).png"
        top={mobileAdjust(3599, 2900)}
        left={mobileAdjust(500, 180)}
        alt="Depth Limit"
        size={mobileAdjust(200, 110)}
        info={`Warning Depth\nThe deepest recorded dive using a suit was ~1200m. Beyond that, submersibles are the only safe option.`}
      />

      <ScrollAnimal
        image="/deepsuit.png"
        top={mobileAdjust(3450, 2750)}
        left={mobileAdjust(800, 80)}
        alt="Deep Suit"
        size={mobileAdjust(300, 160)}
        info={`Deep Suit\nOnly the most advanced suits can descend here — they're tested in labs and cost millions to develop.`}
      />

      <ScrollAnimal
        image="/dsv_alvin.png"
        top={mobileAdjust(3850, 3200)}
        left={mobileAdjust(250, 30)}
        alt="DSV Alvin"
        size={mobileAdjust(350, 200)}
        info={`DSV Alvin\nThis submersible explored the Titanic wreck at ~3,800m! It's one of the deepest manned dives ever.`}
      />

      <ScrollAnimal
        image="/image (5).png"
        top={mobileAdjust(4050, 3400)}
        left={mobileAdjust(700, 160)}
        alt="Wreck"
        size={mobileAdjust(250, 140)}
        info={`Shipwrecks\nHistoric wrecks like the Titanic lie in this zone. The cold and pressure preserve them for decades.`}
      />

      <ScrollAnimal
        image="/image (6).png"
        top={mobileAdjust(4450, 3700)}
        left={mobileAdjust(250, 20)}
        alt="ROV"
        size={mobileAdjust(500, 280)}
        info={`ROV\nRemote Operated Vehicles explore dangerous depths — where no human could survive even in a suit.`}
      />

      <ScrollAnimal
        image="/angler_fish.png"
        top={mobileAdjust(4440, 3650)}
        left={mobileAdjust(800, 200)}
        alt="Anglerfish"
        size={mobileAdjust(220, 120)}
        info={`Anglerfish\nThis eerie predator uses a glowing lure to attract prey in pitch-black darkness.`}
      />

      <ScrollAnimal
        image="/image (7).png"
        top={mobileAdjust(5000, 4100)}
        left={mobileAdjust(230, 40)}
        alt="Limiting Factor Sub"
        size={mobileAdjust(220, 120)}
        info={`DSV Limiting Factor\nVictor Vescovo used this sub to dive ~10,927m into the Mariana Trench — the deepest place on Earth.`}
      />

      <ScrollAnimal
        image="/mariana_trench.png"
        top={mobileAdjust(4900, 4000)}
        left={mobileAdjust(550, 140)}
        alt="Trench Diagram"
        size={mobileAdjust(300, 160)}
        info={`Mariana Trench\nThis massive underwater canyon reaches 11km below the surface — deeper than Mount Everest is tall!`}
      />

      <ScrollAnimal
        image="/challenger_deep.png"
        top={mobileAdjust(4830, 3950)}
        left={mobileAdjust(900, 80)}
        alt="Challenger Deep"
        size={mobileAdjust(400, 220)}
        info={`Challenger Deep\nThe deepest known point on Earth's seabed — nearly 11,000 meters down. Only a few submersibles have ever reached it.`}
      />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Satisfy:wght@400&family=Inter:wght@300;400;600;700&display=swap');

        .diving-guide-container {
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .background-lines-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
        }

        .background-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.1) 25%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 75%, 
            transparent 100%
          );
          opacity: 0.1;
        }

        .bubbles-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
        }

        .floating-bubble {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          border-radius: 50%;
          opacity: 0.6;
        }

        .pressure-lines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
        }

        .pressure-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }

        .intro-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .intro-content {
          text-align: center;
          max-width: 1000px;
          padding: 20px;
        }

        .intro-message {
          margin: 40px 0;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease forwards;
        }

        .intro-message:nth-child(1) { animation-delay: 0.5s; }
        .intro-message:nth-child(2) { animation-delay: 1s; }
        .intro-message:nth-child(3) { animation-delay: 1.5s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .intro-message h1 {
          font-size: 4rem;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #00ffea, #00fbf7, #01ffc8);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease infinite;
          font-family: 'Satisfy', cursive;
        }

        .intro-message h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #ffffff;
          font-weight: 700;
        }

        .intro-message p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .infographics {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin: 60px 0;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeInUp 1s ease forwards;
          animation-delay: 2s;
        }

        .info-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .info-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .info-circle p {
          font-size: 0.8rem;
          text-align: center;
          line-height: 1.2;
          margin: 0;
        }

        .scroll-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 80px;
          opacity: 0;
          animation: fadeInUp 1s ease forwards;
          animation-delay: 2.5s;
        }

        .scroll-indicator span {
          font-size: 2rem;
        }

        .scroll-indicator p {
          font-size: 1.2rem;
          font-weight: 600;
          color: #00ffea;
          margin: 0;
        }

        .bot-guide {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .bot-character {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 3px solid rgba(255, 255, 255, 0.2);
          object-fit: cover;
          padding: 10px;
          cursor: pointer;
        }

        .speech-bubble {
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          padding: 20px;
          border-radius: 20px;
          max-width: 350px;
          position: relative;
          margin-right: 15px;
        }

        .speech-bubble::after {
          content: '';
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          border: 15px solid transparent;
          border-left-color: rgba(255, 255, 255, 0.95);
        }

        .speech-bubble p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 500;
          white-space: pre-line;
        }

        .diving-zone {
          position: relative;
          display: flex;
          align-items: center;
          padding: 40px 20px;
          z-index: 2;
          min-height: 80vh;
          border: none;
        }

        .depth-marker {
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
        }

        .depth-label {
          background: #ffff66;
          color: #000;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: bold;
          font-size: 1.3rem;
          box-shadow: 0 5px 15px rgba(255, 255, 102, 0.3);
          white-space: nowrap;
        }

        .zone-content {
          margin-left: 200px;
          max-width: 600px;
          border: none;
          outline: none;
        }

        .zone-header {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          border: none;
        }

        .zone-icon {
          font-size: 4rem;
          min-width: 80px;
        }

        .zone-text {
          flex: 1;
        }

        .zone-title {
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          font-family: 'Satisfy', cursive;
          background: linear-gradient(90deg, #00ffea, #00fbf7, #01ffc8);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 5s ease infinite;
          line-height: 1.2;
        }

        .zone-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          font-weight: 300;
        }

        .ocean-floor {
          min-height: 400px;
          background: linear-gradient(to bottom, #1a1a1a, #000);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px;
          position: relative;
          z-index: 2;
        }

        .ocean-floor h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-family: 'Satisfy', cursive;
        }

        .ocean-floor p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
        }

        .go-back-btn {
          background: linear-gradient(45deg, #00ffea, #01ffc8);
          color: #000;
          border: none;
          padding: 20px 40px;
          font-size: 1.3rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 255, 234, 0.3);
          font-family: 'Inter', sans-serif;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .diving-guide-container {
            height: 100vh;
            height: calc(var(--vh, 1vh) * 100);
          }
          
          .intro-section {
            height: 100vh;
            height: calc(var(--vh, 1vh) * 100);
          }

          .intro-content {
            padding: 15px;
            max-width: 100%;
          }

          .intro-message {
            margin: 25px 0;
          }

          .intro-message h1 {
            font-size: 2.2rem;
            line-height: 1.1;
          }

          .intro-message h2 {
            font-size: 1.6rem;
            line-height: 1.2;
          }

          .intro-message p {
            font-size: 1rem;
            line-height: 1.4;
          }

          .infographics {
            gap: 20px;
            flex-direction: column;
            align-items: center;
            margin: 40px 0;
          }

          .info-circle {
            width: 80px;
            height: 80px;
          }

          .info-icon {
            font-size: 1.5rem;
          }

          .scroll-indicator {
            margin-top: 40px;
            flex-direction: column;
            gap: 10px;
          }

          .bot-guide {
            position: fixed;
            right: 10px;
            top: 20px;
            transform: none;
            flex-direction: column;
            align-items: flex-end;
            z-index: 15;
            max-width: 250px;
          }

          .speech-bubble {
            max-width: 180px;
            padding: 10px 12px;
            font-size: 0.7rem;
            margin-right: 0;
            margin-bottom: 8px;
            order: 2;
            line-height: 1.3;
          }

          .speech-bubble::after {
            right: 25px;
            top: -8px;
            transform: none;
            border: 8px solid transparent;
            border-bottom-color: rgba(255, 255, 255, 0.95);
            border-left-color: transparent;
            border-right-color: transparent;
          }

          .bot-character {
            width: 50px;
            height: 50px;
            order: 1;
            padding: 5px;
          }

          .zone-content {
            margin-left: 80px;
            max-width: calc(100vw - 100px);
            padding-right: 20px;
          }

          .depth-marker {
            left: 10px;
          }

          .depth-label {
            font-size: 0.9rem;
            padding: 6px 12px;
            white-space: nowrap;
          }

          .zone-title {
            font-size: 1.5rem;
            line-height: 1.1;
          }

          .zone-subtitle {
            font-size: 1rem;
          }

          .zone-icon {
            font-size: 2rem;
            min-width: 40px;
          }

          .diving-zone {
            min-height: 60vh;
            padding: 30px 10px;
          }

          .go-back-btn {
            padding: 15px 30px;
            font-size: 1.1rem;
          }

          .floating-bubble {
            width: 20px !important;
            height: 20px !important;
          }
          
          .background-line {
            opacity: 0.05;
          }
          
          .pressure-line {
            opacity: 0.1;
          }
        }

        /* Landscape Mobile Styles */
        @media (max-width: 896px) and (orientation: landscape) {
          .intro-section {
            height: 100vh;
            padding: 20px;
          }
          
          .intro-content {
            padding: 10px;
          }
          
          .intro-message h1 {
            font-size: 2.5rem;
          }
          
          .intro-message h2 {
            font-size: 1.8rem;
          }
          
          .infographics {
            gap: 30px;
            margin: 30px 0;
          }
          
          .diving-zone {
            min-height: 60vh;
            padding: 20px;
          }
          
          .zone-content {
            margin-left: 100px;
          }
        }

        /* Very Small Screens */
        @media (max-width: 320px) {
          .intro-message h1 {
            font-size: 2rem;
          }
          
          .intro-message h2 {
            font-size: 1.5rem;
          }
          
          .intro-message p {
            font-size: 0.9rem;
          }
          
          .zone-title {
            font-size: 1.5rem;
          }
          
          .zone-subtitle {
            font-size: 1rem;
          }
          
          .depth-label {
            font-size: 0.9rem;
            padding: 6px 12px;
          }
          
          .zone-content {
            margin-left: 80px;
          }
          
          .info-circle {
            width: 80px;
            height: 80px;
          }
          
          .go-back-btn {
            padding: 12px 24px;
            font-size: 1rem;
          }
        }

        /* iOS Safari Support */
        @supports (-webkit-touch-callout: none) {
          .diving-guide-container {
            height: -webkit-fill-available;
            min-height: -webkit-fill-available;
          }
          
          .intro-section {
            height: -webkit-fill-available;
          }
          
          .background-lines-overlay,
          .bubbles-overlay,
          .pressure-lines {
            height: -webkit-fill-available;
          }
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
          .zone-header:hover {
            transform: none;
          }
          
          .go-back-btn:hover {
            transform: none;
            box-shadow: 0 10px 30px rgba(0, 255, 234, 0.3);
          }
          
          .info-circle:hover {
            transform: none;
          }
        }

        /* Prevent zoom on iOS */
        @media (max-width: 768px) {
          input[type="text"],
          input[type="email"],
          input[type="password"],
          textarea,
          select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HumanDivingGuide;