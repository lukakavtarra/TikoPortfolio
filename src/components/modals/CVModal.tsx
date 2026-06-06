import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Mail, PenTool, Languages } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

/**
 * CVModal Component - Compact Modern Timeline
 * - Shortened text templates
 * - Updated accent color to #423B13
 * - Reduced vertical spacing
 */

const EXPERIENCES = [
  { 
    role: 'Videographer / Creator', 
    company: 'CC / Creative Culture', 
    period: '2023 – Present', 
    bullets: ['Video production & branded content for leading Georgian brands', 'Concept dev, shooting, editing & 1st AD responsibilities', 'Social media campaigns & production flow coordination']
  },
  { 
    role: 'Content Creator', 
    company: 'Winglet Holiday', 
    period: '2026 – Future', 
    bullets: ['Travel & lifestyle content strategy', 'Short-form video for brand engagement']
  },
  { 
    role: 'Content Creator', 
    company: 'KASS LAND', 
    period: 'Starting 2026', 
    bullets: ['Upcoming: Brand storytelling & digital visuals']
  },
  { 
    role: 'Reels Creator', 
    company: 'GIZ Project', 
    period: '2022 – 2023', 
    bullets: ['Digital communication video formats', 'Audience-focused short-form storytelling']
  },
  { 
    role: 'Social Media Manager', 
    company: 'Creative Culture', 
    period: '2022 – 2023', 
    bullets: ['Content planning & publishing', 'Visual direction for digital campaigns']
  },
  { 
    role: 'Production Assistant', 
    company: 'Creative Culture', 
    period: '2022 – 2023', 
    bullets: ['On-set workflow & team coordination']
  },
  { 
    role: 'Sales Coordinator / Manager', 
    company: 'Car’D', 
    period: '2020 – 2022', 
    bullets: ['Sales processes & client relations', 'Negotiation & problem-solving']
  },
];

const EDUCATION = [
  { school: 'Caucasus University', degree: 'BBA', period: '2019 – 2024' },
  { school: 'U. of Ljubljana', degree: 'Erasmus+', period: '2023' },
];

const SKILLS = [
  { category: 'Creative', items: ['Video', 'SMM', 'Branding', 'Ideation', 'SMM'] },
  { category: 'Tools', items: ['Final Cut', 'CapCut', 'Canva', 'Motion Array'] },
  { category: 'AI', items: ['Midjourney', 'ChatGPT', 'AI Video'] },
];

const CVModal = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const backgroundAsset = 'src/assets/CV_Background.png';
  const BRAND_BLUE = "#040b1a"; 
  const ACCENT_GOLD = "#E8B409";

  const { scrollY } = useScroll({ container: scrollContainerRef });
  const smoothRotation = useSpring(scrollY, { stiffness: 80, damping: 20 });
  const starRotation = useTransform(smoothRotation, v => v * 0.4);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col" style={{ backgroundColor: BRAND_BLUE }}>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ rotate: starRotation }} className="w-[120%] h-[120%] md:w-[1200px] md:h-[1200px] opacity-25">
          <div className="w-full h-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundAsset})`, clipPath: 'circle(20% at 50% 50%)', willChange: 'transform' }} />
        </motion.div>
      </div>

      <div ref={scrollContainerRef} className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-6xl mx-auto flex flex-col p-0">
          
          <header className="p-6 md:p-12 border-b border-white/5 bg-black/40 backdrop-blur-xl flex flex-col gap-6 pt-24 md:pt-32">
            <div>
              <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-tight">
                Tinatin<br />Bakuradze
              </motion.h1>
              <p className="mt-4 text-lg md:text-xl font-bold uppercase tracking-widest italic" style={{ color: ACCENT_GOLD }}>Creative Creator & Storyteller</p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-neutral-400">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Mail size={14} style={{ color: ACCENT_GOLD }} /> <span>tinatin.bakuradzee@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <FaInstagram size={14} style={{ color: ACCENT_GOLD }} /> <span>@tikobakuradzee</span>
              </div>
            </div>

            <p className="max-w-3xl text-sm md:text-base leading-relaxed text-neutral-300 border-l-2 pl-4" style={{ borderColor: ACCENT_GOLD }}>
              Interested in advertising because I love turning simple human insights into visual ideas that people stop to watch, feel, and remember.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-white/5">
            
            <div className="lg:col-span-8 p-6 md:p-12 border-r border-white/5">
              <div className="flex items-center gap-4 mb-12">
                <Briefcase size={20} style={{ color: ACCENT_GOLD }} />
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">Experience</h2>
              </div>

              <div className="space-y-12 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />

                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute left-[4px] top-2 w-2 h-2 rounded-full ring-4 ring-neutral-950 z-10" style={{ backgroundColor: ACCENT_GOLD }} />
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-baseline gap-4">
                        <h3 className="text-lg md:text-xl font-black text-white">{exp.company}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{exp.period}</span>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: ACCENT_GOLD }}>{exp.role}</p>
                      <ul className="space-y-1 mt-1">
                        {exp.bullets?.map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-[11px] md:text-xs text-neutral-400 leading-snug">
                            <span style={{ color: ACCENT_GOLD }}>•</span> {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-black/10">
              
              <section className="p-6 md:p-10 border-b border-white/5 space-y-6">
                <div className="flex items-center gap-3">
                  <GraduationCap style={{ color: ACCENT_GOLD }} size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">Education</h2>
                </div>
                <div className="space-y-6">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-bold text-white text-xs">{edu.school}</h4>
                      <p className="text-[10px] font-bold uppercase" style={{ color: ACCENT_GOLD }}>{edu.degree}</p>
                      <p className="text-neutral-500 text-[9px] uppercase">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-6 md:p-10 border-b border-white/5 space-y-6 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <PenTool style={{ color: ACCENT_GOLD }} size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">Skills</h2>
                </div>
                <div className="space-y-6">
                  {SKILLS.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">{skill.category}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.items.map((item, i) => (
                          <span key={i} className="text-[9px] bg-neutral-900 border border-white/5 px-2 py-1 rounded text-neutral-400 font-bold uppercase">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-6 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <Languages style={{ color: ACCENT_GOLD }} size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">Languages</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 pb-20">
                  {[{ l: 'GE', v: 'Native' }, { l: 'EN', v: 'C1' }, { l: 'RU', v: 'A2' }, { l: 'FR', v: 'A1' }].map((lang, idx) => (
                    <div key={idx} className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                      <p className="text-white font-black text-xs">{lang.l}</p>
                      <p style={{ color: ACCENT_GOLD }} className="text-[8px] font-black uppercase tracking-tighter">{lang.v}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CVModal;
