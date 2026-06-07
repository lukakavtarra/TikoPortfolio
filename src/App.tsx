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

      
      {/* Main Component */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroPlate />
      </div>
    </div>
  );
}

export default App;
