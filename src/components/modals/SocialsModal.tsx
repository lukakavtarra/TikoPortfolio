import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SocialsModalProps {
  onClose?: () => void;
}

const SocialsModal: React.FC<SocialsModalProps> = ({ onClose }) => {
  const instagramVideoSrc = '/images/socials/instagram.mp4'; 
  
  // 1. Create a reference to control the video directly
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Explicitly acknowledge onClose
  }, [onClose]);

  // 2. Force autoplay on mount (helps bypass strict browser policies)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented by browser:", err);
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 20 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
      className="relative h-[85vh] max-w-[95vw] aspect-[15/19] bg-transparent rounded-[2rem] shadow-2xl overflow-hidden mx-auto"
      onClick={(e) => e.stopPropagation()} 
    >
      
      <a 
        href="https://www.instagram.com/tikobakuradzee/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 block w-full h-full cursor-pointer group"
      >
        <video
          ref={videoRef} // Attach the ref
          onEnded={() => {
            // 3. THE FIX: When the video ends, manually reset and play
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={instagramVideoSrc}
          loop // Keep the native attribute as a fallback
          autoPlay
          muted
          playsInline
          title="Instagram Video"
        />
        
        {/* Subtle hover effect */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
      </a>

    </motion.div>
  );
};

export default SocialsModal;