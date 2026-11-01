import { Fragment, useEffect, useRef } from "react";

// Onda ripetibile: la larghezza è il doppio del periodo intero, così lo scorrimento è continuo
const wavePath = (period: number, amplitude: number, height: number) => {
  const half = period / 2;
  const mid = amplitude;
  let d = `M0 ${mid} Q${half / 2} ${mid - amplitude} ${half} ${mid}`;
  for (let x = period; x <= 2400; x += half) d += ` T${x} ${mid}`;
  return `${d} L2400 ${height} L0 ${height} Z`;
};

const waves = [
  { period: 400, amplitude: 9, height: 240, fill: "hsl(218 40% 12%)", speed: "38s", size: "32%" },
  { period: 600, amplitude: 14, height: 240, fill: "hsl(220 42% 9.5%)", speed: "26s", size: "23%" },
  { period: 800, amplitude: 20, height: 240, fill: "hsl(222 40% 6%)", speed: "18s", size: "14%" },
];

const Stars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: { x: number; y: number; r: number; phase: number; speed: number }[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let meteor: { x: number; y: number; life: number } | null = null;
    let nextMeteor = performance.now() + 5000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((width * height) / 5200) }, () => ({
        x: Math.random() * width,
        y: Math.pow(Math.random(), 1.5) * height * 0.72,
        r: Math.random() * 1.15 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0016 + 0.0004,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(star.phase + time * star.speed));
        ctx.fillStyle = "#f4ead6";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        if (!meteor && time > nextMeteor) {
          meteor = { x: Math.random() * width * 0.7, y: Math.random() * height * 0.25, life: 1 };
          nextMeteor = time + 7000 + Math.random() * 9000;
        }
        if (meteor) {
          const trail = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - 90, meteor.y - 34);
          trail.addColorStop(0, `rgba(255, 233, 196, ${meteor.life})`);
          trail.addColorStop(1, "rgba(255, 233, 196, 0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - 90, meteor.y - 34);
          ctx.stroke();
          meteor.x += 9;
          meteor.y += 3.4;
          meteor.life -= 0.022;
          if (meteor.life <= 0) meteor = null;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    resize();
    if (reducedMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !reducedMotion) frame = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    const onResize = () => {
      resize();
      if (reducedMotion) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

// La Luna Nera: sagoma del galeone che dondola sull'orizzonte
const Ship = () => (
  <svg viewBox="0 0 200 170" className="ship-bob h-full w-full" fill="hsl(224 50% 3%)">
    <path d="M18 112 L182 104 C178 134 160 150 136 152 L58 154 C38 153 24 136 18 112 Z" />
    <path d="M14 106 L46 104 L44 118 L20 120 Z" />
    <path d="M150 88 L186 90 L184 108 L148 110 Z" />
    <rect x="58" y="24" width="3.5" height="90" />
    <rect x="102" y="6" width="4" height="106" />
    <rect x="146" y="30" width="3" height="66" />
    <path d="M6 96 L60 62 L60 66 L14 100 Z" />
    <path d="M38 40 C54 46 58 54 60 76 L82 76 C78 58 76 46 80 36 Z" />
    <path d="M42 80 C54 84 60 92 60 106 L86 104 C84 94 84 84 86 76 Z" />
    <path d="M82 18 C100 24 104 34 104 54 L130 54 C126 38 124 28 128 14 Z" />
    <path d="M78 58 C98 64 104 76 104 98 L136 96 C132 82 130 68 134 54 Z" />
    <path d="M132 40 C146 46 148 54 148 66 L166 66 C164 56 162 48 166 36 Z" />
    <path d="M130 70 C144 74 148 82 148 92 L170 90 C168 84 166 76 168 66 Z" />
    <path d="M106 6 L128 2 L124 8 L128 14 L106 12 Z" />
  </svg>
);

// Scena animata dell'hero: cielo, stelle, luna nera, nave e onde
const SeaScene = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      root.style.setProperty("--scroll", String(Math.min(window.scrollY, 1200)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--px", (event.clientX / window.innerWidth - 0.5).toFixed(3));
      root.style.setProperty("--py", (event.clientY / window.innerHeight - 0.5).toFixed(3));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="sea-sky absolute inset-0 overflow-hidden">
      <Stars />

      {/* Luna */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--px, 0) * -22px), calc(var(--scroll, 0) * 0.22px + var(--py, 0) * -16px), 0)",
        }}
      >
        <div className="black-moon right-[-14%] top-[7%] w-[72vw] max-w-[360px] sm:right-[-4%] md:right-[9%] md:top-[11%] md:w-[33vw] md:max-w-[460px]" />
      </div>

      {/* Onde: la nave naviga tra la prima e la seconda */}
      {waves.map((wave, i) => (
        <Fragment key={wave.period}>
          <svg
            className="wave"
            viewBox="0 0 2400 240"
            preserveAspectRatio="none"
            style={
              {
                height: wave.size,
                "--wave-speed": wave.speed,
                animationDirection: i % 2 ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <path d={wavePath(wave.period, wave.amplitude, wave.height)} fill={wave.fill} />
          </svg>

          {i === 0 && (
            <div
              className="absolute inset-0"
              style={{ transform: "translate3d(0, calc(var(--scroll, 0) * 0.1px), 0)" }}
            >
              <div
                className="absolute right-[7%] top-[calc(80%-4.2rem)] h-[4.5rem] w-20 transition-transform duration-1000 ease-out md:right-[22%] md:top-[calc(69%-8.4rem)] md:h-40 md:w-48"
                style={{ transform: "translate3d(calc(var(--px, 0) * 18px), 0, 0)" }}
              >
                <Ship />
              </div>
            </div>
          )}
        </Fragment>
      ))}

      {/* Riflesso della luna sull'acqua */}
      <div className="moon-reflection right-[2%] top-[70%] h-[24%] w-[46vw] max-w-[360px] md:right-[12%]" />
    </div>
  );
};

export default SeaScene;
