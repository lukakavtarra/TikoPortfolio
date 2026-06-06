import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VIDEOS = [
  { id: 1, title: 'Mountain Landscapes', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'Forest Retreat', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600&h=400' },
];

const NatureModal = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-10">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 italic">
          Nature <span className="text-[#00e5ff]">Visions</span>
        </h2>
        <div className="flex gap-2 mb-4">
          <div className="w-10 h-2 bg-[#00e5ff]"></div>
          <div className="w-20 h-2 bg-neutral-800"></div>
        </div>
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">The beauty of the outdoors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        {VIDEOS.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="group relative rounded-[2rem] overflow-hidden cursor-pointer aspect-video border-2 border-neutral-800 hover:border-[#00e5ff] transition-all duration-500 shadow-2xl"
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#00e5ff]/5 to-transparent flex flex-col justify-end p-8">
              <div className="w-16 h-16 bg-[#00e5ff] rounded-full flex items-center justify-center mb-6 transform -rotate-90 group-hover:rotate-0 transition-all duration-500 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                <Play fill="black" size={24} className="ml-1 text-black" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#00e5ff] transition-colors">{video.title}</h3>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Watch Production</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NatureModal;
