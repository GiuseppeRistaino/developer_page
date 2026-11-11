// Deck of Dorks — comportamenti condivisi: navigazione, preloader, lucciole,
// rivelazioni allo scroll, testo animato, inclinazione delle carte.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const RARITY_NAMES = ["Comune", "Raro", "Epico", "Leggendario"];
export const STAGE_NAMES = ["Forma base", "Evoluzione I", "Evoluzione II"];

/* ---------- Navigazione ---------- */
function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("is-scrolled", y > 30);
    nav.classList.toggle("is-hidden", y > 400 && y > lastY && !nav.classList.contains("is-open"));
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  nav.querySelector(".nav__toggle")?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    nav.querySelector(".nav__toggle").setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));
}

/* ---------- Testo diviso in lettere ---------- */
export function splitText(root = document) {
  root.querySelectorAll(".split:not([data-split-done])").forEach((el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    let i = 0;
    for (const word of text.split(/(\s+)/)) {
      if (/^\s+$/.test(word)) { el.append(Object.assign(document.createElement("span"), { className: "sp" })); continue; }
      const w = document.createElement("span");
      w.style.display = "inline-block";
      w.setAttribute("aria-hidden", "true");
      for (const ch of word) {
        const s = document.createElement("span");
        s.className = "ch";
        s.style.setProperty("--i", i++);
        s.textContent = ch;
        w.append(s);
      }
      el.append(w);
    }
    el.dataset.splitDone = "1";
  });
}

/* ---------- Rivelazioni allo scroll ---------- */
let revealObserver;
export function observeReveals(root = document) {
  revealObserver ??= new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      revealObserver.unobserve(e.target);
      if (e.target.dataset.count !== undefined) countUp(e.target);
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
  root.querySelectorAll("[data-reveal]:not(.is-in), .split:not(.is-in), [data-count]").forEach((el) => revealObserver.observe(el));
}

function countUp(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) { el.textContent = target.toLocaleString("it-IT"); return; }
  const start = performance.now(), dur = 1600;
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))).toLocaleString("it-IT");
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Lucciole ---------- */
function initFireflies() {
  const canvas = document.getElementById("fireflies");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, flies;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    const count = Math.round(Math.min(60, innerWidth / 26));
    flies = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: (Math.random() * 1.6 + .6) * dpr,
      a: Math.random() * Math.PI * 2, s: (Math.random() * .25 + .08) * dpr,
      p: Math.random() * Math.PI * 2, hue: Math.random() < .25 ? 175 : 42,
    }));
  };
  resize();
  addEventListener("resize", resize);
  let visible = true;
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; if (visible) requestAnimationFrame(draw); });
  function draw(t) {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    for (const f of flies) {
      f.a += (Math.random() - .5) * .08;
      f.x += Math.cos(f.a) * f.s; f.y += Math.sin(f.a) * f.s - .05 * dpr;
      if (f.x < -10) f.x = w + 10; if (f.x > w + 10) f.x = -10;
      if (f.y < -10) f.y = h + 10; if (f.y > h + 10) f.y = -10;
      const glow = (Math.sin(t / 700 + f.p) + 1) / 2;
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 7);
      g.addColorStop(0, `hsla(${f.hue}, 100%, 75%, ${.55 * glow + .1})`);
      g.addColorStop(1, `hsla(${f.hue}, 100%, 60%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 7, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* ---------- Carte: costruzione e inclinazione 3D ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export { esc };

export function cardHTML(c, { size = "thumb", lazy = true, tag = "div", attrs = "" } = {}) {
  const pips = [0, 1, 2].map((i) => `<i class="${i <= c.stage ? "on" : ""}"></i>`).join("");
  return `<${tag} class="card is-tilt" data-r="${c.rarity}" data-id="${esc(c.id)}" ${attrs}>
    <div class="card__frame"><div class="card__art">
      <img src="assets/cards/${size}/${esc(c.art)}.webp?v=${esc(c.artVersion || "")}" alt="${esc(c.title)}" ${lazy ? 'loading="lazy"' : ""} decoding="async" width="300" height="400">
    </div></div>
    <span class="card__name">${esc(c.title)}</span>
    <div class="card__stats">
      <span class="stat stat--atk" title="Attacco">${c.attack}</span>
      <span class="card__meta"><span class="pips" title="${STAGE_NAMES[c.stage]}">${pips}</span><span class="card__kind">${c.kind}</span></span>
      <span class="stat stat--hp" title="Salute">${c.health}</span>
    </div>
    <span class="card__shine"></span>
  </${tag}>`;
}

export function enableTilt(root = document) {
  if (reduceMotion || matchMedia("(hover: none)").matches) return;
  root.addEventListener("pointermove", (e) => {
    const card = e.target.closest?.(".card.is-tilt");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", x * 100 + "%");
    card.style.setProperty("--my", y * 100 + "%");
    card.style.transform = `perspective(800px) rotateY(${(x - .5) * 16}deg) rotateX(${(.5 - y) * 14}deg) translateY(-6px) scale(1.03)`;
  });
  root.addEventListener("pointerout", (e) => {
    const card = e.target.closest?.(".card.is-tilt");
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
  });
}

/* ---------- Preloader ---------- */
function initPreloader() {
  const pre = document.querySelector(".preloader");
  if (!pre) { document.body.classList.add("is-ready"); return; }
  const seen = (() => { try { return sessionStorage.getItem("dod-intro") === "1"; } catch { return false; } })();
  const minTime = reduceMotion ? 0 : seen ? 700 : 2300;
  const start = performance.now();
  let fired = false;
  const done = () => {
    if (fired) return;
    fired = true;
    const wait = Math.max(0, minTime - (performance.now() - start));
    setTimeout(() => {
      pre.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
      try { sessionStorage.setItem("dod-intro", "1"); } catch {}
      setTimeout(() => pre.remove(), 1400);
    }, wait);
  };
  if (document.readyState === "complete") done(); else addEventListener("load", done, { once: true });
  setTimeout(done, 6000); // rete lenta: non bloccare mai il sito
}

/* ---------- Avvio ---------- */
export function initSite() {
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  initNav();
  initPreloader();
  splitText();
  observeReveals();
  initFireflies();
  enableTilt();
}
