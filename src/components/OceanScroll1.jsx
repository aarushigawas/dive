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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function interpolateColor(color1, color2, factor) {
    const c1 = color1.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [0, 0, 0];
    const c2 = color2.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [0, 0, 0];
    const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  }

  const rawRatio = scrollY / scrollHeight;
  const scrollRatio = Math.min(Math.pow(rawRatio, 1.8), 1);
  
  // Enhanced ocean colors - smooth gradient transition
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
  
  // Enhanced diver motion with multiple wave patterns
  const time = scrollY / 100;
  const bobbing = Math.sin(time * 2) * 8 + Math.cos(time * 1.5) * 4;
  const sway = Math.sin(time * 0.8) * 15;
  const tilt = Math.sin(time * 1.2) * 3;
  
  // Determine if we're in an aphotic zone for flashlight effect
  const currentDepth = scrollY * 10;
  const isInAphoticZone = currentDepth > 1000;
  
  // Generate transparent bubbles
  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = Math.min(Math.floor(scrollY / 80), 25);
    
    for (let i = 0; i < bubbleCount; i++) {
      const delay = i * 0.4;
      const size = Math.random() * 25 + 8;
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

  // Generate floating particles for depth effect
  const generateParticles = () => {
    const particles = [];
    const particleCount = Math.min(Math.floor(scrollRatio * 30), 30);
    
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
      {/* Floating transparent bubbles */}
      <div className="bubbles-container">
        {generateBubbles()}
      </div>
      
      {/* Floating particles for depth effect */}
      <div className="particles-container">
        {generateParticles()}
      </div>
      
      {/* Flashlight effect ONLY for aphotic zones */}
      {isInAphoticZone && (
        <div 
          className="flashlight-effect"
          style={{
            top: `${scrollY + 50}px`,
          }}
        />
      )}
      
      {/* Caustic light patterns for shallow zones only */}
      {!isInAphoticZone && (
        <div className="caustic-lights">
          <div className="caustic-pattern caustic-1" />
          <div className="caustic-pattern caustic-2" />
          <div className="caustic-pattern caustic-3" />
        </div>
      )}

      {/* 🔵 Top 16:9 Intro Area with Messages */}
      <div className="intro-dive-area">
        <div className="intro-messages">
          <div className="intro-message message-1">
            <h2>🌊 Welcome to the Ocean Depths</h2>
            <p>Your underwater journey begins now...</p>
          </div>
          
          <div className="intro-message message-2">
            <h3>🤿 Prepare for Descent</h3>
            <p>Each zone holds unique mysteries and creatures</p>
          </div>
          
          <div className="intro-message message-3">
            <h3>📍 Current Depth: Surface Level</h3>
            <p>Scroll down to dive deeper into the unknown</p>
          </div>
          
          <div className="intro-message message-4">
            <div className="dive-indicator">
              <span>⬇️</span>
              <p>Start Scrolling to Dive</p>
              <span>⬇️</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🚢 Scrolling Diver with enhanced motion and animations */}
      <div className="diver-container">
        <img
          src="/diver.png"
          alt="Diver"
          className="scrolling-boat enhanced-diver animated-diver"
          style={{
            position: "absolute",
            top: `${boatDepthPx + bobbing}px`,
            left: `${20 + sway}px`,
            width: `${350}px`,
            transform: `rotate(${60 + tilt}deg)`,
            filter: isInAphoticZone ? 'brightness(0.7) contrast(1.2)' : 'brightness(1)',
          }}
        />
        
        {/* Diver bubble trail */}
        <div 
          className="diver-bubbles"
          style={{
            position: "absolute",
            top: `${boatDepthPx + bobbing + 40}px`,
            left: `${50 + sway}px`,
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
        top={1250}
        left={1130}
        alt="Parrotfish"
        size={160}
        info={`Parrotfish\nParrotfish sleep in a bubble of their own mucus to protect themselves from predators.\n\nThey poop sand — their beak-like teeth crush coral, and the leftovers become the white sand on tropical beaches.`}
      />

      <ScrollAnimal
        image="/man_o_war.png"
        top={1165}
        left={970}
        alt="Portuguese Man o' War"
        size={220}
        info={`Portuguese Man o' War\nIt's made of four separate animals working together — one acts as the float, one stings, one digests, and one reproduces.\n\nIts long blue tentacles can stretch over 30 meters, delivering painful stings even after it's dead.`}
      />

      <ScrollAnimal
        image="/dolphin.png"
        top={1130}
        left={730}
        size={250}
        alt="BottleNose Dolphin"
        audio="/dolphin_noise.mp3"
        info={`BottleNose Dolphin\nBottlenose dolphins are highly intelligent marine mammals known for their complex social behavior, echolocation, and playful nature. They can swim up to 35 km/h and live in pods.\n\nBottlenose dolphins call each other by unique name-like whistles.`}
      />

      <ScrollAnimal
  image="/seal.png"
  top={1180}
  left={380}
  size={170}
  alt="Seal"
  audio="/seal.mp3"
  info={`Seal\nSeals are semi-aquatic marine mammals with streamlined bodies and flippers.\n\nThey are agile swimmers and use blubber for warmth in cold waters.`}
/>

<ScrollAnimal
  image="/stingray.png"
  top={1050}
  left={1150}
  size={300}
  alt="Stingray"
  info={`Stingray\nStingrays are flat-bodied fish with venomous barbed tails used for defense.\n\nThey often bury themselves in sand to ambush prey.`}
/>
<ScrollAnimal
  image="/cephalopods.png"
  top={1100}
  left={540}
  size={220}
  alt="Cephalopods"
  info={`Cephalopods\nCephalopods include octopuses, squids, and cuttlefish.\n\nThey are known for their ability to change color and display intricate patterns for camouflage and communication.`}
/>
<ScrollAnimal
  image="/ribbon_eel.png"
  top={1280}
  left={520}
  size={180}
  alt="Ribbon Eel"
  info={`Ribbon Eel\nRibbon eels are colorful, snake-like fish known for their striking blue and yellow colors.\n\nThey live in sandy burrows and have a long, ribbon-like body.`}
/>
<ScrollAnimal
  image="/leafy_sea_dragon.png"
  top={1300}
  left={260}
  size={200}
  alt="Leafy Sea Dragon"
  info={`Leafy Sea Dragon\nLeafy sea dragons resemble floating seaweed for camouflage.\n\nThey are closely related to seahorses and move slowly using small fins.`}
/>
<ScrollAnimal
  image="/orca.png"
  top={1120}
  left={250}
  size={220}
  alt="Orca"
  audio="/whale.mp3"
  info={`Orca\nAlso known as killer whales, orcas are apex predators.\n\nThey live in pods and use sophisticated hunting techniques and vocal communication.`}
/>
<ScrollAnimal
  image="/sea_turtle.png"
  top={1300}
  left={680}
  size={220}
  alt="Sea Turtle"
  info={`Sea Turtle\nSea turtles are ancient reptiles that live in oceans around the world.\n\nThey are known for long migrations and a hard shell for protection.`}
/>


<ScrollAnimal
  image="/hermit_crab.png"
  top={1350}
  left={1200}
  size={180}
  alt="Hermit Crab"
  info={`Hermit Crab\nHermit crabs are small crustaceans that protect their soft abdomens by living inside empty shells.\n\nThey switch shells as they grow and are known for their scavenging behavior.`}
/>
<>
  <ScrollAnimal
    image="/Deepwater Octopus (e.g. Graneledone).png"
    top={1550}
    left={700}
    size={230}
    alt="Deepwater Octopus"
    info={`Deepwater Octopus (e.g. Graneledone)\nThese deep-sea octopuses lack ink sacs and adapt to extreme cold and pressure in the deep ocean.`}
  />

  <ScrollAnimal
    image="/Flabby Whalefish.png"
    top={1560}
    left={300}
    size={220}
    alt="Flabby Whalefish"
    info={`Flabby Whalefish\nKnown for their soft, gelatinous bodies, these fish live at extreme depths and undergo major changes during growth.`}
  />

  <ScrollAnimal
    image="/Chimaera (Ghost Shark).png"
    top={1640}
    left={350}
    size={300}
    alt="Chimaera"
    info={`Chimaera (Ghost Shark)\nDeep-sea relatives of sharks with long tails and sensory organs on their snouts.`}
  />

  <ScrollAnimal
    image="/Cookiecutter Shark.png"
    top={1600}
    left={950}
    size={220}
    alt="Cookiecutter Shark"
    info={`Cookiecutter Shark\nThese sharks remove round plugs of flesh from larger animals and glow to lure prey.`}
  />

  <ScrollAnimal
    image="/Zombie Worms (Osedax).png"
    top={1760}
    left={750}
    size={240}
    alt="Zombie Worms"
    info={`Zombie Worms (Osedax)\nThese worms feed on the bones of dead whales and use symbiotic bacteria to digest fats.`}
  />

  <ScrollAnimal
    image="/Pelican Eel (Gulper Eel).png"
    top={1800}
    left={220}
    size={350}
    alt="Pelican Eel"
    info={`Pelican Eel (Gulper Eel)\nThese eels have enormous mouths used to gulp prey whole, even larger than their body.`}
  />

  <ScrollAnimal
    image="/Comb Jellies.png"
    top={1850}
    left={1100}
    size={190}
    alt="Comb Jellies"
    info={`Comb Jellies\nThese gelatinous animals use rows of cilia for swimming and often glow with bioluminescence.`}
  />

  <ScrollAnimal
    image="/Glass Squid.png"
    top={1900}
    left={530}
    size={300}
    alt="Glass Squid"
    info={`Glass Squid\nTransparent deep-sea squid that use bioluminescence to avoid predators.`}
  />

  <ScrollAnimal
    image="/Stomiidae.png"
    top={2020}
    left={390}
    size={250}
    alt="Stomiidae"
    info={`Stomiidae (Barbeled Dragonfish)\nPredators with fang-like teeth and light-producing organs to lure prey in the dark depths.`}
  />

  <ScrollAnimal
    image="/Viperfish.png"
    top={1930}
    left={770}
    size={240}
    alt="Viperfish"
    info={`Viperfish\nOne of the fiercest deep-sea predators, with long fangs and a light organ to attract prey.`}
  />

  <ScrollAnimal
    image="/Bristlemouth.png"
    top={2050}
    left={950}
    size={300}
    alt="Bristlemouth"
    info={`Bristlemouth\nPossibly the most abundant vertebrate on Earth. Small fish with light-producing organs and bristle-like teeth.`}
  />

  <ScrollAnimal
    image="/Lanternfish.png"
    top={2160}
    left={650}
    size={220}
    alt="Lanternfish"
    info={`Lanternfish\nA key part of the deep-sea food chain, lanternfish use bioluminescent photophores to communicate and blend in.`}
  />
</>
<>
  <ScrollAnimal
    image="/Great_white_shark.png"
    top={1300}
    left={890}
    size={230}
    alt="Great White Shark"
    audio="/great_white_shark_sound.mp3"
    info={`Great White Shark\nOne of the largest predatory fish, known for powerful jaws and acute senses.`}
  />

  <ScrollAnimal
    image="/Yeti Crab.png"
    top={2400}
    left={300}
    size={205}
    alt="Yeti Crab"
    audio="/yeti_crab_sound.mp3"
    info={`Yeti Crab\nA deep-sea crab with hairy claws that cultivate bacteria for food.`}
  />

  <ScrollAnimal
    image="/Barreleye.png"
    top={2440}
    left={850}
    size={220}
    alt="Barreleye"
    audio="/barreleye_sound.mp3"
    info={`Barreleye\nTransparent-headed fish with upward-facing tubular eyes to spot prey in the dark.`}
  />

  <ScrollAnimal
    image="/Zombie Shrimp (Rimicaris).png"
    top={2480}
    left={580}
    size={240}
    alt="Zombie Shrimp"
    audio="/zombie_shrimp_sound.mp3"
    info={`Zombie Shrimp (Rimicaris)\nFound near hydrothermal vents, they survive via symbiotic bacteria in their gills.`}
  />

  <ScrollAnimal
    image="/Deep-sea Hatchetfish.png"
    top={2600}
    left={1100}
    size={220}
    alt="Hatchetfish"
    audio="/hatchetfish_sound.mp3"
    info={`Deep-sea Hatchetfish\nNamed for their hatchet shape, they use counter-illumination to avoid predators.`}
  />

  <ScrollAnimal
    image="/Rattail_fish.png"
    top={2610}
    left={280}
    size={300}
    alt="Grenadier"
    audio="/grenadier_sound.mp3"
    info={`Grenadier (Rattail Fish)\nLong-tailed deep-sea fish with large heads and slow metabolism.`}
  />

  <ScrollAnimal
    image="/Benthocodon.png"
    top={2650}
    left={790}
    size={270}
    alt="Benthoctodon"
    audio="/benthoctodon_sound.mp3"
    info={`Benthoctodon\nA genus of deep-sea comb jellies that use bioluminescence in dark waters.`}
  />

  <ScrollAnimal
    image="/Faceless Fish.png"
    top={2790}
    left={560}
    size={250}
    alt="Faceless Fish"
    audio="/faceless_fish_sound.mp3"
    info={`Faceless Fish\nRare deep-sea fish with no visible eyes or mouth, adapted to pitch-black depths.`}
  />

  <ScrollAnimal
    image="/Dumbo Octopus.png"
    top={2820}
    left={1000}
    size={300}
    alt="Dumbo Octopus"
    audio="/dumbo_octopus_sound.mp3"
    info={`Dumbo Octopus\nNamed for its ear-like fins, this soft-bodied octopus glides through deep-sea currents.`}
  />

  <ScrollAnimal
    image="/Giant Amphipod.png"
    top={2930}
    left={300}
    size={220}
    alt="Giant Amphipod"
    audio="/amphipod_sound.mp3"
    info={`Giant Amphipod\nA crustacean scavenger found in the deepest parts of the ocean, over 9 cm long.`}
  />

  <ScrollAnimal
    image="/Tripod Fish.png"
    top={3000}
    left={800}
    size={220}
    alt="Tripod Fish"
    audio="/tripod_fish_sound.mp3"
    info={`Tripod Fish\nUses elongated fins to 'stand' on the seafloor and face into currents to feed.`}
  />

  <ScrollAnimal
    image="/Black Swallower.png"
    top={3150}
    left={550}
    size={300}
    alt="Black Swallower"
    audio="/black_swallower_sound.mp3"
    info={`Black Swallower\nCan consume prey much larger than itself thanks to an expandable stomach.`}
  />

  <ScrollAnimal
    image="/Deep-sea Lizardfish.png"
    top={3200}
    left={1050}
    size={330}
    alt="Deep-sea Lizardfish"
    audio="/lizardfish_sound.mp3"
    info={`Deep-sea Lizardfish\nLong, predatory fish with needle-like teeth and light-producing organs.`}
  />

  <ScrollAnimal
    image="/Anglerfish (female).png"
    top={3300}
    left={300}
    size={220}
    alt="Anglerfish"
    audio="/anglerfish_sound.mp3"
    info={`Anglerfish (female)\nFamous for their glowing lure used to attract prey in the dark ocean.`}
  />
</>

<ScrollAnimal
  image="/Basket Star.png"
  top={3400}
  left={700}
  size={300}
  alt="Basket Star"
  audio="/basket_star_sound.mp3"
  info={`Basket Star\nA deep-sea brittle star with arms that branch like coral and unfurl to trap drifting plankton.`}
/>

<ScrollAnimal
  image="/Sea Spider.png"
  top={3550}
  left={300}
  size={300}
  alt="Sea Spider"
  audio="/sea_spider_sound.mp3"
  info={`Sea Spider\nNot a true spider, but a leggy marine crawler that thrives in crushing deep-sea pressure.`}
/>

<ScrollAnimal
  image="/Blobfish.png"
  top={3620}
  left={1050}
  size={270}
  alt="Blobfish"
  audio="/blobfish_sound.mp3"
  info={`Blobfish\nDeep-sea dweller with a gelatinous body, adapted to survive the immense pressure of the midnight zone.`}
/>

<ScrollAnimal
  image="/Bigfin Squid.png"
  top={3700}
  left={560}
  size={500}
  alt="Bigfin Squid"
  audio="/bigfin_squid_sound.mp3"
  info={`Bigfin Squid\nElbowed limbs that stretch over 6 meters long, drifting like drapes through the deep sea.`}
/>

<ScrollAnimal
  image="/Sperm Whale.png"
  top={4000}
  left={300}
  size={420}
  alt="Sperm Whale"
  audio="/sperm_whale_clicks.mp3"
  info={`Sperm Whale\nThe deepest-diving mammal, known to hunt giant squid at depths over 3000 meters.`}
/>

<ScrollAnimal
  image="/Colossal Squid.png"
  top={4200}
  left={900}
  size={350}
  alt="Colossal Squid"
  audio="/colossal_squid_sound.mp3"
  info={`Colossal Squid\nHeavier than the giant squid, with massive hooks on tentacles. Rarely seen, lives in Antarctic depths.`}
/>

<ScrollAnimal
  image="/Giant Squid (Architeuthis dux).png"
  top={4350}
  left={350}
  size={300}
  alt="Giant Squid"
  audio="/giant_squid_sound.mp3"
  info={`Giant Squid (Architeuthis dux)\nA legend of the deep. Its enormous eyes spot prey in the blackness of the ocean.`}
/>

<ScrollAnimal
  image="/Japanese Spider Crab.png"
  top={4600}
  left={570}
  size={300}
  alt="Japanese Spider Crab"
  audio="/spider_crab_crawl.mp3"
  info={`Japanese Spider Crab\nWorld’s largest arthropod by leg span — up to 3.7 meters. Creeps across deep seafloors like a monster.`}
/>
<ScrollAnimal
  image="/Cusk Eel.png"
  top={4500}
  left={900}
  size={280}
  alt="Cusk Eel"
  audio="/cusk_eel_sound.mp3"
  info={`Cusk Eel\nA long-bodied deep-sea fish that glides near the sea floor. Often found near vents, it looks both ancient and eerie.`}
/>

<ScrollAnimal
  image="/Snailfish.png"
  top={4730}
  left={320}
  size={300}
  alt="Snailfish"
  audio="/snailfish_sound.mp3"
  info={`Snailfish\nThe softest, deepest-living fish ever discovered. Its gelatinous body helps it survive intense pressure.`}
/>

<ScrollAnimal
  image="/Pancake Urchin.png"
  top={5000}
  left={600}
  size={270}
  alt="Pancake Urchin"
  audio="/pancake_urchin_sound.mp3"
  info={`Pancake Urchin\nA flat deep-sea urchin that glows faintly and crawls silently over abyssal plains like a living saucer.`}
/>

<ScrollAnimal
  image="/Bearded Sea Devil.png"
  top={4870}
  left={950}
  size={270}
  alt="Bearded Sea Devil"
  audio="/bearded_sea_devil_sound.mp3"
  info={`Bearded Sea Devil\nA terrifying deep anglerfish with glowing lures and creepy facial filaments. Extremely rare and ghost-like.`}
/>


<ScrollAnimal
  image="/Abyssal Anemone.png"
  top={5300}
  left={320}
  size={215}
  alt="Abyssal Anemone"
  audio="/abyssal_anemone_sound.mp3"
  info={`Abyssal Anemone\nAnchored to the trench floor, it survives in total darkness.\nSoft tentacles catch drifting food in freezing water.`}
/>

<ScrollAnimal
  image="/Abyssal Spiderfish.png"
  top={5310}
  left={760}
  size={350}
  alt="Abyssal Spiderfish"
  audio="/abyssal_spiderfish_sound.mp3"
  info={`Abyssal Spiderfish\nLong-finned hunter with sharp teeth.\nAmbushes prey while gliding silently over the deep seafloor.`}
/>

<ScrollAnimal
  image="/Psychropotes longicauda.png"
  top={5460}
  left={430}
  size={340}
  alt="Psychropotes longicauda"
  audio="/psychropotes_sound.mp3"
  info={`Psychropotes longicauda\nCalled the 'headless chicken monster'.\nA floating sea cucumber that swims using its fin-like tail.`}
/>

<ScrollAnimal
  image="/Abyssal Dumbo Octopus.png"
  top={5600}
  left={1100}
  size={260}
  alt="Abyssal Dumbo Octopus"
  audio="/dumbo_octopus_sound.mp3"
  info={`Abyssal Dumbo Octopus\nIts ear-like fins help it flap through the abyss.\nOne of the cutest yet rare deep-sea dwellers.`}
/>

<ScrollAnimal
  image="/Abyssal Holothurian.png"
  top={5700}
  left={240}
  size={360}
  alt="Abyssal Holothurian"
  audio="/abyssal_holothurian_sound.mp3"
  info={`Abyssal Holothurian\nA type of deep-sea sea cucumber.\nCrawls the ocean floor, feeding on organic-rich sediment.`}
/>

<ScrollAnimal
  image="/Eelpout.png"
  top={5680}
  left={750}
  size={270}
  alt="Eelpout"
  audio="/eelpout_sound.mp3"
  info={`Eelpout\nEel-shaped fish adapted to extreme pressure.\nIts body produces antifreeze proteins for survival.`}
/>



<ScrollAnimal
  image="/Eurythenes plasticus_8000.png"
  top={7300}
  left={380}
  size={250}
  alt="Eurythenes plasticus"
  audio="/eurythenes_plasticus_sound.mp3"
  info={`Eurythenes plasticus\nFound 8,000m deep with plastic in its gut.\nA shocking sign of human impact reaching trench depths.`}
/>

<ScrollAnimal
  image="/Hirondellea gigas.png"
  top={5930}
  left={600}
  size={230}
  alt="Hirondellea gigas"
  audio="/hirondellea_gigas_sound.mp3"
  info={`Hirondellea gigas\nA trench-dwelling amphipod with aluminum armor.\nFeeds on wood, bones, and even carcasses at hadal depths.`}
/>

<ScrollAnimal
  image="/Abyssal Ctenophore.png"
  top={6100}
  left={740}
  size={270}
  alt="Abyssal Ctenophore"
  audio="/abyssal_ctenophore_sound.mp3"
  info={`Abyssal Ctenophore\nA glowing jelly-like creature.\nPulses with shimmering cilia in pitch-black waters.`}
/>

<ScrollAnimal
  image="/Scotoplanes.png"
  top={6000}
  left={350}
  size={270}
  alt="Scotoplanes"
  audio="/scotoplanes_sound.mp3"
  info={`Scotoplanes\nAlso called sea pigs, they crawl in herds.\nUse snouts and legs to search the deep mud for nutrients.`}
/>

<ScrollAnimal
  image="/Slime Starfish.png"
  top={5840}
  left={1140}
  size={260}
  alt="Slime Starfish"
  audio="/slime_starfish_sound.mp3"
  info={`Slime Starfish\nSoft-bodied, brightly colored starfish that oozes mucus when disturbed. Crawls slowly across abyssal mud.`}
/>

<ScrollAnimal
  image="/Abyssal Xenophyophore.png"
  top={6200}
  left={530}
  size={460}
  alt="Abyssal Xenophyophore"
  audio="/abyssal_xeno_sound.mp3"
  info={`Abyssal Xenophyophore\nGiant single-celled organism that creates intricate sediment shells. Dominant lifeform on abyssal plains.`}
/>

<ScrollAnimal
  image="/Macrourid Rattail.png"
  top={6350}
  left={980}
  size={300}
  alt="Macrourid Rattail"
  audio="/rattail_sound.mp3"
  info={`Macrourid Rattail\nDeep abyssal fish with huge olfactory bulbs to detect prey. Constantly prowls above the seafloor.`}
/>

<ScrollAnimal
  image="/Abyssal Tunicate.png"
  top={6500}
  left={640}
  size={270}
  alt="Abyssal Tunicate"
  audio="/abyssal_tunicate_sound.mp3"
  info={`Abyssal Tunicate\nFilter-feeding sea squirt that resembles a soft bulb. Lives embedded in mud, nearly transparent.`}
/>

<ScrollAnimal
  image="/(Nemertea.png"
  top={6670}
  left={320}
  size={230}
  alt="Nemertea"
  audio="/ribbon_worm_sound.mp3"
  info={`Nemertea (Ribbon Worm)\nLong, elastic worm that hides under rocks or sediment. Uses a proboscis to capture prey.`}
/>
<ScrollAnimal
  image="/Abyssal Scaly-foot Snail.png"
  top={6650}
  left={1070}
  size={300}
  alt="Scaly-foot Snail"
  audio="/scaly_foot_snail_sound.mp3"
  info={`Scaly-foot Snail\nUnique snail armored with iron scales. Found only in extreme abyssal hydrothermal vent fields.`}
/>

<ScrollAnimal
  image="/Deep-sea Lollipop Sea Pen.png"
  top={6800}
  left={780}
  size={270}
  alt="Lollipop Sea Pen"
  audio="/sea_pen_sound.mp3"
  info={`Lollipop Sea Pen\nBioluminescent colony that looks like a glowing lollipop. Stays rooted to abyssal plains.`}
/>

<ScrollAnimal
  image="/Abyssal Venus Flytrap Anemone.png"
  top={6900}
  left={480}
  size={270}
  alt="Venus Flytrap Anemone"
  audio="/venus_flytrap_sound.mp3"
  info={`Venus Flytrap Anemone\nUnusual deep-sea anemone that captures food like a carnivorous plant. Found in abyssal plains.`}
/>

<ScrollAnimal
  image="/Abyssal Feather Star.png"
  top={6960}
  left={1000}
  size={240}
  alt="Feather Star"
  audio="/feather_star_sound.mp3"
  info={`Feather Star\nFree-floating echinoderm with feathery arms. Drifts above the abyssal seafloor like a living flower.`}
/>

<ScrollAnimal
  image="/Hadal DragonFish.png"
  top={7250}
  left={920}
  size={300}
  alt="Hadal DragonFish"
  audio="/hadal_dragonfish_sound.mp3"
  info={`Hadal DragonFish\nA rare predator with long fangs and light organs adapted for deep trench hunting.`}
/>

<ScrollAnimal
  image="/Trench Holothurian.png"
  top={7350}
  left={750}
  size={300}
  alt="Trench Holothurian"
  audio="/trench_holothurian_sound.mp3"
  info={`Trench Holothurian\nA soft-bodied sea cucumber that roams the trench floor, absorbing nutrients from sediment.`}
/>

<ScrollAnimal
  image="/Hadal Polychaete with Bioluminescent Bristles.png"
  top={7550}
  left={320}
  size={230}
  alt="Hadal Polychaete"
  audio="/hadal_polychaete_sound.mp3"
  info={`Hadal Polychaete\nIts glowing bristles flash blue light to deter predators in the trench depths.`}
/>

<ScrollAnimal
  image="/Blind Hadal Sea Spider.png"
  top={7600}
  left={1100}
  size={250}
  alt="Blind Hadal Sea Spider"
  audio="/hadal_sea_spider_sound.mp3"
  info={`Blind Hadal Sea Spider\nLong-limbed and eyeless, this sea spider walks silently across the trench bottom.`}
/>

<ScrollAnimal
  image="/Hadal Scavenger Eelpout.png"
  top={7530}
  left={1040}
  size={240}
  alt="Hadal Scavenger Eelpout"
  audio="/hadal_eelpout_sound.mp3"
  info={`Hadal Scavenger Eelpout\nFeeds on decaying matter in the upper hadal zone, using enhanced pressure sensors.`}
/>

<ScrollAnimal
  image="/Deep Trench Glass Sponge.png"
  top={7900}
  left={900}
  size={225}
  alt="Deep Trench Glass Sponge"
  audio="/glass_sponge_sound.mp3"
  info={`Deep Trench Glass Sponge\nSilica-based body with a lattice design, anchored to trench walls.`}
/>

<ScrollAnimal
  image="/Trench Amphipod.png"
  top={7950}
  left={430}
  size={270}
  alt="Trench Amphipod"
  audio="/trench_amphipod_sound.mp3"
  info={`Trench Amphipod\nTiny but resilient, this amphipod survives immense trench pressure.`}
/>

<ScrollAnimal
  image="/Mariana Mud Shrimp.png"
  top={7740}
  left={600}
  size={280}
  alt="Mariana Mud Shrimp"
  audio="/mud_shrimp_sound.mp3"
  info={`Mariana Mud Shrimp\nBurrows into soft trench sediment, possibly endemic to the Mariana Trench.`}
/>

<ScrollAnimal
  image="/Paraliparis hada.png"
  top={8150}
  left={850}
  size={250}
  alt="Paraliparis hada"
  audio="/paraliparis_hada_sound.mp3"
  info={`Paraliparis hada\nA translucent snailfish found at hadal depths with a soft, pressure-tolerant body.`}
/>

<ScrollAnimal
  image="/Hadal Isopod.png"
  top={8200}
  left={700}
  size={320}
  alt="Hadal Isopod"
  audio="/hadal_isopod_sound.mp3"
  info={`Hadal Isopod\nA giant scavenger crustacean that thrives under extreme pressure.`}
/>

<ScrollAnimal
  image="/Trench Cusk-Eel.png"
  top={8390}
  left={330}
  size={260}
  alt="Trench Cusk-Eel"
  audio="/trench_cuskeel_sound.mp3"
  info={`Trench Cusk-Eel\nHolds the record for deepest-living fish, found near trench bottoms.`}
/>

<ScrollAnimal
  image="/Hadal Cephalopod.png"
  top={8400}
  left={880}
  size={340}
  alt="Hadal Cephalopod"
  audio="/hadal_cephalopod_sound.mp3"
  info={`Hadal Cephalopod\nA deep-sea octopod relative with large fins and soft gelatinous body.`}
/>

<ScrollAnimal
  image="/Hadal Enigma Worm (Polychaete sp.).png"
  top={8650}
  left={690}
  size={240}
  alt="Hadal Enigma Worm"
  audio="/enigma_worm_sound.mp3"
  info={`Hadal Enigma Worm\nStill unnamed, this mysterious worm lives burrowed in deep trench mud.`}
/>

<ScrollAnimal
  image="/Hadal Snailfish.png"
  top={8800}
  left={330}
  size={300}
  alt="Hadal Snailfish"
  audio="/hadal_snailfish_sound.mp3"
  info={`Hadal Snailfish\nPossibly the most pressure-resistant fish, spotted in multiple hadal trenches.`}
/>

<ScrollAnimal
  image="/Trench Gobyfish.png"
  top={8800}
  left={950}
  size={300}
  alt="Trench Gobyfish"
  audio="/trench_gobyfish_sound.mp3"
  info={`Trench Gobyfish\nClings to steep trench walls with suction-like fins, adapted for vertical life.`}
/>

<ScrollAnimal
  image="/Trench Mysid Shrimp.png"
  top={8930}
  left={650}
  size={220}
  alt="Trench Mysid Shrimp"
  audio="/trench_mysid_sound.mp3"
  info={`Trench Mysid Shrimp\nFast-moving and often in swarms, these shrimp dominate hadal trenches.`}
/>

<ScrollAnimal
  image="/Black Sea Devil.png"
  top={9300}
  left={300}
  size={300}
  alt="Black Sea Devil"
  audio="/black_sea_devil.mp3"
  info={`Black Sea Devil\nA deep-sea anglerfish with a bioluminescent lure to attract prey in darkness.`}
/>

<ScrollAnimal
  image="/Paraliparis manduriensis.png"
  top={9400}
  left={1100}
  size={270}
  alt="Paraliparis mandurriensis"
  audio="/paraliparis_mandurriensis.mp3"
  info={`Paraliparis mandurriensis\nA type of snailfish adapted to extreme trench pressures.`}
/>

<ScrollAnimal
  image="/Careproctus profundicola.png"
  top={9500}
  left={660}
  size={300}
  alt="Careproctus profundicola"
  audio="/careproctus_profundicola.mp3"
  info={`Careproctus profundicola\nA soft-bodied fish found in deep cold waters of the Pacific.`}
/>

<ScrollAnimal
  image="/Paraliparis bathybius.png"
  top={9600}
  left={400}
  size={260}
  alt="Paraliparis bathybius"
  audio="/paraliparis_bathybius.mp3"
  info={`Paraliparis bathybius\nLives at abyssal depths, navigating with sensitive lateral lines.`}
/>

<ScrollAnimal
  image="/Liparid Sp. CT9901.png"
  top={9620}
  left={990}
  size={240}
  alt="Liparid Sp. CT9901"
  audio="/liparid_sp_ct9901.mp3"
  info={`Liparid Sp. CT9901\nUndescribed deep-sea snailfish species identified from hadal zones.`}
/>

<ScrollAnimal
  image="/Echiodon neotes (Deep Pearlfish).png"
  top={9890}
  left={300}
  size={220}
  alt="Echiodon neotes"
  audio="/echiodon_neotes.mp3"
  info={`Echiodon neotes (Deep Pearlfish)\nA slender fish known to inhabit extreme depths and sometimes hide inside invertebrates.`}
/>

<ScrollAnimal
  image="/Notoliparis kermadecensi.png"
  top={9700}
  left={700}
  size={300}
  alt="Notoliparis kermadecensi"
  audio="/notoliparis_kermadecensi.mp3"
  info={`Notoliparis kermadecensi\nA hadal snailfish native to the Kermadec Trench region.`}
/>

<ScrollAnimal
  image="/Pseudoliparis belyaevi.png"
  top={9800}
  left={1000}
  size={350}
  alt="Pseudoliparis belyaevi"
  audio="/pseudoliparis_belyaevi.mp3"
  info={`Pseudoliparis belyaevi\nOne of the world’s deepest-living fish, recorded below 8000 meters.`}
/>

<ScrollAnimal
  image="/Pseudoliparis swirei (Mariana Snailfish).png"
  top={10000}
  left={680}
  size={250}
  alt="Pseudoliparis swirei"
  audio="/pseudoliparis_swirei.mp3"
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