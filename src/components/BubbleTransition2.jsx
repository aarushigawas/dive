import React,{useEffect,useState} from "react";
import "./BubbleTransition2.css";

const BubbleTransition2=({onComplete})=>
{
  const [isAnimating,setIsAnimating]=useState(false);
  const [phase,setPhase]=useState(0);

  useEffect(()=>
  {
    setIsAnimating(true);
    
    const phaseTimer1=setTimeout(()=>setPhase(1),800);
    const phaseTimer2=setTimeout(()=>setPhase(2),2000);
    
    const completeTimer=setTimeout(()=>
    {
      onComplete();
    },3500);

    return ()=>
    {
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(completeTimer);
    };
  },[onComplete]);

  const generateSpiralBubbles=()=>
  {
    const bubbles=[];
    const spiralCount=3;
    const bubblesPerSpiral=15;
    
    for(let spiral=0;spiral<spiralCount;spiral++)
    {
      for(let i=0;i<bubblesPerSpiral;i++)
      {
        const angle=(i/bubblesPerSpiral)*Math.PI*4+(spiral*Math.PI*2/spiralCount);
        const radius=50+i*15;
        const delay=spiral*0.2+i*0.1;
        const size=Math.random()*40+15;
        
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;
        
        const startX=centerX+Math.cos(angle)*radius;
        const startY=centerY+Math.sin(angle)*radius;
        
        bubbles.push(
          <div
            key={`spiral-${spiral}-${i}`}
            className="spiral-bubble"
            style={{
              left:`${startX}px`,
              top:`${startY}px`,
              animationDelay:`${delay}s`,
              width:`${size}px`,
              height:`${size}px`,
              '--spiral-angle':`${angle}rad`,
              '--spiral-radius':`${radius}px`,
            }}
          />
        );
      }
    }
    
    return bubbles;
  };

  const generateDepthParticles=()=>
  {
    const particles=[];
    const particleCount=25;
    
    for(let i=0;i<particleCount;i++)
    {
      const delay=Math.random()*2;
      const duration=Math.random()*3+2;
      const startX=Math.random()*window.innerWidth;
      const size=Math.random()*6+2;
      
      particles.push(
        <div
          key={`particle-${i}`}
          className="depth-particle"
          style={{
            left:`${startX}px`,
            animationDelay:`${delay}s`,
            animationDuration:`${duration}s`,
            width:`${size}px`,
            height:`${size}px`,
          }}
        />
      );
    }
    
    return particles;
  };

  return(
    <div className={`bubble-transition2-container ${isAnimating?'animating':''} phase-${phase}`}>
      <div className="transition2-background">
        <div className="depth-layer layer-1"></div>
        <div className="depth-layer layer-2"></div>
        <div className="depth-layer layer-3"></div>
      </div>
      
      <div className="spiral-bubble-container">
        {generateSpiralBubbles()}
      </div>
      
      <div className="depth-particles-container">
        {generateDepthParticles()}
      </div>
      
      <div className="central-vortex">
        <div className="vortex-ring ring-1"></div>
        <div className="vortex-ring ring-2"></div>
        <div className="vortex-ring ring-3"></div>
        <div className="vortex-ring ring-4"></div>
      </div>
      
      <div className="transition2-text">
        <div className="text-phase phase-0">
          <h2>Suiting Up for Deep Sea</h2>
          <div className="loading-bar">
            <div className="loading-fill"></div>
          </div>
        </div>
        
        <div className="text-phase phase-1">
          <h2>Descending with Equipment...</h2>
          <div className="depth-counter">
            <span className="depth-number">0</span>
            <span className="depth-unit">m</span>
          </div>
        </div>
        
        <div className="text-phase phase-2">
          <h2>Welcome to Deep-Sea Technology</h2>
          <div className="ready-indicator">⚓</div>
        </div>
      </div>
      
      <div className="light-rays">
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
        <div className="light-ray ray-4"></div>
        <div className="light-ray ray-5"></div>
      </div>
    </div>
  );
};

export default BubbleTransition2;