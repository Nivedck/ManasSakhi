import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown } from 'lucide-react';
import { AppContext } from '../App';

const Orb = () => {
  const { currentMood } = useContext(AppContext);

  const isCalm = currentMood === 'calm';
  const color = isCalm ? 'var(--primary-teal)' : 'var(--alert-orange)';

  // Base breathing animation
  const breathingVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: isCalm ? 4 : 2, // Faster breathing if stressed
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="orb-container">
      <motion.div
        className="orb-glow"
        style={{ backgroundColor: color }}
        variants={breathingVariants}
        animate="animate"
      />
      <motion.div
        className="orb-core"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color} 60%)`, // 3D sphere gradient
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.95)',
          position: 'absolute',
          zIndex: 2,
          boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.1), 0 10px 30px ${color}66` // Inner depth + colored drop shadow
        }}
        animate={{
          scale: isCalm ? 1 : 1.1,
        }}
        transition={{ duration: 0.8 }}
      >
        {isCalm ? <Smile size={200} strokeWidth={2} /> : <Frown size={200} strokeWidth={2} />}
      </motion.div>
    </div>
  );
};

export default Orb;
