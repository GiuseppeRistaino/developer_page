// Wiki: filtri, ricerca, griglia animata, scheda dettagliata e glossario abilità.
import { initSite, cardHTML, esc, enableTilt, RARITY_NAMES, STAGE_NAMES } from "./site.js";

const $ = (s, r = document) => r.querySelector(s);
const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

initSite();

const { cards, abilities: glossary = [], version, generated } = await fetch("data/cards.json", { cache: "no-cache" }).then((r) => r.json());
const byId = new Map(cards.map((c) => [c.id, c]));
const families = new Map();
for (const c of cards) (families.get(c.family) ?? families.set(c.family, []).get(c.family)).push(c);
for (const list of families.values()) list.sort((a, b) => a.stage - b.stage);
const searchIndex = new Map(cards.map((c) => [c.id, norm([c.title, byId.get(c.family)?.title, c.id, c.family, c.race, c.kind, c.rarityName, STAGE_NAMES[c.stage], ...c.abilities.flatMap((a) => [a.title, a.text])].join(" "))]));

$("#catalog-info").textContent = `${cards.length} carte · ${families.size} famiglie · catalogo v${version}.`;

const state = { q: "", race: new Set(), rarity: new Set(), kind: new Set(), stage: "all", sort: "default", tab: "cards" };
let visible = [];

/* ---------- Stato iniziale da URL ---------- */
const params = new URLSearchParams(location.search);
for (const key of ["race", "rarity", "kind"]) for (const v of params.getAll(key)) state[key].add(v);
if (params.get("q")) state.q = params.get("q");
$("#q").value = state.q;
document.querySelectorAll(".fbtn[data-f]").forEach((b) => b.setAttribute("aria-pressed", String(state[b.dataset.f].has(b.dataset.v))));

/* ---------- Filtri ---------- */
function matches(c) {
  if (state.race.size && !state.race.has(c.race)) return false;
  if (state.rarity.size && !state.rarity.has(String(c.rarity))) return false;
  if (state.kind.size && !state.kind.has(c.kind)) return false;
  if (/^\d$/.test(state.stage) && c.stage !== Number(state.stage)) return false;
  if (state.q) return norm(state.q).split(/\s+/).every((t) => searchIndex.get(c.id).includes(t));
  return true;
}
function sorted(list) {
  const s = state.sort;
  if (s === "name") return [...list].sort((a, b) => a.title.localeCompare(b.title, "it") || a.stage - b.stage);
  if (s === "attack") return [...list].sort((a, b) => b.attack - a.attack);
  if (s === "health") return [...list].sort((a, b) => b.health - a.health);
  return list; // già ordinato per rarità e famiglia dal generatore
}

function renderCards() {
  visible = sorted(cards.filter(matches));
  const grid = $("#view-cards");
  $("#count").textContent = `${visible.length} ${visible.length === 1 ? "carta" : "carte"}`;
  if (!visible.length) { grid.innerHTML = `<p class="empty">Nessuna carta trovata… forse si è nascosta nel bosco.</p>`; return; }
  let html = "", lastFamily = null, i = 0;
  for (const c of visible) {
    if (state.stage === "family" && c.family !== lastFamily) {
      const base = byId.get(c.family);
      html += `<h2 class="family-head">${esc(base.title)} <span class="chip chip--r" style="--rc:var(--r-${["common", "rare", "epic", "legendary"][base.rarity]})">${RARITY_NAMES[base.rarity]}</span></h2>`;
      lastFamily = c.family;
    }
    html += `<div class="grid-card">${cardHTML(c, { attrs: `style="--i:${i++}" tabindex="0" role="button" aria-label="Apri la scheda di ${esc(c.title)}"` })}
      <span class="grid-card__sub">${STAGE_NAMES[c.stage]} · ${esc(c.race === "Dork" ? "Dork" : "Natura")}</span></div>`;
  }
  grid.innerHTML = html;
}

function renderAbilities() {
  const map = new Map(glossary.map((a) => [a.id, { ...a, cards: [], all: 0, members: new Set() }]));
  for (const c of cards) for (const a of c.abilities) {
    const e = map.get(a.id) ?? map.set(a.id, { ...a, cards: [], all: 0, members: new Set() }).get(a.id);
    if (!e.members.has(c.id)) { e.members.add(c.id); e.all++; if (matches(c)) e.cards.push(c); }
  }
  const q = norm(state.q);
  const filtered = state.race.size || state.rarity.size || state.kind.size || state.stage !== "all";
  const list = [...map.values()]
    .filter((a) => a.cards.length || (!filtered && (!q || norm(a.title + " " + a.text).includes(q))))
    .sort((a, b) => a.title.localeCompare(b.title, "it"));
  $("#count").textContent = `${list.length} abilità`;
  $("#view-abilities").innerHTML = list.length ? list.map((a, i) => `
    <article class="ab panel" style="--i:${i}">
      <div class="ab__head"><img src="assets/icons/${esc(a.icon)}.webp?v=${esc(a.iconVersion || "")}" alt="" loading="lazy">
        <div><h3>${esc(a.title)}</h3><small>${a.all} ${a.all === 1 ? "carta" : "carte"}${a.exclusiveFamily ? " · esclusiva leggendaria" : ""}</small></div></div>
      <p>${esc(a.text)}</p>
      ${a.all === 0 ? `<small>Non assegnata alle carte del catalogo attuale.</small>` : ""}
      <div class="ab__cards">${a.cards.map((c) => `<button class="avatar" data-r="${c.rarity}" data-open="${esc(c.id)}" title="${esc(c.title)} · ${STAGE_NAMES[c.stage]}"><img src="assets/cards/thumb/${esc(c.art)}.webp?v=${esc(c.artVersion || "")}" alt="${esc(c.title)}" loading="lazy"></button>`).join("")}</div>
    </article>`).join("") : `<p class="empty">Nessuna abilità trovata.</p>`;
}

function render() {
  state.tab === "cards" ? renderCards() : renderAbilities();
  const url = new URL(location.href);
  url.search = "";
  for (const key of ["race", "rarity", "kind"]) for (const v of state[key]) url.searchParams.append(key, v);
  if (state.q) url.searchParams.set("q", state.q);
  history.replaceState(null, "", url);
}

/* ---------- Eventi toolbar ---------- */
let qTimer;
$("#q").addEventListener("input", (e) => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 140); });
document.querySelectorAll(".fbtn[data-f]").forEach((b) => b.addEventListener("click", () => {
  const set = state[b.dataset.f];
  set.has(b.dataset.v) ? set.delete(b.dataset.v) : set.add(b.dataset.v);
  b.setAttribute("aria-pressed", String(set.has(b.dataset.v)));
  render();
}));
$("#stage").addEventListener("change", (e) => { state.stage = e.target.value; render(); });
$("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
$("#filters-toggle").addEventListener("click", (e) => {
  const open = $("#toolbar").classList.toggle("is-open");
  e.currentTarget.setAttribute("aria-expanded", String(open));
});
function setTab(tab) {
  state.tab = tab;
  $("#tab-cards").setAttribute("aria-selected", String(tab === "cards"));
  $("#tab-abilities").setAttribute("aria-selected", String(tab === "abilities"));
  $("#view-cards").hidden = tab !== "cards";
  $("#view-abilities").hidden = tab !== "abilities";
  render();
}
$("#tab-cards").addEventListener("click", () => { setTab("cards"); if (location.hash === "#abilita") history.replaceState(null, "", location.pathname + location.search); });
$("#tab-abilities").addEventListener("click", () => { setTab("abilities"); history.replaceState(null, "", location.pathname + location.search + "#abilita"); });

/* ---------- Scheda carta ---------- */
const sheet = $("#sheet");
let current = null;

function openCard(id, { push = true } = {}) {
  const c = byId.get(id);
  if (!c) return;
  current = c;
  const fam = families.get(c.family);
  const base = fam[0];
  const rc = `var(--r-${["common", "rare", "epic", "legendary"][c.rarity]})`;
  const stats = [
    `<div class="sbox sbox--atk"><b>${c.attack}</b><span>Attacco base</span></div>`,
    `<div class="sbox sbox--hp"><b>${c.health}</b><span>Salute base</span></div>`,
    c.maxAttack != null ? `<div class="sbox sbox--atk"><b>${c.maxAttack}</b><span>Attacco al liv. ${c.maxLevel} · 1 stella</span></div>` : "",
    c.maxHealth != null ? `<div class="sbox sbox--hp"><b>${c.maxHealth}</b><span>Salute al liv. ${c.maxLevel} · 1 stella</span></div>` : "",
    c.armor ? `<div class="sbox"><b>${c.armor}</b><span>Corazza</span></div>` : "",
    `<div class="sbox"><b>${c.maxLevel}</b><span>Livello massimo</span></div>`,
  ].join("");
  const unlock = c.stage > 0 ? `<p class="callout">Si sblocca da <b>${esc(base.title)}</b> al <b>livello ${c.requiredLevel}</b> con <b>${c.requiredStars} ${c.requiredStars === 1 ? "stella" : "stelle"}</b>. Costo: <b>${c.evolutionCost.copies.toLocaleString("it-IT")} copie della stessa carta</b> e <b>${c.evolutionCost.coins.toLocaleString("it-IT")} monete</b>. Conserva livello e stelle.</p>` : "";
  const abilities = c.abilities.map((a) => `
    <div class="ability"><img src="assets/icons/${esc(a.icon)}.webp?v=${esc(a.iconVersion || "")}" alt="">
      <div><b>${esc(a.title)}</b>${a.inherited ? "<small>Ereditata dalle forme precedenti</small>" : ""}<p>${esc(a.text)}</p>${a.upgrades ? `<small>${esc(a.upgrades)}</small>` : ""}</div></div>`).join("");
  const evoline = fam.map((f) => `
    <button data-open="${esc(f.id)}" aria-current="${f.id === c.id}">
      ${cardHTML(f, { tag: "div" }).replace("is-tilt", "")}
      <small>${STAGE_NAMES[f.stage]}${f.stage ? `<br>Liv. ${f.requiredLevel} · ${"★".repeat(f.requiredStars)}<br>${f.evolutionCost.copies.toLocaleString("it-IT")} copie · ${f.evolutionCost.coins.toLocaleString("it-IT")} monete` : "<br>Liv. 1"}</small>
    </button>`).join("");
  const rebirthSource = base.rebirths;
  const rebirths = rebirthSource.length ? `
    <h3>Rinascite</h3>
    <p style="color:var(--muted);margin-top:-.3rem;font-size:.95rem">Ogni rinascita aggiunge una stella e bonus permanenti, riporta il livello a 1 e conserva la forma evoluta. I costi consumano copie extra della stessa carta e sono uguali per tutte le carte della stessa rarità.</p>
    <p class="table-scroll-hint">Scorri la tabella in orizzontale per vedere tutti i costi.</p>
    <div class="table-wrap" tabindex="0" aria-label="Requisiti e costi delle rinascite"><table class="rebirths"><thead><tr><th>Stelle</th><th>Livello richiesto</th><th>Bonus ATT</th><th>Bonus SAL</th><th>Copie</th><th>Monete</th></tr></thead>
    <tbody>${rebirthSource.map((r, i) => `<tr><td>${"★".repeat(i + 2)}</td><td>${r.level}</td><td>+${r.attack}</td><td>+${r.health}</td><td>${r.copies.toLocaleString("it-IT")}</td><td>${r.coins.toLocaleString("it-IT")}</td></tr>`).join("")}</tbody></table></div>` : "";
  const cost = base.upgradeCost ? `<p style="color:var(--muted);font-size:.95rem">Un ciclo dal livello 1 al ${base.maxLevel}, senza rinascite: <b style="color:var(--parchment)">${base.upgradeCost.copies.toLocaleString("it-IT")} copie</b> e <b style="color:var(--gold-2)">${base.upgradeCost.coins.toLocaleString("it-IT")} monete</b>.</p>` : "";
  const lifetime = base.lifetimeCost ? `<p class="callout">Percorso completo fino al livello massimo, con tutte le rinascite e le due evoluzioni: <b>${base.lifetimeCost.copies.toLocaleString("it-IT")} copie</b> e <b>${base.lifetimeCost.coins.toLocaleString("it-IT")} monete</b>. Include i livelli da ripetere dopo ogni rinascita e i costi delle trasformazioni.</p>` : "";

  $("#sheet-body").innerHTML = `
    <div class="sheet__visual"><div class="sheet__art">
      ${cardHTML(c, { size: "large", lazy: false })}
      <img class="sheet__sprite" src="assets/cards/sprite/${esc(c.art)}.webp?v=${esc(c.artVersion || "")}" alt="Pedina da battaglia di ${esc(c.title)}">
    </div></div>
    <div>
      <h2 id="sheet-title">${esc(c.title)}</h2>
      <div class="sheet__chips">
        <span class="chip chip--r" style="--rc:${rc}">${RARITY_NAMES[c.rarity]}</span>
        <span class="chip">${esc(c.race)}</span>
        <span class="chip">${esc(c.kind)}</span>
        <span class="chip">${STAGE_NAMES[c.stage]}</span>
        ${c.starter ? `<span class="chip">Mazzo iniziale</span>` : ""}
      </div>
      ${unlock}
      <div class="sheet__stats">${stats}</div>
      <h3>Abilità</h3>${abilities}
      <h3>Linea evolutiva</h3><div class="evoline">${evoline}</div>
      ${rebirths}
      ${cost ? `<h3>Potenziamento</h3>${cost}${lifetime}` : ""}
    </div>`;
  if (!sheet.open) { sheet.classList.remove("is-closing"); sheet.showModal(); }
  sheet.querySelector(".sheet__inner").scrollTop = 0;
  const hash = "#card=" + c.id;
  if (push && location.hash !== hash) history.replaceState(null, "", location.pathname + location.search + hash);
}

function closeSheet() {
  if (!sheet.open) return;
  sheet.classList.add("is-closing");
  setTimeout(() => { sheet.close(); sheet.classList.remove("is-closing"); }, 280);
  history.replaceState(null, "", location.pathname + location.search + (state.tab === "abilities" ? "#abilita" : ""));
}
function step(dir) {
  const list = state.tab === "cards" && visible.length ? visible : cards;
  const i = list.findIndex((c) => c.id === current?.id);
  const next = list[(i + dir + list.length) % list.length];
  if (next) openCard(next.id);
}

$("#sheet-close").addEventListener("click", closeSheet);
$("#sheet-prev").addEventListener("click", () => step(-1));
$("#sheet-next").addEventListener("click", () => step(1));
sheet.addEventListener("cancel", (e) => { e.preventDefault(); closeSheet(); });
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
sheet.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });

document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  if (opener) { openCard(opener.dataset.open); return; }
  const card = e.target.closest("#view-cards .card");
  if (card) openCard(card.dataset.id);
});
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches?.("#view-cards .card")) { e.preventDefault(); openCard(e.target.dataset.id); }
});
enableTilt(sheet);

/* ---------- Avvio ---------- */
function fromHash() {
  const m = location.hash.match(/^#card=(.+)$/);
  if (m) openCard(decodeURIComponent(m[1]), { push: false });
  if (location.hash === "#abilita" && state.tab !== "abilities") setTab("abilities");
}
setTab(location.hash === "#abilita" ? "abilities" : "cards");
fromHash();
addEventListener("hashchange", fromHash);
console.debug(`Wiki Deck of Dorks: catalogo v${version} generato il ${generated}`);
