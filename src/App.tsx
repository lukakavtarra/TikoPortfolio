import HeroPlate from './components/HeroPlate';

function App() {
  return (
    <div className="w-full h-screen bg-black text-neutral-50 flex items-center justify-center relative overflow-hidden">
      {/* <CursorSparkles /> */}
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url('/images/content/bg.jpg')` }}
      />
      
      {/* Subtle Overlay Gradients to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Main Component */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroPlate />
      </div>
    </div>
  );
}

export default App;
