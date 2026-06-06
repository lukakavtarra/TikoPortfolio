import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SOCIALS = [
  { id: 'instagram', icon: FaInstagram, label: 'Instagram', handle: '@tikobakuradzee', color: 'text-[#ff007f]', bg: 'bg-[#ff007f]/10', border: 'border-[#ff007f]/20', glow: 'shadow-[#ff007f]/30' },
  { id: 'youtube', icon: FaYoutube, label: 'YouTube', handle: 'Tinatin Bakuradze', color: 'text-[#ff5e00]', bg: 'bg-[#ff5e00]/10', border: 'border-[#ff5e00]/20', glow: 'shadow-[#ff5e00]/30' },
  { id: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', handle: 'Tinatin Bakuradze', color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10', border: 'border-[#00e5ff]/20', glow: 'shadow-[#00e5ff]/30' },
  { id: 'twitter', icon: FaTwitter, label: 'Twitter / X', handle: '@tinatin_b', color: 'text-[#7000ff]', bg: 'bg-[#7000ff]/10', border: 'border-[#7000ff]/20', glow: 'shadow-[#7000ff]/30' },
];

const SocialsModal = () => {
  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4"
        >
          Let's <span className="text-[#00e5ff]">Vibe</span>
        </motion.h2>
        <p className="text-neutral-400 font-bold tracking-widest uppercase text-xs">Connect with me across the digital space</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {SOCIALS.map((social, idx) => (
          <motion.a
            key={social.id}
            href="#"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-6 p-8 rounded-3xl ${social.bg} border ${social.border} transition-all group relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-white/10 transition-all"></div>
            
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${social.color} bg-black/40 border border-white/10 shadow-xl`}>
              <social.icon size={32} />
            </div>
            <div>
              <h3 className={`font-black text-2xl uppercase tracking-tighter text-white group-hover:${social.color} transition-colors`}>{social.label}</h3>
              <p className="text-neutral-400 font-medium">{social.handle}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialsModal;
