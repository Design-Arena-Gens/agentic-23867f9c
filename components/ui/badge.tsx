import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "neutral" | "secondary";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-brand-500/20 text-brand-200 border-brand-400/40",
  success: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
  warning: "bg-amber-500/15 text-amber-200 border-amber-400/40",
  danger: "bg-rose-500/15 text-rose-200 border-rose-400/40",
  neutral: "bg-slate-700/40 text-slate-100 border-slate-500/50",
  secondary: "bg-slate-500/20 text-slate-100 border-slate-400/40"
};

export const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
      variantStyles[variant],
      className
    )}
    {...props}
  />
);
