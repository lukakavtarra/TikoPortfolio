import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  iframeCode: string;
}

const TheStayModal = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  useEffect(() => {
    fetch('../../public/Videos/TheStay/theStayVideos.json')
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error("Failed to load The Stay videos:", err));
  }, []);

  const activeVideo = videos.find(v => v.id === activeVideoId);
  const ACCENT_COLOR = "#8e0000"; // Cyan

  return (
    <div className="flex flex-col h-full w-full relative">
      
      <div className="mb-10 text-left">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 italic">
          The <span style={{ color: ACCENT_COLOR }}>Stay</span>
        </h2>
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">A Unique Guesthouse Experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
        {videos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative rounded-[2rem] overflow-hidden bg-neutral-900 cursor-pointer aspect-[9/16] border-2 border-neutral-800 transition-all duration-500 shadow-2xl hover:border-[var(--hover-color)]"
            style={{ '--hover-color': ACCENT_COLOR } as any}
            onClick={() => setActiveVideoId(video.id)}
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-8">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-lg"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                <Play fill="black" size={24} className="ml-1 text-black" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter transition-colors group-hover:text-[var(--hover-color)] none group-hover:block hidden">
                {video.title}
              </h3>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Watch Experience
              </p>
            </div>
          </motion.div>
        ))}
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[320px] aspect-[9/16] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            >
              <button 
                onClick={() => setActiveVideoId(null)}
                className="absolute top-3 right-3 z-50 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors hover:bg-[var(--hover-color)]"
                style={{ '--hover-color': ACCENT_COLOR } as any}
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

export default TheStayModal;
