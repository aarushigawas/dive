import React, { useState } from 'react';
import './App.css';

// Import components
import DeepDiving from './components/DeepDiving.jsx';
import IntroCard from './components/IntroCard.jsx';
import IntroCard2 from './components/IntroCard2.jsx';
import BubbleTransition from './components/BubbleTransition.jsx';
import BubbleTransition2 from './components/BubbleTransition2.jsx';
import OceanScroll1 from './components/OceanScroll1.jsx';
import OceanScroll2 from './components/OceanScroll2.jsx';

function App() {
  const [currentView, setCurrentView] = useState('deepdiving');

  // Handle navigation from DeepDiving
  const handleExploreAnimals = () => {
    setCurrentView('intro');
  };

  const handleExploreSuits = () => {
    setCurrentView('intro2');
  };

  // Handle dive start from IntroCard (animals)
  const handleStartDive = () => {
    setCurrentView('transition');
  };

  // Handle dive start from IntroCard2 (suits)
  const handleStartDive2 = () => {
    setCurrentView('transition2');
  };

  // Handle transition completion for animals
  const handleTransitionComplete = () => {
    setCurrentView('ocean1');
  };

  // Handle transition completion for suits
  const handleTransitionComplete2 = () => {
    setCurrentView('ocean2');
  };

  // Handle back navigation
  const handleBackToDeepDiving = () => {
    setCurrentView('deepdiving');
  };

  const handleBackToIntro = () => {
    setCurrentView('intro');
  };

  const handleBackToIntro2 = () => {
    setCurrentView('intro2');
  };

  return (
    <div className="App">
      {currentView === 'deepdiving' && (
        <DeepDiving
          onExploreAnimals={handleExploreAnimals}
          onExploreSuits={handleExploreSuits}
        />
      )}

      {currentView === 'intro' && (
        <IntroCard
          onStartDive={handleStartDive}
          onBackToDeepDiving={handleBackToDeepDiving}
          videoSrc="/whales.mp4"
        />
      )}

      {currentView === 'intro2' && (
        <IntroCard2
          onStartDive={handleStartDive2}
          onBackToDeepDiving={handleBackToDeepDiving}
          videoSrc="/intro2.mp4"
        />
      )}

      {currentView === 'transition' && (
        <BubbleTransition onComplete={handleTransitionComplete} />
      )}

      {currentView === 'transition2' && (
        <BubbleTransition2 onComplete={handleTransitionComplete2} />
      )}

      {currentView === 'ocean1' && (
        <OceanScroll1
          onBackToIntro={handleBackToIntro}
          onBackToDeepDiving={handleBackToDeepDiving}
        />
      )}

      {currentView === 'ocean2' && (
        <OceanScroll2
          onBackToIntro={handleBackToIntro2}
          onBackToDeepDiving={handleBackToDeepDiving}
        />
      )}
    </div>
  );
}

export default App;