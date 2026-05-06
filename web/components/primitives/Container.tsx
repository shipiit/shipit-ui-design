import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "narrow" | "wide" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  as?: keyof React.JSX.IntrinsicElements;
}

const widthByVariant: Record<Variant, string> = {
  narrow: "max-w-3xl",
  wide: "max-w-[80rem]",
  full: "max-w-none",
};

/**
 * Container — consistent max-width + horizontal padding.
 * Padding scale lives entirely in tokens via Tailwind 4 spacing utilities.
 */
export function Container({
  variant = "wide",
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        widthByVariant[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Container;
