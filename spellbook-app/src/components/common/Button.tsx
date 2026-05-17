import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...rest }: ButtonProps) => (
  <button className={`btn${className ? ` ${className}` : ""}`} {...rest}>
    {children}
  </button>
);
