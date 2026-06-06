import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Utensils, Shirt, Flower, Folder, Plane, Phone, X } from 'lucide-react';
import FoodModal from './modals/FoodModal';
import FashionModal from './modals/FashionModal';
import NatureModal from './modals/NatureModal';
import CVModal from './modals/CVModal';
import TravelModal from './modals/TravelModal';
import SocialsModal from './modals/SocialsModal';

const FACE_IMAGE_URL = "src/assets/Tinatin_Pic.png";

const MENU_ITEMS = [
  { id: 'food', icon: Utensils, label: 'Food', angle: -90, freq: 0.05, amp: 20, color: 'text-orange-400' },
  { id: 'fashion', icon: Shirt, label: 'Fashion', angle: -30, freq: 0.07, amp: 25, color: 'text-pink-400' },
  { id: 'nature', icon: Flower, label: 'Nature', angle: 30, freq: 0.04, amp: 15, color: 'text-green-400' },
  { id: 'cv', icon: Folder, label: 'CV', angle: 90, freq: 0.06, amp: 22, color: 'text-emerald-400' },
  { id: 'travel', icon: Plane, label: 'Travel', angle: 150, freq: 0.08, amp: 18, color: 'text-sky-400' },
  { id: 'socials', icon: Phone, label: 'Socials', angle: 210, freq: 0.03, amp: 30, color: 'text-purple-400' },
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

  const plateRotation = useTransform(smoothRotation, r => -r);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 md:top-20 left-0 w-full text-center z-10 pointer-events-none"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-xl">
          What I am <span className="text-rose-500 italic">serving</span> in life
        </h1>
      </motion.div>

      {/* The Plate Container - Static Shadow here for performance */}
      <div className="relative w-[240px] h-[240px] md:w-[380px] md:h-[380px] flex items-center justify-center rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        
        {/* The Plate Visual - Only content rotates */}
        <motion.div 
          style={{ rotate: plateRotation, willChange: 'transform' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="absolute inset-0 rounded-full bg-[#fdfdfd] border border-stone-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 pointer-events-none"></div>

          {/* SPECULAR HIGHLIGHT */}
          <div className="absolute top-[5%] left-[20%] w-[30%] h-[15%] bg-white/40 rounded-full rotate-[35deg]"></div>

          {/* The Plate's Rim/Lip detail */}
          <div className="absolute inset-[10px] md:inset-[15px] rounded-full border border-stone-100/50"></div>

          {/* Decorative Inner Circle */}
          <div className="absolute inset-[20%] rounded-full border border-stone-50/30"></div>
        </motion.div>

        {/* Centerpiece Image - Static positioning relative to plate center */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-32 h-32 md:w-52 md:h-52 rounded-full overflow-hidden border-[4px] border-[#fdfdfd] shadow-[0_5px_20px_rgba(0,0,0,0.1)] z-10"
        >
          <img 
            src={FACE_IMAGE_URL} 
            alt="Tinatin Bakuradze" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Orbiting Icons */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {MENU_ITEMS.map((item, index) => {
            const baseRadius = window.innerWidth < 768 ? 95 : 155;
            
            const x = useTransform(smoothRotation, r => {
              const angle = (item.angle + r) * Math.PI / 180;
              // Simplified craziness: only radius fluctuates slightly
              const radius = baseRadius + Math.sin(r * 0.05) * 10;
              return radius * Math.cos(angle);
            });

            const y = useTransform(smoothRotation, r => {
              const angle = (item.angle + r) * Math.PI / 180;
              const radius = baseRadius + Math.sin(r * 0.05) * 10;
              return radius * Math.sin(angle);
            });

            const iconRot = useTransform(smoothRotation, r => -r);

            return (
              <motion.button
                key={item.id}
                style={{ x, y, willChange: 'transform' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveModal(item.id)}
                className="absolute z-20 flex flex-col items-center justify-center gap-1 group cursor-pointer pointer-events-auto"
              >
                <motion.div style={{ rotate: iconRot }}>
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-neutral-900 border border-neutral-800 shadow-md flex items-center justify-center ${item.color} group-hover:border-current transition-colors duration-200`}>
                    <item.icon size={18} />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/40 px-1 rounded">
                    {item.label}
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modals Container */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={closeModal}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/50 hover:bg-white/10 text-white transition-all backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>

              <div className={`overflow-y-auto w-full h-full custom-scrollbar ${activeModal === 'cv' ? 'p-0' : 'p-6 md:p-10'}`}>
                {activeModal === 'food' && <FoodModal />}
                {activeModal === 'fashion' && <FashionModal />}
                {activeModal === 'nature' && <NatureModal />}
                {activeModal === 'cv' && <CVModal />}
                {activeModal === 'travel' && <TravelModal />}
                {activeModal === 'socials' && <SocialsModal />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #171717; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>
    </div>
  );
};

export default HeroPlate;
