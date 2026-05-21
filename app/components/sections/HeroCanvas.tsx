'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HERO_CHAPTERS } from '../../config/heroChapters';
import { TOTAL_FRAMES, FRAME_PATH, PRIORITY_INDICES, FRAME_EXTENSION, FRAME_PAD_LENGTH, HERO_FRAME_FIT_MODE, HERO_MOBILE_FOCAL_X, HERO_MOBILE_FOCAL_Y } from '../../lib/constants';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Performance refs — avoid state for hot-path values
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const scrollProgressRef = useRef<number>(0);
  const rafScrollIdRef = useRef<number>(0);
  const isHeroVisibleRef = useRef<boolean>(true);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const resizeRafRef = useRef<number>(0);
  const lastChapterRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // ── Check prefers-reduced-motion ──
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Particle System (with IntersectionObserver + reduced-motion) ──
  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext('2d');
    if (!ctx) return;

    // Cap DPR for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      radius: number;
    }[] = [];
    const colors = ['rgba(0, 245, 255, 0.3)', 'rgba(139, 0, 255, 0.2)'];

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      pCanvas.width = w * dpr;
      pCanvas.height = h * dpr;
      pCanvas.style.width = `${w}px`;
      pCanvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    // Reduce particles on mobile or reduced-motion
    const getParticleCount = () => {
      if (prefersReducedMotionRef.current) return 0;
      return window.innerWidth < 768 ? 40 : 120;
    };

    const initParticles = () => {
      const count = getParticleCount();
      const w = window.innerWidth;
      const h = window.innerHeight;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: Math.random() * 2 + 1,
        });
      }
    };

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    resize();

    let animationId: number;
    const drawParticles = () => {
      // Only animate when hero is visible
      if (!isHeroVisibleRef.current || prefersReducedMotionRef.current) {
        animationId = requestAnimationFrame(drawParticles);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connections — limit distance check count on mobile
        const connectionLimit = w < 768 ? Math.min(i + 10, particles.length) : particles.length;
        for (let j = i + 1; j < connectionLimit; j++) {
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

    // IntersectionObserver to pause particles outside hero
    let observer: IntersectionObserver | null = null;
    if (heroContainerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          isHeroVisibleRef.current = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0 }
      );
      observer.observe(heroContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationId);
      observer?.disconnect();
    };
  }, []);

  // ── Helper: resolve a frame image, falling back to nearest loaded ──
  const resolveFrame = useCallback((index: number): HTMLImageElement | null => {
    const img = framesRef.current[index];
    if (img && img.complete && img.naturalWidth > 0) return img;
    // Find nearest loaded frame
    let nearest = -1;
    let minDist = TOTAL_FRAMES;
    loadedSetRef.current.forEach((loadedIdx) => {
      const dist = Math.abs(loadedIdx - index);
      if (dist < minDist) {
        minDist = dist;
        nearest = loadedIdx;
      }
    });
    if (nearest >= 0) {
      const fallback = framesRef.current[nearest];
      if (fallback && fallback.complete && fallback.naturalWidth > 0) return fallback;
    }
    return null;
  }, []);

  // ── Helper: calculate draw params for an image ──
  const calcDrawParams = useCallback((img: HTMLImageElement, vw: number, vh: number, isMobile: boolean) => {
    const fitMode = isMobile ? "cover" : HERO_FRAME_FIT_MODE;
    const scale = fitMode === "contain"
      ? Math.min(vw / img.naturalWidth, vh / img.naturalHeight)
      : Math.max(vw / img.naturalWidth, vh / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    let x = (vw - drawWidth) / 2;
    let y = (vh - drawHeight) / 2;
    if (isMobile && fitMode === "cover") {
      x = (vw - drawWidth) * HERO_MOBILE_FOCAL_X;
      y = (vh - drawHeight) * HERO_MOBILE_FOCAL_Y;
    }
    return { x, y, drawWidth, drawHeight };
  }, []);

  // ── Draw frame with crossfade interpolation for smoother scrolling ──
  const drawFrameInterpolated = useCallback(
    (exactFrame: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const floorIdx = Math.floor(exactFrame);
      const ceilIdx = Math.min(floorIdx + 1, TOTAL_FRAMES - 1);
      const blend = exactFrame - floorIdx; // 0.0 → 1.0 fractional part

      const imgA = resolveFrame(floorIdx);
      if (!imgA) return;

      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      const isMobile = vw < 768;

      ctx.clearRect(0, 0, vw, vh);

      // Draw base frame
      const pA = calcDrawParams(imgA, vw, vh, isMobile);
      ctx.globalAlpha = 1;
      ctx.drawImage(imgA, pA.x, pA.y, pA.drawWidth, pA.drawHeight);

      // Crossfade to next frame if there's a significant blend factor
      if (blend > 0.05 && ceilIdx !== floorIdx) {
        const imgB = resolveFrame(ceilIdx);
        if (imgB && imgB !== imgA) {
          const pB = calcDrawParams(imgB, vw, vh, isMobile);
          ctx.globalAlpha = blend;
          ctx.drawImage(imgB, pB.x, pB.y, pB.drawWidth, pB.drawHeight);
          ctx.globalAlpha = 1;
        }
      }

      lastDrawnFrameRef.current = floorIdx;
    },
    [resolveFrame, calcDrawParams]
  );

  // ── Legacy drawFrame for loading/resize (integer index) ──
  const drawFrame = useCallback(
    (index: number) => {
      drawFrameInterpolated(index);
    },
    [drawFrameInterpolated]
  );

  // ── Frame Sequence: Loading + Scroll Handling ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cap DPR to 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Set canvas size
    const setCanvasSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Redraw current frame with new size
      lastDrawnFrameRef.current = -1; // Force redraw
      drawFrame(currentFrameRef.current);
    };

    // Debounced resize for canvas
    const handleResize = () => {
      cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(setCanvasSize);
    };

    // ── rAF-throttled scroll handler ──
    const handleScroll = () => {
      if (!heroContainerRef.current) return;

      const container = heroContainerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const stickyHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrolledIntoContainer = scrollTop - containerTop;
      const maxScroll = containerHeight - stickyHeight;

      let fraction: number;

      if (scrolledIntoContainer < 0) {
        fraction = 0;
      } else if (scrolledIntoContainer >= maxScroll) {
        fraction = 1;
      } else {
        fraction = Math.max(
          0,
          Math.min(scrolledIntoContainer / maxScroll, 1)
        );
      }

      scrollProgressRef.current = fraction;

      // Schedule draw on next animation frame (coalesces multiple scroll events)
      cancelAnimationFrame(rafScrollIdRef.current);
      rafScrollIdRef.current = requestAnimationFrame(() => {
        // Use fractional frame index for interpolated crossfade
        const exactFrame = fraction * (TOTAL_FRAMES - 1);
        const frameIndex = Math.floor(exactFrame);
        currentFrameRef.current = frameIndex;
        drawFrameInterpolated(exactFrame);

        // Update progress bar via DOM directly (no React re-render)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${fraction * 100}%`;
        }

        // Only trigger React re-render when the active chapter changes
        const newChapter = HERO_CHAPTERS.findIndex(
          (ch) => fraction >= ch.range[0] && fraction < ch.range[1]
        );
        const resolvedChapter = newChapter >= 0 ? newChapter : (fraction >= 1 ? HERO_CHAPTERS.length - 1 : 0);
        if (resolvedChapter !== lastChapterRef.current) {
          lastChapterRef.current = resolvedChapter;
          setScrollProgress(fraction);
        }
      });
    };

    // ── Progressive frame loading ──
    if (framesRef.current.length === 0) {
      // Initialize array with nulls
      framesRef.current = new Array(TOTAL_FRAMES).fill(null);

      let totalLoaded = 0;
      let lastReportedProgress = 0;

      const onFrameLoad = (index: number) => {
        loadedSetRef.current.add(index);
        totalLoaded++;

        // Only update React state every 10% to avoid excessive re-renders
        const pct = Math.floor((totalLoaded / TOTAL_FRAMES) * 10);
        if (pct > lastReportedProgress) {
          lastReportedProgress = pct;
          setLoadedCount(totalLoaded);
        }

        if (totalLoaded === TOTAL_FRAMES) {
          setLoadedCount(TOTAL_FRAMES);
          setIsLoaded(true);
        }

        // Draw first frame as soon as it's available
        if (index === 0 && currentFrameRef.current === 0) {
          drawFrame(0);
        }
      };

      const loadFrame = (index: number) => {
        const img = new Image();
        const num = String(index + 1).padStart(FRAME_PAD_LENGTH, '0');
        img.src = `${FRAME_PATH}${num}.${FRAME_EXTENSION}`;
        img.onload = () => onFrameLoad(index);
        img.onerror = () => onFrameLoad(index);
        framesRef.current[index] = img;
      };

      // Phase 1: Load priority frames first (every 10th)
      for (const idx of PRIORITY_INDICES) {
        loadFrame(idx);
      }

      // Phase 2: Load remaining frames after a brief yield
      requestAnimationFrame(() => {
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (!PRIORITY_INDICES.includes(i)) {
            loadFrame(i);
          }
        }
      });
    } else if (isLoaded) {
      setCanvasSize();
    }

    // Attach event listeners
    setCanvasSize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafScrollIdRef.current);
      cancelAnimationFrame(resizeRafRef.current);
    };
  }, [isLoaded, drawFrame]);

  return (
    <div
      id="home"
      ref={heroContainerRef}
      style={{ height: '350vh' }}
      className="relative"
    >
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
                style={{
                  width: `${(loadedCount / TOTAL_FRAMES) * 100}%`,
                }}
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
              // Find active chapter based on scroll progress
              const activeChapter =
                HERO_CHAPTERS.find(
                  (ch) =>
                    scrollProgress >= ch.range[0] &&
                    scrollProgress < ch.range[1]
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
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="flex flex-col items-center text-center w-full px-6 max-w-3xl mx-auto"
                        style={{
                          alignItems: 'center',
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        {/* Badge */}
                        <div
                          className="inline-flex items-center gap-2 border border-[var(--color-brand-cyan)]/30 
                            bg-[rgba(0,245,255,0.05)] rounded-full px-4 py-1.5 text-[var(--color-brand-cyan)] text-xs 
                            tracking-widest uppercase mb-8 backdrop-blur-sm"
                        >
                          <span className="w-1.5 h-1.5 bg-[var(--color-brand-cyan)] rounded-full animate-pulse" />
                          {activeChapter.badge}
                        </div>

                        {/* Headline */}
                        <h1 className="font-heading leading-none mb-4">
                          <span
                            className="block text-white text-[clamp(2rem,6vw,5rem)] tracking-tight font-black"
                            style={{
                              textShadow:
                                '0 0 60px rgba(0,0,0,1), 0 0 120px rgba(0,0,0,0.9), 2px 2px 0px rgba(0,0,0,0.8)',
                            }}
                          >
                            {activeChapter.headline1}
                          </span>
                          <span
                            className="block text-[clamp(2rem,6vw,5rem)] tracking-tight font-black"
                            style={{
                              background:
                                'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              filter:
                                'drop-shadow(0 0 20px rgba(168,85,247,0.8))',
                            }}
                          >
                            {activeChapter.headline2}
                          </span>
                        </h1>

                        {/* Tagline */}
                        <p
                          className="text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-light"
                          style={{
                            color: 'rgba(103, 232, 249, 0.8)',
                            textShadow:
                              '0 2px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)',
                          }}
                        >
                          {activeChapter.tagline}
                        </p>

                        {/* Body */}
                        <p
                          className="text-sm md:text-base max-w-lg leading-relaxed font-light mb-8"
                          style={{
                            color: 'rgba(255,255,255,0.70)',
                            textShadow:
                              '0 2px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)',
                          }}
                        >
                          {activeChapter.body}
                        </p>

                        {/* Buttons — only show on certain chapters */}
                        {activeChapter.showButtons && (
                          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto w-full max-w-xs sm:max-w-none">
                            <button
                              onClick={() =>
                                window.dispatchEvent(
                                  new CustomEvent('open-booking')
                                )
                              }
                              className="w-full sm:w-auto font-heading bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] text-white px-8 py-4 
                                uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(139,0,255,0.4)] 
                                hover:shadow-[0_0_25px_rgba(139,0,255,0.8)] transition-all duration-300 
                                transform hover:-translate-y-1 rounded-sm"
                            >
                              Enter The Game
                            </button>
                            <button
                              onClick={() =>
                                document
                                  .getElementById('why-us')
                                  ?.scrollIntoView({ behavior: 'smooth' })
                              }
                              className="w-full sm:w-auto font-heading border border-white/40 text-white/90 px-8 py-4 
                                uppercase tracking-widest hover:border-[var(--color-brand-cyan)] hover:text-[var(--color-brand-cyan)] 
                                hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300 
                                transform hover:-translate-y-1 rounded-sm"
                            >
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

                  {/* Layer 5: Progress Bar — driven by ref, not React state */}
                  <div
                    ref={progressBarRef}
                    className="absolute bottom-0 left-0 h-[2px] z-[5]"
                    style={{
                      width: '0%',
                      background:
                        'linear-gradient(90deg, #22d3ee, #a855f7)',
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
