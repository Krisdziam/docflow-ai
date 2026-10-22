import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Readonly<{
    children: ReactNode;
    variant?: ButtonVariant;
  }>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand)] text-white shadow-sm hover:bg-[var(--color-brand-strong)]",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text)]",
};

export function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
