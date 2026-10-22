import type { ReactNode } from "react";

type BadgeTone = "brand" | "success" | "warning" | "danger" | "neutral";

type BadgeProps = Readonly<{
  children: ReactNode;
  tone?: BadgeTone;
}>;

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]",
  success: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
  danger: "bg-red-50 text-red-700",
  neutral: "bg-slate-100 text-slate-700",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
