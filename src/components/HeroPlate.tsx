import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';
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
];

const HeroPlate = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activePhrase, setActivePhrase] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  // Targets up to iPhone 15 Pro (393x852), excluding iPhone 15 Pro Max (430x932)
  const [isMaxIphone15Pro, setIsMaxIphone15Pro] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 414 : false
  );

  const plateRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    lastAngle: number | null;
    lastX: number;
    movedDistance: number;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastAngle: null,
    lastX: 0,
    movedDistance: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsMaxIphone15Pro(window.innerWidth <= 414);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Track manual scroll rotation
  const scrollRotation = useMotionValue(0);
  const smoothScrollRotation = useSpring(scrollRotation, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  // 2. Continuous slow rotation (sway) using framer-motion's optimized loop
  const timeValue = useMotionValue(0);

  useAnimationFrame((time) => {
    if (!activeModal) {
      timeValue.set(time);
    }
  });

  // Sway is a gentle sine wave based on time
  const swayRotation = useTransform(timeValue, (t) => Math.sin(t * 0.0005) * 5);

  // 3. Combine both rotations into one final value for the components
  const combinedRotation = useTransform(
    [smoothScrollRotation, swayRotation],
    ([scroll, sway]) => (scroll as number) + (sway as number)
  );

  // 4. Counter-rotation for the icons to keep them upright
  const counterRotation = useTransform(combinedRotation, (r) => -r);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeModal) return;
      scrollRotation.set(scrollRotation.get() + e.deltaY * 0.4);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeModal, scrollRotation]);

  // Touch drag rotation support for mobile
  const getAngleFromCenter = (clientX: number, clientY: number) => {
    if (!plateRef.current) return null;
    const rect = plateRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    if (Math.hypot(dx, dy) < 20) return null;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (activeModal) return;
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      lastAngle: getAngleFromCenter(e.clientX, e.clientY),
      lastX: e.clientX,
      movedDistance: 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging || activeModal) return;

    const stepDist = Math.hypot(
      e.clientX - dragState.current.lastX,
      e.clientY - dragState.current.startY
    );
    dragState.current.movedDistance += stepDist;

    const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
    if (currentAngle !== null && dragState.current.lastAngle !== null) {
      let deltaAngle = currentAngle - dragState.current.lastAngle;
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;
      scrollRotation.set(scrollRotation.get() + deltaAngle);
      dragState.current.lastAngle = currentAngle;
    } else {
      const deltaX = e.clientX - dragState.current.lastX;
      scrollRotation.set(scrollRotation.get() + deltaX * 0.6);
    }
    dragState.current.lastX = e.clientX;
  };

  const handlePointerUp = () => {
    dragState.current.isDragging = false;
  };

  const handleIconClick = (id: string) => {
    if (dragState.current.movedDistance > 14) return;
    setActiveModal(id);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={() => {
        if (activePhrase !== null) setActivePhrase(null);
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 md:top-12 left-0 w-full text-center z-10 pointer-events-none px-4 md:px-0"
      >
        <h1
          className="text-xl sm:text-2xl md:text-2xl lg:text-4xl text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: 'Andalemono, monospace' }}
        >
          WHAT I&apos;M BRINGING TO THE <br className="md:hidden" />
          TABLE...
        </h1>
      </motion.div>

      {/* Floating Phrases */}
      {/* First phrase higher up on the right */}
      <div
        className={`absolute top-[15%] md:top-[20%] right-[10%] md:right-[8%] ${
          activePhrase === 2 ? 'z-40 md:z-50' : 'z-50'
        }`}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setActivePhrase(activePhrase === 1 ? null : 1);
          }}
          className="relative group cursor-pointer md:cursor-help flex flex-col items-center touch-manipulation"
        >
          <img
            src="/images/phrase.png"
            alt="Phrase 1"
            decoding="async"
            className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className={`absolute top-[110%] left-1/2 -translate-x-1/2 md:left-auto md:right-1/2 md:translate-x-1/2 transition-all duration-300 pointer-events-none w-32 sm:w-36 md:w-56 z-50 origin-top ${
              activePhrase === 1
                ? 'opacity-100'
                : 'opacity-0 md:group-hover:opacity-100'
            }`}
          >
            <div className="bg-[#fcfaf2] p-2.5 pb-3 md:p-4 md:pb-5 rounded-sm shadow-2xl border border-[#e5e0d8] relative transform rotate-2">
              <div className="absolute -top-1.5 md:-top-2 left-1/2 -translate-x-1/2 w-7 h-2 md:w-10 md:h-3 bg-red-400/80 rotate-[-3deg] shadow-sm" />
              <div className="absolute inset-0 top-5 md:top-6 bottom-3 md:bottom-4 pointer-events-none flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-blue-600" />
                <div className="w-full h-px bg-blue-600" />
                <div className="w-full h-px bg-blue-600" />
              </div>
              <span className="relative z-10 text-[9.5px] md:text-[13px] font-bold text-neutral-800 leading-snug md:leading-relaxed font-serif block text-center">
                Trying to find individuality everywhere i go
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Second phrase closer to the first one (little down & shifted horizontally) */}
      <div
        className={`absolute top-[25%] md:top-[32%] right-[16%] md:right-[5%] ${
          activePhrase === 2 ? 'z-50 md:z-40' : 'z-40'
        }`}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setActivePhrase(activePhrase === 2 ? null : 2);
          }}
          className="relative group cursor-pointer md:cursor-help flex flex-col items-center touch-manipulation"
        >
          <img
            src="/images/phrase.png"
            alt="Phrase 2"
            decoding="async"
            className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className={`absolute top-[110%] left-1/2 -translate-x-1/2 md:left-auto md:right-1/2 md:translate-x-1/2 transition-all duration-300 pointer-events-none w-32 sm:w-36 md:w-56 z-50 origin-top ${
              activePhrase === 2
                ? 'opacity-100'
                : 'opacity-0 md:group-hover:opacity-100'
            }`}
          >
            <div className="bg-[#fcfaf2] p-2.5 pb-3 md:p-4 md:pb-5 rounded-sm shadow-2xl border border-[#e5e0d8] relative transform -rotate-2">
              <div className="absolute -top-1.5 md:-top-2 left-1/2 -translate-x-1/2 w-7 h-2 md:w-10 md:h-3 bg-red-400/80 rotate-[3deg] shadow-sm" />
              <div className="absolute inset-0 top-5 md:top-6 bottom-3 md:bottom-4 pointer-events-none flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-blue-600" />
                <div className="w-full h-px bg-blue-600" />
                <div className="w-full h-px bg-blue-600" />
              </div>
              <span className="relative z-10 text-[9.5px] md:text-[13px] font-bold text-neutral-800 leading-snug md:leading-relaxed font-serif block text-center">
                To be everywhere all at once
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 1. Flanking Cutlery (On left and right side of the plate on both mobile and desktop) */}
      <motion.div
        animate={{ y: ['-50%', '-53%', '-50%'], rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-5 md:left-[26%] top-[62%] md:top-1/2 h-[31%] md:h-[50%] z-40 pointer-events-none"
      >
        <motion.button
          className="relative h-full group cursor-pointer pointer-events-auto flex items-center justify-end pr-0 outline-none touch-manipulation"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setActiveModal('remember')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/images/content/fork.svg"
            alt="Fork"
            decoding="async"
            className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] md:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
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
        animate={{ y: ['-50%', '-47%', '-50%'], rotate: [3, -3, 3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-5 md:right-[26%] top-[62%] md:top-1/2 h-[31%] md:h-[50%] z-40 pointer-events-none"
      >
        <motion.button
          className="relative h-full group cursor-pointer pointer-events-auto flex items-center justify-start pl-0 outline-none touch-manipulation"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setActiveModal('thestay')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src="/images/content/knife.svg"
            alt="Knife"
            decoding="async"
            className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] md:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
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
      <div
        ref={plateRef}
        className="relative w-[360px] h-[360px] md:w-[1200px] md:h-[1200px] mt-auto mb-12 md:my-0 flex items-center justify-center"
      >
        {/* Mobile-only iOS text-selection style hint positioned right on top of the plate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ y: isMobile ? (isMaxIphone15Pro ? -56 : -86) : 0 }}
          className="md:hidden absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center"
        >
          <span
            className="relative inline-block px-2.5 py-0.5 bg-[#007AFF]/30 text-[11px] font-medium leading-snug tracking-wide text-white text-center whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: 'Andalemono, monospace' }}
          >
            <span className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-[#007AFF]">
              <span className="absolute -top-[7px] -left-[3.75px] w-[9px] h-[9px] rounded-full bg-[#007AFF]" />
            </span>
            scroll to spin
            <br />
            tap to open
            <span className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-[#007AFF]">
              <span className="absolute -bottom-[7px] -right-[3.75px] w-[9px] h-[9px] rounded-full bg-[#007AFF]" />
            </span>
          </span>
        </motion.div>

        {/* The Plate Asset (Scaled up and shifted slightly up on mobile, moved lower on <= iPhone 15 Pro, 100% original on desktop) */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 40, damping: 20, duration: 1.5 }}
          style={{ y: isMobile ? (isMaxIphone15Pro ? -56 : -86) : 0 }}
          className="absolute inset-0 z-0 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-none"
        >
          <img
            src="/images/content/plate.png"
            alt="Plate"
            decoding="async"
            className="w-full h-full object-contain scale-[1.65] md:scale-100"
          />
        </motion.div>

        {/* Orbiting Icons Container */}
        <motion.div
          style={{
            rotate: combinedRotation,
            y: isMobile ? (isMaxIphone15Pro ? -38 : -68) : 0,
            willChange: 'transform',
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          {MENU_ITEMS.map((item, index) => {
            // On mobile, wider orbit radius (125) spreads icons out in X/Y space on the plate.
            // On desktop, baseRadius is the original 240.
            const baseRadius = isMobile ? 125 : 240;
            const angleInRads = (item.angle * Math.PI) / 180;
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(item.id);
                }}
                className="absolute z-20 w-25 h-25 md:w-40 md:h-40 group cursor-pointer pointer-events-auto outline-none bg-transparent appearance-none border-0 p-0"
              >
                {/* Counter-rotate each icon so it stays perfectly upright */}
                <motion.div
                  style={{ rotate: counterRotation }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    decoding="async"
                    draggable={false}
                    className="w-full h-full object-contain md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] md:group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-transform duration-300"
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

        {/* 3A. Mobile Centerpiece Image (tinna.png, anchored to bottom edge) */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="md:hidden absolute -bottom-14 z-20 w-[215%] h-[145%] pointer-events-none"
        >
          <img
            src="/images/content/tinna.png"
            alt="Centerpiece"
            decoding="async"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* 3B. Desktop Centerpiece Image (tinna website.png - exact original HEAD desktop sizing) */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="hidden md:block absolute -bottom-20 z-20 w-[200%] h-[125%] pointer-events-none"
        >
          <img
            src="/images/content/tinna website.png"
            alt="Centerpiece"
            decoding="async"
            className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      </div>

      {/* Desktop Folders - Top Left Corner (Aligned as a column on both mobile and desktop) */}
      <div className="absolute top-32 md:top-12 left-4 md:left-12 flex flex-col gap-4 md:gap-8 z-50 pointer-events-none">
        {/* Tinna Folder (Interactive Video) */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setActiveModal('archive')}
            className="relative group pointer-events-auto cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
          >
            <img
              src="/images/content/tinna-folder.svg"
              alt="Archive Folder"
              decoding="async"
              className="w-12 h-12 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110"
            />
          </motion.div>
        </motion.div>

        {/* CV Folder (Interactive) */}
        <motion.div
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setActiveModal('cv')}
            className="relative group pointer-events-auto cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
          >
            <img
              src="/images/content/cv-folder.svg"
              alt="CV Folder"
              decoding="async"
              className="w-12 h-12 md:w-20 md:h-20 drop-shadow-lg transition-transform group-hover:scale-110"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop-only iOS text-selection style hint - Center Left Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="hidden md:flex absolute top-[64%] -translate-y-1/2 left-20 z-40 pointer-events-none"
      >
        <span
          className="relative inline-block px-3 py-1 bg-[#007AFF]/30 text-xs font-medium leading-snug tracking-wide text-white text-center whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          style={{ fontFamily: 'Andalemono, monospace' }}
        >
          <span className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-[#007AFF]">
            <span className="absolute -top-[7px] -left-[3.75px] w-[9px] h-[9px] rounded-full bg-[#007AFF]" />
          </span>
          scroll to spin
          <br />
          tap to open
          <span className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-[#007AFF]">
            <span className="absolute -bottom-[7px] -right-[3.75px] w-[9px] h-[9px] rounded-full bg-[#007AFF]" />
          </span>
        </span>
      </motion.div>

      {/* Trash Bin - Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-none">
        <motion.div
          animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setActiveModal('backstage')}
            className="relative group pointer-events-auto cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
          >
            <img
              src="/images/content/trash bin.png"
              alt="Backstage Trash Bin"
              decoding="async"
              className="w-13 h-16 md:w-20 md:h-24 drop-shadow-2xl transition-transform group-hover:scale-110"
            />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={closeModal} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-7xl max-h-[95vh] bg-transparent md:backdrop-blur-[3px] rounded-[3rem] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-8 right-8 z-50 p-4 rounded-full bg-black/50 hover:bg-[#ff007f]/80 text-white transition-all backdrop-blur-sm border border-white/20 group"
              >
                <X
                  size={28}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>

              <div className="overflow-y-auto w-full h-full custom-scrollbar">
                {activeModal === 'food' && (
                  <div className="p-8 md:p-16">
                    <FoodModal />
                  </div>
                )}
                {activeModal === 'fashion' && (
                  <div className="p-8 md:p-16">
                    <FashionModal />
                  </div>
                )}
                {activeModal === 'nature' && (
                  <div className="p-8 md:p-16">
                    <NatureModal />
                  </div>
                )}
                {activeModal === 'care' && (
                  <div className="p-8 md:p-16">
                    <CareModal />
                  </div>
                )}
                {activeModal === 'socials' && (
                  <div className="p-8 md:p-16">
                    <SocialsModal onClose={closeModal} />
                  </div>
                )}
                {activeModal === 'remember' && (
                  <div className="p-8 md:p-16">
                    <RememberModal />
                  </div>
                )}
                {activeModal === 'cv' && <CVModal />}
                {activeModal === 'archive' && <TinnaVideoModal />}
                {activeModal === 'thestay' && (
                  <div className="p-8 md:p-16">
                    <TheStayModal />
                  </div>
                )}
                {activeModal === 'backstage' && (
                  <div className="p-8 md:p-16">
                    <BackstageModal />
                  </div>
                )}
                {activeModal === 'mandarin' && (
                  <MandarinModal onClose={closeModal} />
                )}
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
