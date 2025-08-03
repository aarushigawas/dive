import React,{useEffect,useState} from "react";
import "./BubbleTransition.css";

const BubbleTransition=({onComplete})=>
{
  const [isAnimating,setIsAnimating]=useState(false);
  
  useEffect(()=>
  {
    setIsAnimating(true);
    
    const timer=setTimeout(()=>
    {
      onComplete();
    },3000);
    
    return ()=>clearTimeout(timer);
  },[onComplete]);
  
  const generateBubbleWaves=()=>
  {
    const waves=[];
    const waveCount=5;
    
    for(let wave=0;wave<waveCount;wave++)
    {
      const bubblesInWave=[];
      const bubblesPerWave=12;
      
      for(let i=0;i<bubblesPerWave;i++)
      {
        const delay=wave*0.3+i*0.1;
        const size=Math.random()*60+20;
        const startX=Math.random()*window.innerWidth;
        const endX=startX+(Math.random()-0.5)*200;
        const opacity=Math.random()*0.8+0.2;
        
        bubblesInWave.push(
          <div
            key={`${wave}-${i}`}
            className="transition-bubble"
            style={{
              left:`${startX}px`,
              animationDelay:`${delay}s`,
              width:`${size}px`,
              height:`${size}px`,
              opacity:opacity,
              '--end-x':`${endX}px`,
            }}
          />
        );
      }
      
      waves.push(
        <div key={wave} className="bubble-wave">
          {bubblesInWave}
        </div>
      );
    }
    
    return waves;
  };
  
  return(
    <div className={`bubble-transition-container ${isAnimating?'animating':''}`}>
      <div className="transition-background"/>
      
      <div className="bubble-layers">
        {generateBubbleWaves()}
      </div>
      
      <div className="diving-text">
        <h2>Diving Deep...</h2>
        <div className="diving-dots">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      </div>
      
      <div className="water-ripples">
        <div className="ripple ripple-1"></div>
        <div className="ripple ripple-2"></div>
        <div className="ripple ripple-3"></div>
      </div>
    </div>
  );
};

export default BubbleTransition;