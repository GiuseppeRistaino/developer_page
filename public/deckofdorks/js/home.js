// Home page: popola le sezioni con il catalogo reale e guida le animazioni
// legate allo scroll (sezioni sticky, parallasse, scorrimento orizzontale).
import { initSite, cardHTML, esc, observeReveals, splitText, RARITY_NAMES, STAGE_NAMES } from "./site.js";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);

splitHeroTitle();
initSite();


function splitHeroTitle() {
  const h = $("[data-hero-title]");
  if (!h) return;
  h.setAttribute("aria-label", h.textContent.replace(/\s+/g, " ").trim());
  let i = 0;
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent) {
          const s = document.createElement("span");
          s.className = "ch"; s.style.setProperty("--i", i++); s.textContent = ch === " " ? " " : ch; s.setAttribute("aria-hidden", "true");
          frag.append(s);
        }
        child.replaceWith(frag);
      } else walk(child);
    }
  };
  walk(h);
}

function build(cards, glossary = []) {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const bases = cards.filter((c) => c.stage === 0);
  const abilityIds = new Set(cards.flatMap((c) => c.abilities.map((a) => a.id)));

  $("#stat-cards").dataset.count = cards.length;
  $("#stat-families").dataset.count = bases.length;
  $("#stat-abilities").dataset.count = glossary.length || abilityIds.size;
  document.querySelectorAll("[data-total-cards]").forEach((el) => (el.textContent = cards.length));
  $("#count-dork").textContent = bases.filter((c) => c.race === "Dork").length + " famiglie";
  $("#count-nature").textContent = bases.filter((c) => c.race !== "Dork").length + " famiglie";

  // Mano a ventaglio nell'hero
  const handIds = ["legendary-nature-white-fox", "dork-legendary-iron-saint", "legendary-nature-moth-mage", "legendary-dork-tribal-brawler", "dork-legendary-void-sovereign"];
  $("#hero-hand").insertAdjacentHTML("beforeend", handIds.map((id, n) => byId.get(id) && cardHTML(byId.get(id), { size: "large", lazy: false, tag: "a", attrs: `href="wiki.html#card=${id}" style="--n:${n}" aria-label="${esc(byId.get(id).title)} nella wiki"` })).join(""));

  // Parata: tutte le forme base su due file in movimento
  const half = Math.ceil(bases.length / 2);
  const row = (list) => { const html = list.map((c) => cardHTML(c)).join(""); return html + html; };
  $("#parade-a").innerHTML = row(bases.slice(0, half));
  $("#parade-b").innerHTML = row(bases.slice(half));

  buildBoard(byId);
  buildTroops(byId);
  buildEvolution(cards);
  buildRarities(byId, bases);
  buildLegends(cards);

  splitText();
  observeReveals();
  // Le fazioni usano la classe is-in su più elementi figli.
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .25 });
  document.querySelectorAll(".factions, .faction").forEach((el) => io.observe(el));
}

/* ---------- Campo di battaglia ---------- */
const PAWNS = [
  // [id, colonna 0-5, corsia 0-3, passo in cui appare]
  ["goblin-pan", 2, 1, 1], ["goblin-pea", 0, 2, 1], ["guardian-mage", 1, 3, 1],
  ["guardian-moss", 3, 1, 2], ["nature-owl-lady", 5, 0, 2], ["guardian-pot", 3, 3, 2],
];
function buildBoard(byId) {
  const grid = $("#board-grid");
  grid.innerHTML = Array.from({ length: 24 }, (_, i) => `<i class="${i % 6 < 3 ? "hl" : ""}"></i>`).join("");
  const board = $("#board");
  for (const [id, col, lane, step] of PAWNS) {
    const c = byId.get(id);
    if (!c) continue;
    const x = 17 + (col + .5) * (66 / 6);
    const y = 27 + (lane + .85) * (46 / 4);
    board.insertAdjacentHTML("beforeend", `<span class="pawn ${col > 2 ? "flip" : ""}" data-step="${step}" style="left:${x}%;top:${y}%;z-index:${lane + 2}"><img src="assets/cards/sprite/${esc(c.art)}.webp" alt="${esc(c.title)}" loading="lazy"></span>`);
  }
}

function buildTroops(byId) {
  const put = (sel, ids, mirror) => {
    $(sel).innerHTML = ids.map((id) => byId.get(id)).filter(Boolean)
      .map((c) => `<img class="${mirror ? "mirror" : ""}" src="assets/cards/sprite/${esc(c.art)}.webp" alt="${esc(c.title)}" loading="lazy">`).join("");
  };
  put("#troop-dork", ["goblin-pan", "dork-legendary-iron-saint", "legendary-dork-tribal-brawler"], false);
  put("#troop-nature", ["guardian-owl", "legendary-nature-white-fox", "legendary-nature-rabbit-warrior"], true);
}

/* ---------- Evoluzioni ---------- */
let evo = null;
function buildEvolution(cards) {
  const family = cards.filter((c) => c.family === "dork-legendary-iron-saint").sort((a, b) => a.stage - b.stage);
  if (family.length < 3) return;
  const maxAtk = Math.max(...family.map((c) => c.attack)), maxHp = Math.max(...family.map((c) => c.health));
  $("#evo-cards").innerHTML = family.map((c) => cardHTML(c, { size: "large" })).join("") + `<img class="evo__sprite" id="evo-sprite" alt="" loading="lazy">`;
  $("#evo-rail").innerHTML = family.map((c, i) => `<div class="evo__node" data-i="${i}"><b>${STAGE_NAMES[i]}</b><small>${i === 0 ? "Livello 1" : `Livello ${c.requiredLevel} · ${"★".repeat(c.requiredStars)}`}</small></div>`).join("");
  evo = { family, maxAtk, maxHp, stage: -1, auras: ["#ffae42", "#7fd0ff", "#ff5a3d"] };
  document.querySelectorAll(".evo__node").forEach((el) => el.addEventListener("click", () => setEvoStage(Number(el.dataset.i))));
  setEvoStage(0);
}
function setEvoStage(i) {
  if (!evo || evo.stage === i) return;
  evo.stage = i;
  const c = evo.family[i];
  document.querySelectorAll("#evo-cards .card").forEach((el, k) => {
    el.classList.toggle("is-current", k === i);
    el.classList.toggle("is-past", k < i);
  });
  document.querySelectorAll(".evo__node").forEach((el, k) => el.classList.toggle("is-on", k <= i));
  $("#evo-aura").style.setProperty("--aura", evo.auras[i]);
  const sprite = $("#evo-sprite");
  sprite.classList.add("swap");
  setTimeout(() => { sprite.src = `assets/cards/sprite/${c.art}.webp?v=${c.artVersion || ""}`; sprite.alt = c.title; sprite.onload = () => sprite.classList.remove("swap"); }, 250);
  const info = $("#evo-info");
  info.classList.add("swap");
  setTimeout(() => {
    const a = c.abilities[c.abilities.length - 1];
    info.innerHTML = `
      <h3 class="evo__name">${esc(c.title)}</h3>
      <div class="evo__bars">
        <div class="bar bar--atk"><span>Attacco</span><span class="bar__track"><span class="bar__fill" style="--v:${(c.attack / evo.maxAtk) * 100}%"></span></span><span>${c.attack}</span></div>
        <div class="bar bar--hp"><span>Salute</span><span class="bar__track"><span class="bar__fill" style="--v:${(c.health / evo.maxHp) * 100}%"></span></span><span>${c.health}</span></div>
      </div>
      ${a ? `<div class="ability"><img src="assets/icons/${esc(a.icon)}.webp?v=${esc(a.iconVersion || "")}" alt=""><div><b>${esc(a.title)}</b><p>${esc(a.text)}</p></div></div>` : ""}`;
    info.classList.remove("swap");
  }, 300);
}

/* ---------- Rarità ---------- */
function buildRarities(byId, bases) {
  const examples = ["goblin-pan", "rare-dork-crossbow", "nature-epic-spirit-fox", "legendary-nature-moth-mage"];
  $("#rarities").innerHTML = examples.map((id, r) => {
    const c = byId.get(id) ?? bases.find((b) => b.rarity === r);
    const n = bases.filter((b) => b.rarity === r).length;
    return `<a class="rarity" data-r="${r}" href="wiki.html?rarity=${r}" style="text-decoration:none;color:inherit">
      <div data-reveal="flip" style="--d:${r * .15}s">${cardHTML(c, { size: "large" })}</div>
      <h3>${RARITY_NAMES[r]}</h3><p>${n} famiglie · ${n * 3} carte</p></a>`;
  }).join("");
}

/* ---------- Leggendari ---------- */
function buildLegends(cards) {
  const legends = cards.filter((c) => c.rarity === 3 && c.stage === 0);
  $("#legends-track").insertAdjacentHTML("beforeend", legends.map((c) => `
    <a class="legend" href="wiki.html#card=${esc(c.id)}">
      ${cardHTML(c, { size: "large" })}
      <img class="legend__sprite" src="assets/cards/sprite/${esc(c.art)}.webp" alt="" loading="lazy">
      <span class="legend__label"><b>${esc(c.title)}</b><span>${esc(c.race)} · ${esc(c.kind)} · ${c.abilities.map((a) => esc(a.title)).join(", ")}</span></span>
    </a>`).join(""));
}

/* ---------- Loop di scroll ---------- */
function progressOf(el) {
  const r = el.getBoundingClientRect();
  const span = r.height - innerHeight;
  return span <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / span));
}
function startScrollLoop() {
  const howto = $(".howto"), evoEl = $(".evo"), legends = $(".legends"), track = $("#legends-track");
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  const sticky = () => getComputedStyle($(".howto__sticky")).position === "sticky";
  let ticking = false;
  const update = () => {
    ticking = false;
    if (!reduceMotion) {
      for (const el of parallax) {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        el.style.transform = `translate3d(0, ${(-r.top) * Number(el.dataset.parallax)}px, 0)`;
      }
    }
    const isSticky = sticky();
    // Come si gioca
    const p = isSticky ? progressOf(howto) : 1;
    const step = isSticky ? Math.min(3, Math.floor(p * 4)) : 3;
    howto.style.setProperty("--p", p.toFixed(3));
    howto.dataset.step = step;
    document.querySelectorAll("#steps li").forEach((li, i) => { li.classList.toggle("is-active", i === step); li.classList.toggle("is-done", i < step); });
    document.querySelectorAll(".pawn").forEach((pw) => {
      pw.classList.toggle("is-on", Number(pw.dataset.step) <= Math.max(step, isSticky ? 0 : 3));
      pw.classList.toggle("hit", step >= 2 && step < 3 && pw.dataset.step === "2");
    });
    // Evoluzioni
    if (evo) setEvoStage(isSticky ? Math.min(2, Math.floor(progressOf(evoEl) * 3)) : evo.stage < 0 ? 0 : evo.stage);
    // Leggendari: scorrimento orizzontale
    if (isSticky && track) {
      const lp = progressOf(legends);
      const max = track.scrollWidth - innerWidth;
      track.style.transform = `translate3d(${-lp * Math.max(0, max)}px, 0, 0)`;
      legends.style.setProperty("--p", lp.toFixed(3));
    }
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
}

// Avvio (in fondo: le costanti di modulo sopra devono essere già inizializzate).
const data = await fetch("data/cards.json", { cache: "no-cache" }).then((r) => r.json()).catch(() => null);
if (data) build(data.cards, data.abilities);
startScrollLoop();
