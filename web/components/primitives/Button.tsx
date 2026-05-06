import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] " +
  "transition-[background-color,color,transform,box-shadow,border-color] " +
  "duration-[var(--dur-default)] ease-[var(--ease-out)] " +
  "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed " +
  "disabled:active:scale-100 disabled:hover:bg-inherit " +
  "focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand)] text-[var(--color-fg-on-brand)] " +
    "hover:bg-[var(--color-brand-hover)] shadow-[var(--shadow-sm)] " +
    "hover:shadow-[var(--shadow-md)]",
  secondary:
    "bg-[var(--color-surface)] text-[var(--color-fg)] " +
    "border border-[var(--color-border)] " +
    "hover:bg-[var(--color-surface-elevated)] " +
    "hover:border-[var(--color-border)]",
  ghost:
    "bg-transparent text-[var(--color-fg)] " +
    "hover:bg-[var(--color-surface-elevated)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[length:var(--text-sm)]",
  md: "h-10 px-4 text-[length:var(--text-sm)]",
  lg: "h-12 px-5 text-[length:var(--text-base)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: "button";
  };

type ButtonAsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    as,
    ...rest
  } = props as CommonProps & {
    as?: "button" | "a";
  } & Record<string, unknown>;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === "a") {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

export default Button;
