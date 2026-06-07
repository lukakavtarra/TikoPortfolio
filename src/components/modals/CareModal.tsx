import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VIDEOS = [
  { id: 1, title: 'European Adventures', thumbnail: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'Island Escapes', thumbnail: 'https://images.unsplash.com/photo-1505051508008-923feaf0f13a?auto=format&fit=crop&q=80&w=600&h=400' },
];

const CareModal = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-10 text-center">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2 italic">
          Care <span className="text-[#ff5e00]">Logs</span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#ff5e00] to-transparent mx-auto mb-6"></div>
        <p className="text-neutral-400 font-bold uppercase tracking-[0.3em] text-[10px]">Cinematic journeys globally</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-10">
        {VIDEOS.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="group relative rounded-[3rem] overflow-hidden cursor-pointer aspect-square border-2 border-neutral-800 hover:border-[#ff5e00] transition-all duration-700 shadow-2xl"
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/40 group-hover:bg-transparent transition-all">
              <div className="w-20 h-20 bg-[#ff5e00] rounded-full flex items-center justify-center mb-6 transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-[0_0_50px_rgba(255,94,0,0.5)]">
                <Play fill="white" size={32} className="ml-1 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter text-center">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareModal;
