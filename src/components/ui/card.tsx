import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> &
  Readonly<{
    children: ReactNode;
  }>;

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <section
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
