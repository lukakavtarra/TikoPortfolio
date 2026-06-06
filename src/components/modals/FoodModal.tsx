import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VIDEOS = [
  { id: 1, title: 'Culinary Masterpiece', thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'Street Food Diary', thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600&h=400' },
];

const FoodModal = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-10">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 italic">
          Food <span className="text-[#bfff00]">Content</span>
        </h2>
        <div className="w-20 h-2 bg-[#bfff00] mb-4"></div>
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Visual gastronomy & storytelling</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        {VIDEOS.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="group relative rounded-[2rem] overflow-hidden cursor-pointer aspect-video border-2 border-neutral-800 hover:border-[#bfff00] transition-all duration-500 shadow-2xl"
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="w-16 h-16 bg-[#bfff00] rounded-full flex items-center justify-center mb-6 transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-[0_0_30px_rgba(191,255,0,0.4)]">
                <Play fill="black" size={24} className="ml-1 text-black" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#bfff00] transition-colors">{video.title}</h3>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Watch Production</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodModal;
