import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// 1. IMPORT THE VIDEO DIRECTLY
// Adjust this path if you saved the video in a different folder inside 'src'
import tinaVideo from '../../assets/Video/tina.mp4'; 

const TinnaVideoModal = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Explicitly trigger play to bypass some browser restrictions
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Autoplay failed:", err);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Modal Background Backdrop */}
      <div 
        className="absolute inset-0 bg-center z-0"
        style={{ backgroundImage: `url('/images/videoPhoneBackground.jpeg')` }}
      />
      
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4 md:p-8">
        {/* Phone Frame Container - SMALLER & REFINED */}
        <motion.div 
          initial={{ scale: 0.7, opacity: 0, rotateY: -15 }}
          animate={{ scale: 0.9, opacity: 1, rotateY: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 100 }}
          className="relative w-full max-w-[260px] aspect-[9/19.5] bg-[#050505] rounded-[2.5rem] border-[6px] border-[#1a1a1a] shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/5"
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-8 h-1 bg-white/5 rounded-full" />
          </div>

          {/* Video Content */}
          <video 
            ref={videoRef}
            className="w-full h-full object-cover z-10"
            autoPlay 
            loop 
            playsInline 
            controls={false}
            preload="auto"
          >
            <source src={tinaVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Subtle Screen Reflection */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-20" />
        </motion.div>
      </div>
    </div>
  );
};

export default TinnaVideoModal;