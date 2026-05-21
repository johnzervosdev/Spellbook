import type { ReactNode } from "react";

interface PanelProps {
  title?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Panel = ({ title, headerAction, children, className }: PanelProps) => (
  <section className={`panel${className ? ` ${className}` : ""}`}>
    {(title || headerAction) && (
      <div className="panel-header">
        {title && <h2 className="panel-title">{title}</h2>}
        {headerAction && <div className="panel-header-action">{headerAction}</div>}
      </div>
    )}
    <div className="panel-body">{children}</div>
  </section>
);
