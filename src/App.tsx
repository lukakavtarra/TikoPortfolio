import HeroPlate from './components/HeroPlate';
import CursorSparkles from './components/CursorSparkles';

function App() {
  return (
    <div className="w-full h-screen bg-neutral-900 text-neutral-50 flex items-center justify-center relative overflow-hidden">
      <CursorSparkles />
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-950 -z-10"></div>
      
      {/* Main Component */}
      <HeroPlate />
    </div>
  );
}

export default App;
