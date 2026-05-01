'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = '/frames/frame_'; // e.g. frame_0001.jpg
const FPS = 30;

// ✅ Hero chapters with scroll progress ranges and content
const HERO_CHAPTERS = [
  {
    range: [0, 0.2],
    badge: "INDIA'S FIRST FREE ROAM VR ARCADE",
    headline1: "IN5NITE",
    headline2: "VR",
    tagline: "PLAY UNTIL YOU FALL!!",
    body: "India's first Free Roam VR Multiplayer experience with Full Body Tracking. Step into another reality — right here in Surat.",
    showButtons: true,
  },
  {
    range: [0.2, 0.4],
    badge: "FREE ROAM TECHNOLOGY",
    headline1: "MOVE",
    headline2: "FREELY",
    tagline: "NO WIRES. NO LIMITS.",
    body: "Walk, run, crouch, and interact. Our Free Roam tech gives you complete physical freedom inside the game.",
    showButtons: false,
  },
  {
    range: [0.4, 0.6],
    badge: "FULL BODY TRACKING",
    headline1: "YOUR BODY",
    headline2: "IN THE GAME",
    tagline: "INDIA'S FIRST. WORLD CLASS.",
    body: "Every movement of your body is tracked in real time. You don't press buttons — you ARE the controller.",
    showButtons: false,
  },
  {
    range: [0.6, 0.8],
    badge: "MULTIPLAYER VR",
    headline1: "PLAY",
    headline2: "TOGETHER",
    tagline: "SHARED VIRTUAL WORLDS.",
    body: "Squad up with friends in the same virtual space. Battle, explore, and experience together like never before.",
    showButtons: false,
  },
  {
    range: [0.8, 1.0],
    badge: "SURAT, GUJARAT",
    headline1: "READY TO",
    headline2: "ENTER?",
    tagline: "YOUR REALITY ENDS HERE.",
    body: "Visit us at Canal Walk Shoppers, Vesu, Surat. Walk in or book your session today.",
    showButtons: true,
  },
];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null); // ✅ Track hero container for scroll calculations

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // ✅ Track scroll progress 0.0 to 1.0
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

    // ✅ STEP 1: Define drawFrame FIRST — use cover mode for full-width display
    const drawFrame = (index: number) => {
      if (!framesRef.current[index]) return;

      const img = framesRef.current[index];

      // Cover mode — like CSS background-size: cover
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        x, y,
        img.naturalWidth * scale,
        img.naturalHeight * scale
      );
    };

    // ✅ STEP 2: Define setCanvasSize AFTER drawFrame — set to full window size
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
      if (!isLoaded || !heroContainerRef.current) return;

      const container = heroContainerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight; // e.g. 500vh
      const stickyHeight = window.innerHeight;        // 100vh
      const scrollTop = window.scrollY;

      // ✅ How far user has scrolled INTO the hero container
      const scrolledIntoContainer = scrollTop - containerTop;

      // ✅ Total scrollable distance within hero (containerHeight - stickyHeight)
      const maxScroll = containerHeight - stickyHeight;

      // ✅ If user is ABOVE hero — show frame 0
      if (scrolledIntoContainer < 0) {
        drawFrame(0);
        setScrollProgress(0);
        return;
      }

      // ✅ If user is PAST hero — hold last frame, stop recalculating
      if (scrolledIntoContainer >= maxScroll) {
        const lastFrameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(1.0 * (TOTAL_FRAMES - 1)));
        drawFrame(lastFrameIndex);
        setScrollProgress(1);
        return;
      }

      // ✅ Normal scrubbing within hero — clamp between 0 and 1
      const fraction = Math.max(0, Math.min(scrolledIntoContainer / maxScroll, 1));
      const frameIndex = Math.floor(fraction * (TOTAL_FRAMES - 1));
      currentFrameRef.current = frameIndex;
      drawFrame(frameIndex);
      setScrollProgress(fraction);
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
    <div id="home" ref={heroContainerRef} style={{ height: '500vh' }} className="relative">
      <div className="sticky top-0 w-screen h-screen overflow-hidden bg-[var(--color-brand-dark)]">

        {/* Layer 0: Particle Canvas Behind */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
        />

        {/* Layer 1: Frame Sequence Canvas — FULL SCREEN */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 1,
            filter: 'brightness(0.8) contrast(1.05)',
          }}
        />

        {/* Layer 2: Vignette — Top & Bottom fade only, NO side darkening */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: `
              linear-gradient(to bottom, 
                rgba(3,3,8,0.5) 0%, 
                rgba(3,3,8,0.0) 20%, 
                rgba(3,3,8,0.0) 70%, 
                rgba(3,3,8,0.8) 100%
              )
            `,
          }}
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

        {/* Layer 3: Text Overlay — NO glass box, just centered text with shadows */}
        {isLoaded && (
          <>
            {(() => {
              // ✅ Find active chapter based on scroll progress
              const activeChapter = HERO_CHAPTERS.find(
                (ch) => scrollProgress >= ch.range[0] && scrollProgress < ch.range[1]
              ) ?? HERO_CHAPTERS[0];

              const chapterIndex = HERO_CHAPTERS.indexOf(activeChapter);

              return (
                <>
                  {/* Main Text Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-[3] pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={chapterIndex}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center text-center w-full px-6 max-w-3xl mx-auto"
                        style={{ alignItems: 'center', textAlign: 'center', width: '100%' }}
                      >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 border border-[var(--color-brand-cyan)]/30 
                            bg-[rgba(0,245,255,0.05)] rounded-full px-4 py-1.5 text-[var(--color-brand-cyan)] text-xs 
                            tracking-widest uppercase mb-8 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 bg-[var(--color-brand-cyan)] rounded-full animate-pulse" />
                          {activeChapter.badge}
                        </div>

                        {/* Headline */}
                        <h1 className="font-heading leading-none mb-4">
                          <span className="block text-white text-[clamp(3rem,8vw,7rem)] tracking-tight font-black"
                            style={{
                              textShadow: '0 0 60px rgba(0,0,0,1), 0 0 120px rgba(0,0,0,0.9), 2px 2px 0px rgba(0,0,0,0.8)'
                            }}>
                            {activeChapter.headline1}
                          </span>
                          <span className="block text-[clamp(3rem,8vw,7rem)] tracking-tight font-black"
                            style={{
                              background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.8))',
                            }}>
                            {activeChapter.headline2}
                          </span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-light"
                          style={{
                            color: 'rgba(103, 232, 249, 0.8)',
                            textShadow: '0 2px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)'
                          }}>
                          {activeChapter.tagline}
                        </p>

                        {/* Body */}
                        <p className="text-sm md:text-base max-w-lg leading-relaxed font-light mb-8"
                          style={{
                            color: 'rgba(255,255,255,0.70)',
                            textShadow: '0 2px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)'
                          }}>
                          {activeChapter.body}
                        </p>

                        {/* Buttons — only show on certain chapters */}
                        {activeChapter.showButtons && (
                          <div className="flex gap-4 flex-wrap justify-center pointer-events-auto">
                            <button 
                              onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                              className="font-heading bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] text-white px-8 py-4 
                                uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(139,0,255,0.4)] 
                                hover:shadow-[0_0_25px_rgba(139,0,255,0.8)] transition-all duration-300 
                                transform hover:-translate-y-1 rounded-sm">
                              Enter The Game
                            </button>
                            <button 
                              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
                              className="font-heading border border-white/40 text-white/90 px-8 py-4 
                                uppercase tracking-widest hover:border-[var(--color-brand-cyan)] hover:text-[var(--color-brand-cyan)] 
                                hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300 
                                transform hover:-translate-y-1 rounded-sm">
                              Explore Experience
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Layer 4: Chapter Dot Indicators */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[4] flex flex-col gap-3">
                    {HERO_CHAPTERS.map((ch, i) => (
                      <motion.div
                        key={i}
                        className={`rounded-full transition-all duration-500 ${
                          i === chapterIndex
                            ? 'bg-[var(--color-brand-cyan)] shadow-[0_0_12px_rgba(0,245,255,0.6)]'
                            : 'bg-white/20'
                        }`}
                        animate={{
                          height: i === chapterIndex ? 24 : 6,
                          width: i === chapterIndex ? 2 : 6,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Layer 5: Progress Bar */}
                  <div className="absolute bottom-0 left-0 h-[2px] z-[5] transition-all duration-100"
                    style={{
                      width: `${scrollProgress * 100}%`,
                      background: 'linear-gradient(90deg, #22d3ee, #a855f7)'
                    }}
                  />

                  {/* Layer 6: Scroll Indicator — centered bottom */}
                  {chapterIndex === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-2"
                    >
                      <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
                        Scroll to Explore
                      </span>
                      <div className="w-px h-10 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
                    </motion.div>
                  )}
                </>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
}
