import React from 'react';
import { motion } from 'framer-motion';

const AIModal: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative w-full max-w-4xl max-h-[90vh] bg-transparent rounded-lg shadow-2xl overflow-hidden mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          width="1030"
          height="579"
          src="https://www.youtube.com/embed/082hvhPLIco?autoplay=1&rel=0"
          title="A gum"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </motion.div>
  );
};

export default AIModal;
