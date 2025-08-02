// src/hooks/useOceanScroll.js
import { useEffect, useState } from "react";

export const useOceanScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial values

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const interpolateColor = (color1, color2, factor) => {
    const c1 = color1.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [0, 0, 0];
    const c2 = color2.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [0, 0, 0];
    const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  const rawRatio = scrollY / scrollHeight;
  const scrollRatio = Math.min(Math.pow(rawRatio, 2.5), 1);
  const topColor = interpolateColor("#3178a1", "#023e7a", scrollRatio);
  const bottomColor = interpolateColor("#191970", "#000020", scrollRatio);
  const background = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;

  const boatY = scrollY + 130 + Math.sin(scrollY / 50) * 5;

  return {
    scrollY,
    background,
    boatY,
  };
};
