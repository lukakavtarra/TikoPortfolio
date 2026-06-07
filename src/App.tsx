import { motion } from 'framer-motion';
import HeroPlate from './components/HeroPlate';

function App() {
  return (
    <div className="w-full h-screen bg-black text-neutral-50 flex items-center justify-center relative overflow-hidden">
      {/* <CursorSparkles /> */}
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/content/bg.jpg')` }}
      />

      {/* Floating Instruction Text */}
      <div className="absolute bottom-8 w-full flex justify-center z-10 pointer-events-none">
        <motion.div
          animate={{ 
            y: [20, 20, 20],
            x: [-300, -320, -300]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-xs md:text-sm font-bold tracking-[0.4em] text-white uppercase select-none"
          style={{ fontFamily: 'Andalemono, monospace' }}
        >
          TAP EVERYTHING THAT MOVES
        </motion.div>
      </div>
      
      {/* Main Component */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroPlate />
      </div>
    </div>
  );
}

export default App;
