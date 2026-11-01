import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

export const EMAIL = "giuseppe.ristaino@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/giuseppe-ristaino/";
export const GITHUB_URL = "https://github.com/GiuseppeRistaino";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Documentazione", path: "/documentazione" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const MoonMark = () => (
  <span
    aria-hidden="true"
    className="relative inline-block h-5 w-5 rounded-full bg-background shadow-[0_0_0_1px_hsl(var(--primary)),0_0_12px_1px_hsl(var(--primary)/0.65)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_hsl(var(--primary)),0_0_22px_5px_hsl(var(--primary)/0.75)]"
  />
);

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Spotlight delle card: un solo listener per tutto il sito
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || mobileOpen
            ? "border-border/70 bg-background/80 backdrop-blur-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="group flex items-center gap-3">
            <MoonMark />
            <span className="font-display text-lg font-medium tracking-tight text-foreground">
              Giuseppe Ristaino
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`nav-link text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.path) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className="collapse-grid md:hidden" data-open={mobileOpen}>
          <div>
            <div className="flex flex-col gap-1 border-t border-border/70 px-6 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  tabIndex={mobileOpen ? 0 : -1}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 font-display text-3xl font-light transition-colors ${
                    isActive(item.path) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main key={location.pathname} className="page-enter flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div>
              <p className="soft-optical font-display text-5xl font-light italic leading-none text-foreground md:text-7xl">
                Buon vento.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="nav-link mt-6 inline-block text-muted-foreground transition-colors hover:text-primary"
              >
                {EMAIL}
              </a>
            </div>

            <div className="flex flex-col gap-6 md:items-end">
              <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex gap-3">
                {[
                  { href: `mailto:${EMAIL}`, label: "Email", Icon: Mail },
                  { href: LINKEDIN_URL, label: "LinkedIn", Icon: Linkedin },
                  { href: GITHUB_URL, label: "GitHub", Icon: Github },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="rounded-full border border-border p-2.5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-14 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Giuseppe Ristaino — Tutti i diritti riservati
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
