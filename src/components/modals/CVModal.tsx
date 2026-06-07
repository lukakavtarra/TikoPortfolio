import { useRef, useState, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import SVG assets directly
import page1 from '../../assets/CV/page1.png';
import page2 from '../../assets/CV/page2.png';
import page3 from '../../assets/CV/page3.png';
import page4 from '../../assets/CV/page4.png';

const PAGE_ASSETS = [page1, page2, page3, page4];

/**
 * Single Page Component for the FlipBook
 */
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number: number }>((props, ref) => {
  return (
    <div className="page relative overflow-hidden h-full" ref={ref}>
      <div className="page-content flex flex-col h-full relative z-10">
        {props.children}
      </div>
      {/* 3D Page Shading */}
      <div className="absolute inset-0 pointer-events-none via-transparent to-black/10 z-20" />
    </div>
  );
});

const CVModal = () => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background is handled by the parent modal wrapper in HeroPlate.tsx 
          (the bg-transparent backdrop-blur-[40px]) to match other modals. 
          We remove the custom rotating background from here as requested. */}

      {/* LAYER 2: THE 3D BOOK */}
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center gap-8 px-4">
        
        <div className="w-full aspect-[0.7/1] md:aspect-[1.414/1] flex items-center justify-center">
          {/* @ts-ignore */}
          <HTMLFlipBook
            width={500}
            height={707} // A4 Proportion
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={445}
            maxHeight={1414}
            showCover={true}
            onFlip={onFlip}
            ref={bookRef}
            className="shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            flippingTime={1000}
            usePortrait={false} 
            startPage={0}
            drawShadow={true}
            autoSize={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            startZIndex={0}
          >
            {PAGE_ASSETS.map((src, index) => (
              <Page key={index} number={index + 1}>
                <img 
                  src={src} 
                  alt={`CV Page ${index + 1}`} 
                  className="w-full h-full object-contain pointer-events-none select-none" 
                />
              </Page>
            ))}
          </HTMLFlipBook>
        </div>

        {/* NAVIGATION CONTROLS */}
        <div className="flex items-center gap-8 bg-black/40 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl z-20">
          <button 
            onClick={() => bookRef.current.pageFlip().flipPrev()} 
            className="text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90"
          >
            <ChevronLeft size={28} />
          </button>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-white font-black text-xs tracking-[0.2em]" style={{ fontFamily: 'Andalemono, monospace' }}>
                {currentPage + 1} / {PAGE_ASSETS.length}
            </span>
            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white/40" 
                animate={{ width: `${((currentPage + 1) / PAGE_ASSETS.length) * 100}%` }}
              />
            </div>
          </div>

          <button 
            onClick={() => bookRef.current.pageFlip().flipNext()} 
            className="text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90"
          >
            <ChevronRight size={28} />
          </button>
        </div>

      </div>

      <style>{`
        .stPageFlip {
           background-color: transparent !important;
        }
        .page {
          box-sizing: border-box;
          background-color: white;
        }
        /* Mobile specific portrait override */
        @media (max-width: 767px) {
          .stPageFlip {
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CVModal;
