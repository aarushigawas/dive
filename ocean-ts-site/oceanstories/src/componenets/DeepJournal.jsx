// DeepJournal.jsx
import React from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import "./DeepJournal.css"; // You need to create styles here for visuals

const Page = React.forwardRef(({ title, children, className }, ref) => {
  return (
    <div className={`page ${className}`} ref={ref}>
      <h2 className="page-title">{title}</h2>
      <div className="page-content">{children}</div>
    </div>
  );
});

function DeepJournal() {
  return (
    <div className="deep-journal-container">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="intro-text"
      >
        <h1>The Deep Journal</h1>
        <p>
          Found buried beneath the wreck of an unknown ship, this book reveals
          secrets long lost to the sea...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="book-wrapper"
      >
        <HTMLFlipBook
          width={400}
          height={550}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          showCover={true}
          mobileScrollSupport={true}
          className="flip-book"
        >
          <Page title="Entry 1: The Vanishing Crew">
            <p>
              April 12th, 1912 — We found the wreck drifting. No crew. No signs
              of struggle. Just a captain's hat and a log that ends mid-sentence...
            </p>
          </Page>

          <Page title="Entry 2: Lost Maps">
            <img
              src="/images/map.png"
              alt="Old Ocean Map"
              className="map-image"
            />
            <p>Click glowing marks to uncover the story behind each wreck.</p>
          </Page>

          <Page title="Entry 3: The Beast Below">
            <img
              src="/images/kraken.png"
              alt="Mythical Sea Monster"
              className="monster-image"
            />
            <p>
              Legends speak of a shadow deeper than the abyss, tentacles long as
              ships, eyes glowing with rage...
            </p>
          </Page>

          <Page title="Final Entry: SOS" className="final-entry">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 4 }}
            >
              To whoever finds this... turn back. The sea keeps what it takes.
            </motion.p>
          </Page>
        </HTMLFlipBook>
      </motion.div>
    </div>
  );
}

export default DeepJournal;
