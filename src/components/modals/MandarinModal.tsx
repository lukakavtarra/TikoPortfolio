import React from 'react';
import { motion } from 'framer-motion';

interface MandarinModalProps {
  onClose: () => void;
}

const MandarinModal: React.FC<MandarinModalProps> = ({ onClose }) => {
  const youtubeVideoId = "dnlhScwLDag"; // User provided YouTube video ID

  return (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-transparent rounded-lg shadow-2xl overflow-hidden mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative w-full overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
          {/* 16:9 Aspect Ratio for YouTube iframe */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0`}
            style={{ opacity: 1 }} // Force opacity to 1
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Mandarin Video"
          ></iframe>
        </div>

        <div className="p-4 text-white text-center">
            <h2 className="text-xl font-bold font-andalemono">Mandarin Project</h2>
        </div>
      </motion.div>
  );
};

export default MandarinModal;
