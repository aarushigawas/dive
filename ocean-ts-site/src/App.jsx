import React, { useState } from 'react';
import Mysteries from './components/Mysteries';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentStoryId, setCurrentStoryId] = useState(null);

  const handleHotspotClick = (id) => {
    setCurrentStoryId(id);
    setCurrentPage('story');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCurrentStoryId(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Mysteries 
        currentPage={currentPage}
        currentStoryId={currentStoryId}
        onHotspotClick={handleHotspotClick}
        onBackToHome={handleBackToHome}
      />
    </div>
  );
};

export default App;