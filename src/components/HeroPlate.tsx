import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { X } from 'lucide-react';
import FoodModal from './modals/FoodModal';
import FashionModal from './modals/FashionModal';
import NatureModal from './modals/NatureModal';
import CareModal from './modals/CareModal';
import SocialsModal from './modals/SocialsModal';
import CVModal from './modals/CVModal';
import TinnaVideoModal from './modals/TinnaVideoModal';
import RememberModal from './modals/RememberModal';
import TheStayModal from './modals/TheStayModal';
import BackstageModal from './modals/BackstageModal';
import MandarinModal from './modals/MandarinModal';

const MENU_ITEMS = [
  // Angles adjusted to match the exact positions in your screenshot
  { id: 'food', img: '/images/content/food.png', label: 'Flavor', angle: -120 },
  { id: 'fashion', img: '/images/content/shirt.png', label: 'Look Book', angle: -35 },
  { id: 'socials', img: '/images/content/phone.svg', label: 'Socials', angle: 20 },
  { id: 'mandarin', img: '/images/content/camera.png', label: 'Mandarin', angle: 80 },
  { id: 'care', img: '/images/content/comb.png', label: 'Daily Glow', angle: 135 },
  { id: 'nature', img: '/images/content/flower.png', label: 'Open air', angle: 180 },
  // { id: 'wine', img: '/images/content/wine.svg', label: 'Wine', angle: 270 },
];

const HeroPlate = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 1. Track manual scroll rotation
  const scrollRotation = useMotionValue(0);
  const smoothScrollRotation = useSpring(scrollRotation, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  });

  // 2. Continuous slow rotation (sway) using framer-motion's optimized loop
  const timeValue = useMotionValue(0);
  
  useAnimationFrame((time) => {
    if (!activeModal) {
      timeValue.set(time);
    }
  });

  // Sway is a gentle sine wave based on time
  const swayRotation = useTransform(timeValue, t => Math.sin(t * 0.0005) * 5);

  // 3. Combine both rotations into one final value for the components
  const combinedRotation = useTransform(
    [smoothScrollRotation, swayRotation],
    ([scroll, sway]) => (scroll as number) + (sway as number)
  );

  // 4. Counter-rotation for the icons to keep them upright
  const counterRotation = useTransform(combinedRotation, r => -r);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeModal) return;
      // Just update the base scroll value; spring and transform handle the rest smoothly
      scrollRotation.set(scrollRotation.get() + e.deltaY * 0.4);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeModal, scrollRotation]);

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
          WHAT I'M BRINGING TO THE TABLE...
        </h1>
      </motion.div>

      {/* Floating Phrases */}
      {/* First phrase higher up on the right */}
      <div className="absolute top-[20%] md:top-[20%] right-[5%] md:right-[8%] z-50">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative group cursor-help flex flex-col items-center"
        >
          <img 
            src="/images/phrase.png" 
            alt="Phrase 1" 
            className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute top-[110%] right-0 md:right-1/2 md:translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-48 md:w-56 z-50 origin-top">
            <div className="bg-[#fcfaf2] p-4 pb-5 rounded-sm shadow-2xl border border-[#e5e0d8] relative transform rotate-2">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-red-400/80 rotate-[-3deg] shadow-sm"></div>
              <div className="absolute inset-0 top-6 bottom-4 pointer-events-none flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-blue-600"></div>
                <div className="w-full h-px bg-blue-600"></div>
                <div className="w-full h-px bg-blue-600"></div>
              </div>
              <span className="relative z-10 text-[11px] md:text-[13px] font-bold text-neutral-800 leading-relaxed font-serif block text-center">
                Trying to find individuality everywhere i go
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Second phrase closer to the first one */}
      <div className="absolute top-[32%] md:top-[32%] right-[10%] md:right-[5%] z-40">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="relative group cursor-help flex flex-col items-center"
        >
          <img 
            src="/images/phrase.png" 
            alt="Phrase 2" 
            className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute top-[110%] right-0 md:right-1/2 md:translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-48 md:w-56 z-50 origin-top">
            <div className="bg-[#fcfaf2] p-4 pb-5 rounded-sm shadow-2xl border border-[#e5e0d8] relative transform -rotate-2">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-red-400/80 rotate-[3deg] shadow-sm"></div>
              <div className="absolute inset-0 top-6 bottom-4 pointer-events-none flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-blue-600"></div>
                <div className="w-full h-px bg-blue-600"></div>
                <div className="w-full h-px bg-blue-600"></div>
              </div>
              <span className="relative z-10 text-[11px] md:text-[13px] font-bold text-neutral-800 leading-relaxed font-serif block text-center">
                To be everywhere all at once
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 1. Flanking Cutlery */}
      <motion.div
        animate={{ y: ["-50%", "-53%", "-50%"], rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 md:left-[26%] top-1/2 h-[40%] md:h-[50%] z-40 pointer-events-none"
      >
        <motion.button 
          className="relative h-full group cursor-pointer pointer-events-auto flex items-center justify-end pr-4 md:pr-0 outline-none"
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
          <div className="absolute top-1/2 left-full md:left-auto md:right-full ml-4 md:ml-0 md:mr-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[12px] md:text-sm font-black tracking-[0.2em] uppercase bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm text-white border border-white/20 shadow-2xl whitespace-nowrap">
              The Setting
            </span>
          </div>
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: ["-50%", "-47%", "-50%"], rotate: [3, -3, 3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 md:right-[26%] top-1/2 h-[40%] md:h-[50%] z-40 pointer-events-none"
      >
        <motion.button
          className="relative h-full group cursor-pointer pointer-events-auto flex items-center justify-start pl-4 md:pl-0 outline-none"
          onClick={() => setActiveModal('thestay')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img 
            src="/images/content/knife.svg" 
            alt="Knife" 
            className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          />
          <div className="absolute top-1/2 right-full md:right-auto md:left-full mr-4 md:mr-0 md:ml-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[12px] md:text-sm font-black tracking-[0.2em] uppercase bg-black/80 px-4 py-2 rounded-full backdrop-blur-md text-white border border-white/20 shadow-2xl whitespace-nowrap">
              The Stay
            </span>
          </div>
        </motion.button>
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

        {/* Orbiting Icons Container */}
        {/* The entire container rotates via CSS transform, which is buttery smooth */}
        <motion.div 
          style={{ rotate: combinedRotation }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          {MENU_ITEMS.map((item, index) => {
            // Calculate static positions based on the baseRadius
            const baseRadius = window.innerWidth < 768 ? 140 : 240; 
            const angleInRads = (item.angle) * Math.PI / 180;
            const staticX = baseRadius * Math.cos(angleInRads);
            const staticY = baseRadius * Math.sin(angleInRads);

            return (
              <motion.button
                key={item.id}
                style={{ x: staticX, y: staticY }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.15, zIndex: 40 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal(item.id)}
                className="absolute z-20 w-12 h-12 md:w-40 md:h-40 group cursor-pointer pointer-events-auto"
              >
                {/* Counter-rotate each icon so it stays perfectly upright */}
                <motion.div style={{ rotate: counterRotation }} className="w-full h-full relative flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"
                    style={item.id === 'food' ? { scale: 0.82 } : {}}
                  />
                  <div className="absolute top-[110%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[12px] md:text-sm font-black tracking-[0.2em] uppercase bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm text-white border border-white/20 shadow-2xl whitespace-nowrap">
                        {item.label}
                      </span>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

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

      {/* Desktop Folders - Top Left Corner */}
      <div className="absolute top-8 md:top-12 left-4 md:left-12 flex flex-col gap-8 z-50 pointer-events-none">
        {/* Tinna Folder (Interactive Video) */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            onClick={() => setActiveModal('archive')}
            className="relative group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
          >
            <img src="/images/content/tinna-folder.svg" alt="Archive Folder" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">

            </div>
          </motion.div>
        </motion.div>

        {/* CV Folder (Interactive) */}
        <motion.div
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            onClick={() => setActiveModal('cv')}
            className="relative group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
          >
            <img src="/images/content/cv-folder.svg" alt="CV Folder" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">

            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trash Bin - Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-none">
        <motion.div
          animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
            onClick={() => setActiveModal('backstage')}
            className="relative group pointer-events-auto cursor-pointer flex flex-col items-center gap-1"
          >
            <img src="/images/content/trash bin.png" alt="Backstage Trash Bin" className="w-13 h-16 md:w-20 md:h-24 drop-shadow-2xl transition-transform group-hover:scale-110" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black/80 px-3 py-1.5 rounded-full backdrop-blur-md text-white border border-white/20 shadow-xl whitespace-nowrap">
                Leftovers
              </span>
            </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xsm"
          >
            <div className="absolute inset-0" onClick={closeModal}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-7xl max-h-[95vh] bg-transparent backdrop-blur-[3px]  rounded-[3rem] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 z-50 p-4 rounded-full bg-black/50 hover:bg-[#ff007f]/80 text-white transition-all backdrop-blur-sm border border-white/20 group"
              >
                <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="overflow-y-auto w-full h-full custom-scrollbar">
                {activeModal === 'food' && <div className="p-8 md:p-16"><FoodModal /></div>}
                {activeModal === 'fashion' && <div className="p-8 md:p-16"><FashionModal /></div>}
                {activeModal === 'nature' && <div className="p-8 md:p-16"><NatureModal /></div>}
                {activeModal === 'care' && <div className="p-8 md:p-16"><CareModal /></div>}
                {activeModal === 'socials' && <div className="p-8 md:p-16"><SocialsModal /></div>}
                {activeModal === 'remember' && <div className="p-8 md:p-16"><RememberModal /></div>}
                {activeModal === 'cv' && <CVModal />}
                {activeModal === 'archive' && <TinnaVideoModal />}
                {activeModal === 'thestay' && <div className="p-8 md:p-16"><TheStayModal /></div>}
                {activeModal === 'backstage' && <div className="p-8 md:p-16"><BackstageModal /></div>}
                {activeModal === 'mandarin' && <MandarinModal onClose={closeModal} />}
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
        
        /* Safari SVG Background Fix */
        img[src$=".svg"] {
          background-color: transparent !important;
          -webkit-background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default HeroPlate;
