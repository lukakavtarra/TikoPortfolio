import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import FoodModal from './modals/FoodModal';
import FashionModal from './modals/FashionModal';
import NatureModal from './modals/NatureModal';
import TravelModal from './modals/TravelModal';
import SocialsModal from './modals/SocialsModal';
import CVModal from './modals/CVModal';
import TinnaVideoModal from './modals/TinnaVideoModal';
import RememberModal from './modals/RememberModal';

const MENU_ITEMS = [
  // Angles adjusted to match the exact positions in your screenshot
    { id: 'food', img: '/images/content/food.svg', label: 'Food', angle: -135 },
  { id: 'fashion', img: '/images/content/shirt.svg', label: 'Fashion', angle: -45 },
  { id: 'socials', img: '/images/content/phone.svg', label: 'Socials', angle: 10 },
  { id: 'photography', img: '/images/content/camera.svg', label: 'Photography', angle: 70 },
  { id: 'travel', img: '/images/content/plane.svg', label: 'Travel', angle: 130 },
  { id: 'nature', img: '/images/content/flower.svg', label: 'Nature', angle: 190 },
  { id: 'wine', img: '/images/content/wine.svg', label: 'Wine', angle: 270 },
];

const HeroPlate = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const rotationValue = useMotionValue(0);
  const smoothRotation = useSpring(rotationValue, {
    stiffness: 40,
    damping: 20,
    mass: 0.5
  });

  useEffect(() => {
    let rafId: number;
    let manualRotation = 0; // Track manual scroll separately
    let startTime = performance.now();

    // Auto-rotation loop (Swaying back and forth)
    const autoRotate = (time: number) => {
      if (!activeModal) {
        // Calculate a gentle sine wave based on elapsed time
        const elapsed = time - startTime;
        // Adjust the multiplier to change the speed, and the amplitude (5) for how far it sways
        const sway = Math.sin(elapsed * 0.0005) * 5; 

        // Combine manual scroll offset with the continuous sway
        rotationValue.set(manualRotation + sway);
      }
      rafId = requestAnimationFrame(autoRotate);
    };

    rafId = requestAnimationFrame(autoRotate);

    const handleWheel = (e: WheelEvent) => {
      if (activeModal) return;
      // Update the base manual rotation so the sway continues from the new point
      manualRotation += e.deltaY * 0.4;
      // Immediately reflect the scroll for responsiveness
      rotationValue.set(manualRotation);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(rafId);
    };
  }, [activeModal, rotationValue]);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 md:top-12 left-0 w-full text-center z-10 pointer-events-none"
      >
        <h1 className="text-3xl md:text-2xl lg:text-4xl text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Andalemono, monospace' }}>
          WHAT I'M SERVING IN THIS LIFE...
        </h1>
      </motion.div>
      
      {/* 1. Flanking Cutlery */}
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 md:left-[26%] top-1/2 -translate-y-1/2 h-[40%] md:h-[50%] z-20 pointer-events-none"
      >
        <motion.div 
          className="relative w-full h-full group cursor-pointer pointer-events-auto flex items-center justify-end pr-4 md:pr-0"
          onClick={() => setActiveModal('remember')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/images/content/fork.svg" 
            alt="Fork" 
            className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
          />
          {/* Label positioned over the fork */}
          <div className="absolute top-1/2 left-full md:left-auto md:right-full ml-4 md:ml-0 md:mr-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[12px] md:text-sm font-black tracking-[0.2em] uppercase bg-black/80 px-4 py-2 rounded-full backdrop-blur-md text-white border border-white/20 shadow-2xl whitespace-nowrap">
              Remember
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 md:right-[26%] top-1/2 -translate-y-1/2 h-[40%] md:h-[50%] z-0 pointer-events-none flex items-center justify-start pl-4 md:pl-0"
      >
        <motion.img 
          src="/images/content/knife.svg" 
          alt="Knife" 
          className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        />
      </motion.div>

      {/* 2. Main Plate Layout */}
      {/* Scaled up slightly to match the bold look of the screenshot */}
      <div className="relative w-[360px] h-[360px] md:w-[1200px] md:h-[1200px] flex items-center justify-center">
        
        {/* The Plate Asset */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 40, damping: 20, duration: 1.5 }}
          className="absolute inset-0 z-0 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
        >
          <img 
            src="/images/content/plate.png" 
            alt="Plate" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Orbiting Icons */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {MENU_ITEMS.map((item, index) => {
            // Corrected radius to sit on the outer part of the 1200px plate
            const baseRadius = window.innerWidth < 768 ? 140 : 240; 
            
            const x = useTransform(smoothRotation, r => {
              const angle = (item.angle + r) * Math.PI / 180;
              return baseRadius * Math.cos(angle);
            });

            const y = useTransform(smoothRotation, r => {
              const angle = (item.angle + r) * Math.PI / 180;
              return baseRadius * Math.sin(angle);
            });

            const iconRot = useTransform(smoothRotation, r => -r);

            return (
              <motion.button
                key={item.id}
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.15, zIndex: 40 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal(item.id)}
                // Corrected valid Tailwind sizes
                className="absolute z-20 w-12 h-12 md:w-36 md:h-36 group cursor-pointer pointer-events-auto"
              >
                <motion.div style={{ rotate: iconRot }} className="w-full h-full relative flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"
                  />
                  <div className="absolute top-[110%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[12px] md:text-sm font-black tracking-[0.2em] uppercase bg-black/80 px-4 py-2 rounded-full backdrop-blur-md text-white border border-white/20 shadow-2xl whitespace-nowrap">
                        {item.label}
                      </span>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* 3. Centerpiece Image (Standing Figure) */}
        {/* Set to z-20 so she overlays the plate and the orbiting items pass behind her organically */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -bottom-10 md:-bottom-20 z-20 w-[200%] h-[80%] md:h-[125%] pointer-events-none"
        >
          <img 
            src="/images/content/tinna.png" 
            alt="Centerpiece" 
            className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

      </div>

      {/* Desktop Folders - Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-6 z-30 pointer-events-none">
        {/* Tinna Folder (Interactive Video) */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            onClick={() => setActiveModal('archive')}
            className="group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
          >
            <img src="/images/content/tinna-folder.svg" alt="Portfolio Folder" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110" />
          </motion.div>
        </motion.div>

        {/* CV Folder (Interactive) */}
        <motion.div
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            onClick={() => setActiveModal('cv')}
            className="group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
          >
            <img src="/images/content/cv-folder.svg" alt="CV Folder" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110" />
          </motion.div>
        </motion.div>
      </div>

      {/* Modals Container */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={closeModal}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-7xl max-h-[95vh] bg-neutral-900 border border-white/10 rounded-[3rem] shadow-[0_0_150px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 z-50 p-4 rounded-full bg-black/50 hover:bg-[#ff007f]/80 text-white transition-all backdrop-blur-md border border-white/20 group"
              >
                <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="overflow-y-auto w-full h-full custom-scrollbar">
                {activeModal === 'food' && <div className="p-8 md:p-16"><FoodModal /></div>}
                {activeModal === 'fashion' && <div className="p-8 md:p-16"><FashionModal /></div>}
                {activeModal === 'nature' && <div className="p-8 md:p-16"><NatureModal /></div>}
                {activeModal === 'travel' && <div className="p-8 md:p-16"><TravelModal /></div>}
                {activeModal === 'socials' && <div className="p-8 md:p-16"><SocialsModal /></div>}
                {activeModal === 'remember' && <div className="p-8 md:p-16"><RememberModal /></div>}
                {activeModal === 'cv' && <CVModal />}
                {activeModal === 'archive' && <TinnaVideoModal />}
                {/* {activeModal === 'photography' && <div className="p-8 md:p-16"><PhotographyModal /></div>} */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default HeroPlate;