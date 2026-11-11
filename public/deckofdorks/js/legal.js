// Pagine legali: animazioni comuni e indice che segue la sezione in lettura.
import { initSite } from "./site.js";

initSite();

const links = new Map([...document.querySelectorAll(".legal__toc a")].map((a) => [a.getAttribute("href").slice(1), a]));
const spy = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    links.forEach((a) => a.classList.remove("is-active"));
    links.get(e.target.id)?.classList.add("is-active");
  }
}, { rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll(".legal__body h2[id]").forEach((h) => spy.observe(h));
