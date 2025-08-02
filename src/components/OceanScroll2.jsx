import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import ScrollAnimal from "./ScrollAnimal";

const zoneData = [
  {
    name: "Snorkel Zone",
    subtitle: "(0–10m)",
    icon: "🤿",
    narration: "🥽 EQUIPMENT: Snorkel gear (mask, fins, snorkel)\n⚠️ RISKS: Completely safe – pressure only ~1.5× atmospheric\n🌊 FACT: Air is still breathable from the surface. Perfect for coral reefs!"
  },
  {
    name: "Scuba Diving Depth",
    subtitle: "(10–40m)",
    icon: "🏊‍♂️",
    narration: "🥽 EQUIPMENT: Scuba suit with oxygen tanks\n⚠️ RISKS: Nitrogen narcosis can make you feel drunk underwater! Beware decompression sickness (\"the bends\")\n🌊 FACT: Must ascend slowly to avoid dangerous gas bubbles in blood"
  },
  {
    name: "Commercial Diving",
    subtitle: "(40–300m)",
    icon: "🤖",
    narration: "🥽 EQUIPMENT: Atmospheric diving suits like JIM suit or Newtsuit\n⚠️ RISKS: Without suit: lung collapse, blood vessel rupture\n🌊 FACT: These suits maintain normal 1 atm pressure inside"
  },
  {
    name: "Exosuit Territory",
    subtitle: "(300–1000m)",
    icon: "⚙️",
    narration: "🥽 EQUIPMENT: Exosuit – high-tech ADS with thrusters and lights\n⚠️ RISKS: Over 100× atmospheric pressure – could crush a car instantly!\n🌊 FACT: These suits cost millions of dollars each"
  },
  {
    name: "Human Limit",
    subtitle: "(1000–1200m)",
    icon: "🚫",
    narration: "🥽 EQUIPMENT: Max depth JIM suit can reach\n⚠️ RISKS: Absolute limit for human survival in any suit\n🌊 FACT: Record depth: ~1200m by JIM suit. Beyond this: only submersibles work"
  },
  {
    name: "Twilight Zone",
    subtitle: "(1200–4000m)",
    icon: "🚢",
    narration: "🥽 EQUIPMENT: DSV Alvin, Nereus submersibles only\n⚠️ RISKS: Crushing pressure – humans can't survive here in suits\n🌊 FACT: Titanic wreck lies at ~3800m in this zone"
  },
  {
    name: "Abyssal Zone",
    subtitle: "(4000–6000m)",
    icon: "🤖",
    narration: "🥽 EQUIPMENT: ROVs and Bathyscaphes only\n⚠️ RISKS: Complete darkness, extreme pressure\n🌊 FACT: No manned vessels come here – too dangerous even for submarines"
  },
  {
    name: "Hadal Zone",
    subtitle: "(6000–11000m)",
    icon: "🏆",
    narration: "🥽 EQUIPMENT: DSV Limiting Factor (Victor Vescovo, 2019)\n⚠️ RISKS: Maximum ocean depth pressure\n🌊 FACT: Deepest human dive: 10,927m in Mariana Trench. Challenger Deep: 10,984m. You've reached the bottom of Earth"
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollRatio = Math.min(scrollY / scrollHeight, 1);
  
  // Dynamic background gradient from blue to black
  const topColor = `rgb(${74 - scrollRatio * 74}, ${144 - scrollRatio * 144}, ${226 - scrollRatio * 226})`;
  const bottomColor = `rgb(${27 - scrollRatio * 27}, ${73 - scrollRatio * 73}, ${101 - scrollRatio * 101})`;
  const dynamicBackground = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;

  // Generate floating bubbles
  const generateBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 35 + 15;
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

  // Generate light background lines
  const generateBackgroundLines = () => {
    const lines = [];
    for (let i = 0; i < 25; i++) {
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
    // This would navigate to DeepDiving.jsx in a real router setup
    window.location.href = '/DeepDiving';
  };

  return (
    <div 
      className="diving-guide-container"
      style={{ background: dynamicBackground }}
    >
      {/* Light background lines */}
      <div className="background-lines-overlay">
        {generateBackgroundLines()}
      </div>

      {/* Floating bubbles */}
      <div className="bubbles-overlay">
        {generateBubbles()}
      </div>
      
      {/* Pressure depth lines */}
      <div className="pressure-lines">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i} 
            className="pressure-line" 
            style={{ top: `${i * 15}vh` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* First Section - 16:9 Intro */}
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
            <h1>🌊 Human Diving Guide</h1>
            <p>Discover how deep humans can safely explore the ocean</p>
          </motion.div>
          
          <motion.div 
            className="intro-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2>🤿 Equipment Evolution</h2>
            <p>From simple snorkels to atmospheric diving suits</p>
          </motion.div>
          
          <motion.div 
            className="intro-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h2>📊 Depth Limits</h2>
            <p>Humans: ~1,200m max • Submersibles: 10,984m deep</p>
          </motion.div>

          {/* Infographics */}
          <motion.div 
            className="infographics"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {[
              { icon: "💨", text: "Oxygen\ndecreases\nwith depth" },
              { icon: "⬇️", text: "Pressure\nincreases\n10x per 100m" },
              { icon: "🤿", text: "Special suits\nneeded below\n300m" }
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
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>⬇️</span>
            <p>Scroll to Begin Your Descent</p>
            <span>⬇️</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Bot Guide */}
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

      {/* Scrollable Depth Zones */}
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
  top={200}
  left={1100}
  alt="Snorkel Gear"
  size={140}
  info={`Snorkel Gear\nBasic snorkeling equipment includes a mask, fins, and a snorkel. It's used in shallow waters for observing coral reefs and fish.`}
/>

<ScrollAnimal
  image="/coral.png"
  top={250}
  left={700}
  alt="Coral Reef"
  size={180}
  info={`Coral Reef\nSnorkelers explore these vibrant ecosystems teeming with fish, crustaceans, and coral polyps — all thriving in sunlight.`}
/>

<ScrollAnimal
  image="/girl_1st.png"
  top={180}
  left={500}
  alt="Snorkeler"
  size={160}
  info={`Snorkeler\nFloating on the surface, snorkelers breathe through a tube while viewing sea life. It’s peaceful and beginner-friendly!`}
/>
<ScrollAnimal
  image="/diver_2nd.png"
  top={650}
  left={1050}
  alt="Scuba Diver"
  size={170}
  info={`Scuba Diver\nWith an oxygen tank and pressure-resistant wetsuit, divers can reach reef walls, shipwrecks, and underwater caves.`}
/>

<ScrollAnimal
  image="/oxygen_tank.png"
  top={700}
  left={780}
  alt="Oxygen Tank"
  size={130}
  info={`Scuba Tank\nCompressed air tanks allow divers to stay underwater for extended periods — but proper pressure management is crucial.`}
/>


<ScrollAnimal
  image="/JIM Suit.png"
  top={1150}
  left={1050}
  alt="JIM Suit"
  size={180}
  info={`JIM Suit\nThis atmospheric diving suit protects the diver from crushing pressures while allowing mobility for industrial tasks.`}
/>

<ScrollAnimal
  image="/images/diving-helmet.png"
  top={1170}
  left={720}
  alt="Diving Helmet"
  size={140}
  info={`Diving Helmet\nHeavy brass or composite helmets supply air and protect the head. Some are connected via long tubes to surface ships.`}
/>


<ScrollAnimal
  image="/images/exosuit.png"
  top={1700}
  left={1050}
  alt="Exosuit"
  size={190}
  info={`Exosuit\nA high-tech suit with built-in thrusters and lights. It lets humans dive hundreds of meters deeper than scuba gear.`}
/>

<ScrollAnimal
  image="/image.png"
  top={1720}
  left={750}
  alt="Robotic Diver"
  size={160}
  info={`Robotic Diver\nAdvanced diving suits look like mini-submarines! They're made from metal alloys and resist pressures 100x atmospheric.`}
/>


<ScrollAnimal
  image="/image(2).png"
  top={2250}
  left={1000}
  alt="Pressure Gauge"
  size={150}
  info={`Crushing Pressure\nAt over 1000m deep, pressure exceeds what most suits can handle. One mistake — and it's fatal.`}
/>

<ScrollAnimal
  image="/image(3).png"
  top={2300}
  left={700}
  alt="Depth Limit"
  size={120}
  info={`Warning Depth\nThe deepest recorded dive using a suit was ~1200m. Beyond that, submersibles are the only safe option.`}
/>

<ScrollAnimal
  image="/images/suit-depth.png"
  top={2320}
  left={400}
  alt="Deep Suit"
  size={150}
  info={`Extreme Suit\nOnly the most advanced suits can descend here — they're tested in labs and cost millions to develop.`}
/>
<ScrollAnimal
  image="/images/dsv-alvin.png"
  top={2850}
  left={1050}
  alt="DSV Alvin"
  size={160}
  info={`DSV Alvin\nThis submersible explored the Titanic wreck at ~3,800m! It's one of the deepest manned dives ever.`}
/>

<ScrollAnimal
  image="/images/wreck-silhouette.png"
  top={2880}
  left={700}
  alt="Wreck"
  size={180}
  info={`Shipwrecks\nHistoric wrecks like the Titanic lie in this zone. The cold and pressure preserve them for decades.`}
/>

<ScrollAnimal
  image="/images/bioluminescence.png"
  top={2920}
  left={420}
  alt="Bioluminescence"
  size={140}
  info={`Bioluminescence\nMany animals in the twilight zone glow! These blue-green flashes help attract prey or signal mates.`}
/>
<ScrollAnimal
  image="/images/rov.png"
  top={3450}
  left={1100}
  alt="ROV"
  size={170}
  info={`ROV\nRemote Operated Vehicles explore dangerous depths — where no human could survive even in a suit.`}
/>

<ScrollAnimal
  image="/images/anglerfish.png"
  top={3480}
  left={800}
  alt="Anglerfish"
  size={150}
  info={`Anglerfish\nThis eerie predator uses a glowing lure to attract prey in pitch-black darkness.`}
/>

<ScrollAnimal
  image="/images/vent.png"
  top={3500}
  left={420}
  alt="Hydrothermal Vent"
  size={160}
  info={`Hydrothermal Vent\nBoiling water erupts from cracks in the seafloor. Despite harsh conditions, bizarre life thrives here!`}
/>
<ScrollAnimal
  image="/images/limiting-factor.png"
  top={4050}
  left={1100}
  alt="Limiting Factor Sub"
  size={180}
  info={`DSV Limiting Factor\nVictor Vescovo used this sub to dive ~10,927m into the Mariana Trench — the deepest place on Earth.`}
/>

<ScrollAnimal
  image="/images/trench-cutaway.png"
  top={4080}
  left={800}
  alt="Trench Diagram"
  size={170}
  info={`Mariana Trench\nThis massive underwater canyon reaches 11km below the surface — deeper than Mount Everest is tall!`}
/>

<ScrollAnimal
  image="/images/pressure-burst.png"
  top={4120}
  left={450}
  alt="Crushing Pressure"
  size={160}
  info={`Crushing Pressure\nPressure here is over 1000x that at sea level. Even titanium bends — it’s the limit of exploration.`}
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
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
        }

        .zone-header {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .intro-message h1 { font-size: 2.5rem; }
          .intro-message h2 { font-size: 1.8rem; }
          .intro-message p { font-size: 1rem; }
          
          .infographics {
            gap: 30px;
          }
          
          .info-circle {
            width: 100px;
            height: 100px;
          }
          
          .bot-guide {
            right: 15px;
            flex-direction: column;
            gap: 10px;
          }
          
          .bot-character {
            width: 80px;
            height: 80px;
          }
          
          .speech-bubble {
            max-width: 250px;
            padding: 15px;
            font-size: 0.8rem;
            margin-right: 0;
            margin-bottom: 10px;
          }

          .speech-bubble::after {
            right: 50%;
            top: 100%;
            transform: translateX(50%);
            border: 10px solid transparent;
            border-top-color: rgba(255, 255, 255, 0.95);
            border-left-color: transparent;
          }
          
          .zone-content {
            margin-left: 120px;
            padding: 25px;
          }
          
          .zone-title {
            font-size: 1.8rem;
          }
          
          .zone-icon {
            font-size: 2.5rem;
            min-width: 60px;
          }

          .depth-label {
            font-size: 1rem;
            padding: 8px 16px;
          }

          .go-back-btn {
            padding: 15px 30px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HumanDivingGuide;