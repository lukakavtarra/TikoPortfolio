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
    const handleWheel = (e: WheelEvent) => {
      if (activeModal) return;
      rotationValue.set(rotationValue.get() + e.deltaY * 0.4);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeModal, rotationValue]);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* 1. Flanking Cutlery (Locked to left and right) */}
      <motion.img 
        src="/images/content/fork.png" 
        alt="Fork" 
        className="absolute left-[5%] md:left-[15%] top-1/2 -translate-y-1/2 h-[50%] md:h-[70%] w-auto z-0 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      />
      <motion.img 
        src="/images/content/knife.png" 
        alt="Knife" 
        className="absolute right-[5%] md:right-[15%] top-1/2 -translate-y-1/2 h-[50%] md:h-[70%] w-auto z-0 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      />

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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          onClick={() => setActiveModal('archive')}
          className="group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
        >
          <img src="/images/content/tinna-folder.svg" alt="Portfolio Folder" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110" />
        </motion.div>

        {/* CV Folder (Interactive) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
          onClick={() => setActiveModal('cv')}
          className="group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
        >
          <img src="/images/content/cv-folder.svg" alt="CV Folder" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110" />
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