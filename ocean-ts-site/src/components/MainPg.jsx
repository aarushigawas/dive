import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock components for demonstration
const OceanScroll1 = () => (
  <div className="min-h-screen bg-blue-900 text-white p-8">
    <h1 className="text-4xl font-bold mb-4">Ocean Animals</h1>
    <p className="text-xl">Explore the amazing world of ocean creatures...</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
    >
      Back to Home
    </button>
  </div>
);

const DeepDivingHomepage = () => {
  const [showOceanScroll, setShowOceanScroll] = useState(false);

  if (showOceanScroll) {
    return <OceanScroll1 />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header with Wave Animation */}
        <div className="flex items-center justify-center min-h-screen">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white text-center"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontFamily: 'serif'
            }}
            animate={{
              y: [0, -20, 0],
              textShadow: [
                '2px 2px 4px rgba(0,0,0,0.8)',
                '4px 4px 8px rgba(0,100,200,0.6)',
                '2px 2px 4px rgba(0,0,0,0.8)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Deep Diving
          </motion.h1>
        </div>

        {/* Content Boxes */}
        <div className="px-8 pb-20">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Animals Box */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0,150,255,0.3)"
              }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 cursor-pointer"
              onClick={() => setShowOceanScroll(true)}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div 
                  className="w-full md:w-1/2"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Ocean Animals"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
                <motion.div 
                  className="w-full md:w-1/2 text-center md:text-left"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    whileHover={{ 
                      scale: 1.1,
                      color: "#00BFFF",
                      textShadow: "0 0 20px rgba(0,191,255,0.8)"
                    }}
                  >
                    Explore About the Animals
                  </motion.h2>
                  <motion.p 
                    className="text-white text-opacity-90 text-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Dive deep into the mysterious world of ocean creatures
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Suits Box */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(255,100,0,0.3)"
              }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <motion.div 
                  className="w-full md:w-1/2"
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Diving Suits"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
                <motion.div 
                  className="w-full md:w-1/2 text-center md:text-right"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    whileHover={{ 
                      scale: 1.1,
                      color: "#FF6B35",
                      textShadow: "0 0 20px rgba(255,107,53,0.8)"
                    }}
                  >
                    Explore About the Suits
                  </motion.h2>
                  <motion.p 
                    className="text-white text-opacity-90 text-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Discover the technology that takes us to ocean depths
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <motion.div
        className="fixed top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="fixed top-40 right-20 w-6 h-6 bg-cyan-300 rounded-full opacity-50"
        animate={{
          y: [0, 40, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="fixed bottom-32 left-1/4 w-3 h-3 bg-teal-400 rounded-full opacity-70"
        animate={{
          y: [0, -25, 0],
          x: [0, 30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default DeepDivingHomepage;