'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = '/frames/frame_'; // e.g. frame_0001.jpg
const FPS = 30;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  // -- Particle System --
  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, color: string, radius: number }[] = [];
    const colors = ['rgba(0, 245, 255, 0.3)', 'rgba(139, 0, 255, 0.2)'];

    const resize = () => {
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * pCanvas.width,
          y: Math.random() * pCanvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: Math.random() * 2 + 1
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let animationId: number;
    const drawParticles = () => {
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = pCanvas.width;
        if (p.x > pCanvas.width) p.x = 0;
        if (p.y < 0) p.y = pCanvas.height;
        if (p.y > pCanvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // -- Frame Sequence --
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isPlaying = false;

    // ✅ STEP 1: Define drawFrame FIRST — before anything else
    const drawFrame = (index: number) => {
      if (!framesRef.current[index]) return;

      const img = framesRef.current[index];
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // ✅ STEP 2: Define setCanvasSize AFTER drawFrame
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isLoaded) {
        drawFrame(currentFrameRef.current);
      }
    };

    // ✅ STEP 3: Define everything else that depends on drawFrame
    const autoPlay = () => {
      if (isPlaying) return;
      isPlaying = true;
      let frame = 0;
      const interval = setInterval(() => {
        drawFrame(frame);
        frame++;
        if (frame >= TOTAL_FRAMES) {
          clearInterval(interval);
          currentFrameRef.current = TOTAL_FRAMES - 1;
        } else {
          currentFrameRef.current = frame;
        }
      }, 1000 / FPS);
    };

    const handleScroll = () => {
      if (!isLoaded) return;
      const heroHeight = window.innerHeight * 3; // scrolling distance

      const scrollFraction = window.scrollY / heroHeight;
      const index = Math.min(
        Math.max(0, Math.floor(scrollFraction * TOTAL_FRAMES)),
        TOTAL_FRAMES - 1
      );

      currentFrameRef.current = index;
      requestAnimationFrame(() => drawFrame(index));
    };

    // Preload only if not already preloaded (prevent duplicate loading on re-renders)
    if (framesRef.current.length === 0) {
      let loaded = 0;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const num = String(i).padStart(4, '0');
        img.src = `${FRAME_PATH}${num}.jpg`;
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          if (loaded === TOTAL_FRAMES) {
            setIsLoaded(true);
            // autoPlay();
          }
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          if (loaded === TOTAL_FRAMES) {
            setIsLoaded(true);
            // autoPlay();
          }
        };
        framesRef.current.push(img);
      }
    } else if (isLoaded) {
      // If already loaded, make sure canvas size is correct and initial frame is drawn
      setCanvasSize();
    }

    // ✅ STEP 4: Then attach event listeners
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ✅ STEP 5: Cleanup at the end
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded]);

  return (
    <div className="relative h-[400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[var(--color-brand-dark)]">

        {/* Particle Canvas Behind */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full z-0 opacity-80"
        />

        {/* Main Frames Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 will-change-transform mix-blend-screen opacity-90"
        />

        {/* Loading Bar */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[var(--color-brand-dark)]">
            <h1 className="font-heading text-xl text-[var(--color-brand-cyan)] mb-4 tracking-[0.2em] animate-pulse">
              INITIALIZING VR
            </h1>
            <div className="w-64 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-brand-cyan)] transition-all duration-200 shadow-[0_0_10px_rgba(0,245,255,1)]"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-xs font-mono text-[rgba(255,255,255,0.4)]">
              {Math.floor((loadedCount / TOTAL_FRAMES) * 100)}%
            </div>
          </div>
        )}

        {/* Overlay Content */}
        {isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center space-x-2 border border-[var(--color-brand-cyan)] bg-[rgba(0,245,255,0.05)] px-4 py-1.5 rounded-full backdrop-blur-sm mb-8 border-glow-cyan"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--color-brand-cyan)] animate-pulse shadow-[0_0_8px_rgba(0,245,255,1)]"></div>
              <span className="text-xs md:text-sm font-semibold tracking-widest text-[var(--color-brand-cyan)]">
                INDIA'S FIRST FREE ROAM VR ARCADE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-heading text-7xl md:text-9xl font-black text-center leading-none"
            >
              <div className="text-white text-glow-cyan tracking-wider">IN5NITE</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-cyan)] via-[var(--color-brand-purple)] to-[var(--color-brand-magenta)] mt-2">
                VR
              </div>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-6 text-xl md:text-3xl font-heading text-[rgba(255,255,255,0.7)] tracking-[0.3em] uppercase text-center"
            >
              Play Until You Fall!!
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="max-w-2xl text-center mt-6 text-sm md:text-base text-[rgba(255,255,255,0.6)] leading-relaxed font-light tracking-wide"
            >
              India's first Free Roam VR Multiplayer experience with Full Body Tracking.
              <br className="hidden md:block" /> Step into another reality — right here in Surat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pointer-events-auto"
            >
              <button className="font-heading bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] text-white px-8 py-4 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(139,0,255,0.4)] hover:shadow-[0_0_25px_rgba(139,0,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 rounded-sm">
                Enter The Game
              </button>
              <button className="font-heading border border-white/40 text-white/90 px-8 py-4 uppercase tracking-widest hover:border-[var(--color-brand-cyan)] hover:text-[var(--color-brand-cyan)] hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 rounded-sm">
                Explore Experience
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-10 flex flex-col items-center"
            >
              <span className="text-[10px] tracking-[0.4em] text-white/40 mb-3">SCROLL TO EXPLORE</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[var(--color-brand-cyan)] opacity-70"
              >
                <ChevronDown size={24} />
              </motion.div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
}
