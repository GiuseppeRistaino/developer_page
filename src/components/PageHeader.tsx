import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

const PageHeader = ({ eyebrow, title, children }: PageHeaderProps) => (
  <header className="mb-14 md:mb-20">
    <p className="eyebrow animate-fade-up">{eyebrow}</p>
    <h1 className="soft-optical mt-5 font-display text-6xl font-light leading-none tracking-tight md:text-8xl">
      <span className="title-line">
        <span>{title}</span>
      </span>
    </h1>
    <p
      className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
      style={{ animationDelay: "160ms" }}
    >
      {children}
    </p>
  </header>
);

export default PageHeader;
