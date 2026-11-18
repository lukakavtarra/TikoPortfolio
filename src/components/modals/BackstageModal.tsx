import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import VIDEOS from '../../../public/Videos/Backstage/backstageVideos.json';

interface BackstageVideo {
  id: number;
  title: string;
  thumbnail: string;
  iframeCode: string;
  isHorizontal?: boolean;
}

const ACCENT_COLOR = '#6b7280';

const BackstageModal = () => {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const typedVideos = VIDEOS as BackstageVideo[];
  const activeVideo = typedVideos.find((v) => v.id === activeVideoId);

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="mb-6 md:mb-10 text-left md:text-right">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 italic">
          Left<span style={{ color: ACCENT_COLOR }}>overs</span>
        </h2>
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
          Behind the scenes &amp; some motions
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-6 gap-4 md:gap-8 pb-10">
        {typedVideos.map((video, idx) => {
          const isHorizontal = Boolean(video.isHorizontal);
          return (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: Math.min(idx * 0.04, 0.2) }}
              className={`group relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-neutral-900 cursor-pointer border-2 border-neutral-800 transition-all duration-500 shadow-2xl hover:border-[var(--hover-color)] ${
                isHorizontal
                  ? 'col-span-full w-full max-w-xl aspect-video'
                  : 'aspect-[9/16]'
              }`}
              style={{ '--hover-color': ACCENT_COLOR } as React.CSSProperties}
              onClick={() => setActiveVideoId(video.id)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end ${
                  isHorizontal ? 'p-4 md:p-6' : 'p-3 md:p-0 md:pl-1 md:pb-8'
                }`}
              >
                <div
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-6 transform scale-100 md:scale-0 md:group-hover:scale-100 transition-all duration-500 shadow-lg"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  <Play fill="black" size={18} className="ml-0.5 md:ml-1 text-black md:w-6 md:h-6" strokeWidth={3} />
                </div>
                <h3 className="text-base md:text-xl font-black text-white uppercase tracking-tighter transition-colors group-hover:text-[var(--hover-color)]">
                  {video.title}
                </h3>
                <p className="text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  Watch Behind
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 ${
                activeVideo.isHorizontal
                  ? 'max-w-4xl aspect-video'
                  : 'max-w-[320px] aspect-[9/16]'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveVideoId(null)}
                className="absolute top-3 right-3 z-50 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors hover:bg-[var(--hover-color)]"
                style={{ '--hover-color': ACCENT_COLOR } as React.CSSProperties}
              >
                <X size={16} strokeWidth={3} />
              </button>

              <div
                className="w-full h-full absolute inset-0"
                dangerouslySetInnerHTML={{ __html: activeVideo.iframeCode }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackstageModal;
