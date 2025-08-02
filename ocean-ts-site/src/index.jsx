import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// If you're not using reportWebVitals, just delete this line and its usage below
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: remove if not using performance tracking
// reportWebVitals();
