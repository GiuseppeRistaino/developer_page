import { useEffect, useRef, useState } from "react";

const script = [
  "**** COMMODORE 64 BASIC V2 ****",
  "READY.",
  'LOAD "VREXAS",8,1',
  "SEARCHING FOR VREXAS",
  "LOADING",
  "READY.",
  "RUN",
];

// Scrive le righe del Commodore 64 quando il terminale entra in vista
const C64Terminal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const total = script.join("\n").length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(total);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setInterval(() => {
          setTyped((value) => {
            if (value >= total) window.clearInterval(timer);
            return Math.min(value + 1, total);
          });
        }, 26);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [total]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Schermata del Commodore 64 che carica il programma Vrexas"
      className="min-h-[13.5rem] rounded-xl border border-tide/30 bg-[hsl(226_50%_12%)] p-5 font-mono text-xs leading-relaxed text-[hsl(214_80%_78%)] sm:text-sm"
    >
      <span className="whitespace-pre-wrap">{script.join("\n").slice(0, typed)}</span>
      <span className="caret ml-0.5" />
    </div>
  );
};

export default C64Terminal;
