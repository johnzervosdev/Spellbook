import type { ReactNode } from "react";

interface PanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Panel = ({ title, children, className }: PanelProps) => (
  <section className={`panel${className ? ` ${className}` : ""}`}>
    {title && <h2 className="panel-title">{title}</h2>}
    <div className="panel-body">{children}</div>
  </section>
);
