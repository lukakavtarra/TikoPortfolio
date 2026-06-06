import { useEffect, useRef } from 'react';

const COLORS = [
  '#f43f5e', // rose
  '#ec4899', // pink
  '#d946ef', // fuchsia
  '#a855f7', // purple
  '#8b5cf6', // violet
  '#3b82f6', // blue
  '#0ea5e9', // sky
  '#14b8a6', // teal
  '#10b981', // emerald
  '#f59e0b', // amber
  '#f97316', // orange
];

const CursorSparkles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isInteractive = useRef(false);

  useEffect(() => {
    let lastMoveTime = 0;
    let colorIndex = 0;
    let rafId: number;

    const updateCursor = () => {
      if (cursorRef.current) {
        const x = mousePos.current.x;
        const y = mousePos.current.y;
        const scale = isInteractive.current ? 1.5 : 1;
        
        cursorRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0) scale(${scale})`;
        cursorRef.current.style.color = COLORS[colorIndex];
        colorIndex = (colorIndex + 1) % COLORS.length;
      }
      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      isInteractive.current = !!(
        target.closest('a') || 
        target.closest('button') || 
        window.getComputedStyle(target).cursor === 'pointer'
      );

      const now = performance.now();
      if (now - lastMoveTime < 16) return; 
      lastMoveTime = now;

      const container = containerRef.current;
      if (!container) return;

      const count = Math.floor(Math.random() * 2) + 1;

      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 10 + 10;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        star.style.position = 'absolute';
        star.style.left = `${e.clientX}px`;
        star.style.top = `${e.clientY}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.marginLeft = `${-size / 2}px`;
        star.style.marginTop = `${-size / 2}px`;
        star.style.pointerEvents = 'none';
        star.style.color = color;
        star.style.zIndex = '100';
        star.style.willChange = 'transform, opacity';

        star.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="filter: drop-shadow(0 0 3px currentColor)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        `;

        container.appendChild(star);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rotation = Math.random() * 180 - 90;

        const animation = star.animate([
          { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${tx * 0.4}px, ${ty * 0.4}px) scale(1.4) rotate(${rotation * 0.4}deg)`, opacity: 0.8, offset: 0.3 },
          { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${rotation}deg)`, opacity: 0 }
        ], {
          duration: 700 + Math.random() * 300,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        });

        animation.onfinish = () => star.remove();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[110] transition-colors duration-200"
        style={{ 
          willChange: 'transform',
          filter: 'drop-shadow(0 0 8px currentColor)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div 
        ref={containerRef} 
        className="fixed inset-0 pointer-events-none overflow-hidden z-[100]" 
        style={{ isolation: 'isolate' }}
      />
    </>
  );
};

export default CursorSparkles;
