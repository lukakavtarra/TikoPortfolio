import { useRef, useState, useEffect, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import page1 from '../../assets/CV/page1.png';
import page2 from '../../assets/CV/page2.png';
import page3 from '../../assets/CV/page3.png';
import page4 from '../../assets/CV/page4.png';

const PAGE_ASSETS = [page1, page2, page3, page4];

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number: number }>((props, ref) => {
  return (
    <div className="page relative overflow-hidden h-full" ref={ref}>
      <div className="page-content flex flex-col h-full relative z-10">
        {props.children}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/5 via-transparent to-black/10 z-20" />
    </div>
  );
});

interface FlipBookRef {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
}

const CVModal = () => {
  const bookRef = useRef<FlipBookRef | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center pt-12 pb-4 md:py-6">
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center gap-4 md:gap-8 px-4">
        <div
          className={`w-full flex items-center justify-center ${
            isMobile ? 'max-w-[350px] aspect-[0.707/1]' : 'aspect-[1.414/1]'
          }`}
        >
          {/* @ts-expect-error react-pageflip types require all props */}
          <HTMLFlipBook
            key={isMobile ? 'mobile-book' : 'desktop-book'}
            width={isMobile ? 330 : 500}
            height={isMobile ? 467 : 707}
            size="stretch"
            minWidth={260}
            maxWidth={1000}
            minHeight={368}
            maxHeight={1414}
            showCover={true}
            onFlip={onFlip}
            ref={bookRef}
            flippingTime={700}
            usePortrait={isMobile}
            startPage={0}
            drawShadow={false}
            autoSize={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={25}
            showPageCorners={true}
            disableFlipByClick={false}
            startZIndex={0}
          >
            {PAGE_ASSETS.map((src, index) => (
              <Page key={index} number={index + 1}>
                <img
                  src={src}
                  alt={`CV Page ${index + 1}`}
                  decoding="async"
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </Page>
            ))}
          </HTMLFlipBook>
        </div>

        {/* NAVIGATION CONTROLS */}
        <div className="flex items-center gap-6 md:gap-8 z-20">
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
            className="p-2 text-white/60 hover:text-white transition-transform hover:scale-110 active:scale-90 cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="flex flex-col items-center gap-1">
            <span
              className="text-white font-black text-xs tracking-[0.2em]"
              style={{ fontFamily: 'Andalemono, monospace' }}
            >
              {currentPage + 1} / {PAGE_ASSETS.length}
            </span>
            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/50"
                animate={{ width: `${((currentPage + 1) / PAGE_ASSETS.length) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip()?.flipNext()}
            className="p-2 text-white/60 hover:text-white transition-transform hover:scale-110 active:scale-90 cursor-pointer"
            aria-label="Next page"
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
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default CVModal;
