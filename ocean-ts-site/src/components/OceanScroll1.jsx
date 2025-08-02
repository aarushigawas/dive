import React, { useEffect, useState } from "react";
import "./OceanScroll1.css";
import ScrollAnimal from "./ScrollAnimal";

const oceanZones = [
  { name: "Sunlight Zone", start: 0, end: 200 },
  { name: "Twilight Zone", start: 200, end: 1000 },
  { name: "Midnight Zone", start: 1000, end: 4000 },
  { name: "Abyss Zone", start: 4000, end: 6000 },
  { name: "Upper Hadal", start: 6000, end: 8000 },
  { name: "Deep Hadal", start: 8000, end: 9000 },
  { name: "Trench Floor", start: 9000, end: 11000 },
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
  const scrollRatio = Math.min(Math.pow(rawRatio, 2.5), 1);
  const topColor = interpolateColor("#3178a1", "#023e7a", scrollRatio);
  const bottomColor = interpolateColor("#191970", "#000020", scrollRatio);
  const dynamicBackground = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;

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

    const headers = document.querySelectorAll(".zone-name, .depth-marker");
    headers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Calculate diver position (0m to 100m range) - only starts after video section
  const videoHeight = window.innerHeight; // Height of video section
  const adjustedScrollY = Math.max(0, scrollY - videoHeight); // Only count scroll after video
  const maxScroll = 3000; // More space for animals
  const diverDepth = Math.min((adjustedScrollY / maxScroll) * 100, 100);
  const diverPositionY = videoHeight + 100 + (diverDepth * 25); // Start after video + more space per meter
  const diverBobbing = Math.sin(scrollY / 30) * 3;

  return (
    <div
      className="ocean-scroll-container"
      style={{ background: dynamicBackground }}
    >
      {/* New Diver that goes from 0m to 100m - only shows after video */}
      {scrollY > videoHeight && (
        <div className="diver-depth-container">
          <img
            src="/diver.png"
            alt="Deep Sea Diver"
            className="scrolling-diver"
            style={{
              position: "fixed",
              top: `${100 + (diverDepth * 25) + diverBobbing}px`,
              left: "100px",
              width: "120px",
              transform: "scaleX(-1) rotate(10deg)",
              zIndex: 10,
            }}
          />
          
          {/* Depth indicator */}
          <div 
            className="depth-indicator"
            style={{
              position: "fixed",
              top: `${70 + (diverDepth * 25) + diverBobbing}px`,
              left: "240px",
              zIndex: 11,
            }}
          >
            {Math.round(diverDepth)}m
          </div>
        </div>
      )}
      
      {/* Depth scale markers from 0m to 100m - starts after video */}
      <div className="depth-scale" style={{ top: `${videoHeight + 50}px` }}>
        {Array.from({ length: 11 }).map((_, i) => {
          const depth = i * 10;
          const markerY = 50 + (depth * 25); // Much more space between markers
          return (
            <div
              key={i}
              className="scale-marker"
              style={{
                position: "absolute",
                top: `${markerY}px`,
                left: "50px",
              }}
            >
              <div className="marker-line"></div>
              <span className="marker-text">{depth}m</span>
            </div>
          );
        })}
      </div>

      {/* Ocean zones with much more space for animals */}
      {oceanZones.map((zone, index) => (
        <div 
          key={index} 
          className="ocean-zone"
          style={{
            marginTop: index === 0 ? `${videoHeight + 200}px` : '300px', // First zone starts after video
            minHeight: '800px', // Much more space for 10 animals per zone
          }}
        >
          <div className="zone-header">
            <div className="line-title">
              <div className="line"></div>
              <h2 className="zone-name">
                <span className="font-cursive gradient-text">
                  {zone.name.split(" ")[0]}
                </span>{" "}
                <span className="font-sans text-fade">
                  {zone.name.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <div className="line"></div>
            </div>
          </div>

          <div className="depth-markers">
            {Array.from({
              length:
                Math.ceil((Math.min(zone.end, 9000) - zone.start) / 100) + 1,
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

      {/* Animals with more spacing - you can add 10 animals per zone now */}
      <ScrollAnimal
        image="/parrotfish.png"
        top={videoHeight + 400}
        left={800}
        alt="Parrotfish"
        info={`Parrotfish\nParrotfish sleep in a bubble of their own mucus to protect themselves from predators.\n\nThey poop sand — their beak-like teeth crush coral, and the leftovers become the white sand on tropical beaches.`}
      />

      <ScrollAnimal
        image="/man_o_war.png"
        top={videoHeight + 320}
        left={600}
        alt="Portuguese Man o' War"
        info={`Portuguese Man o' War\nIt's made of four separate animals working together — one acts as the float, one stings, one digests, and one reproduces.\n\nIts long blue tentacles can stretch over 30 meters, delivering painful stings even after it's dead.`}
      />

      <ScrollAnimal
        image="/dolphin.png"
        top={videoHeight + 480}
        left={350}
        size={250}
        alt="BottleNose Dolphin"
        audio="/dolphin_noise.mp3"
        info={`BottleNose Dolphin\nBottlenose dolphins are highly intelligent marine mammals known for their complex social behavior, echolocation, and playful nature. They can swim up to 35 km/h and live in pods.\nBottlenose dolphins call each other by unique name-like whistles.`}
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