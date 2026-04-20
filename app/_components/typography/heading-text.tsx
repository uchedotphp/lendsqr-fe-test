import { forwardRef } from "react";
import { cn } from "@/app/_lib/utils/cn";

const headingSizeClasses = {
  xs: "typography-heading--xs",
  sm: "typography-heading--sm",
  md: "typography-heading--md",
  lg: "typography-heading--lg",
  xl: "typography-heading--xl",
  "2xl": "typography-heading--2xl",
  "3xl": "typography-heading--3xl",
  "4xl": "typography-heading--4xl",
} as const;

type HeadingSize = keyof typeof headingSizeClasses;
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingTextProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  size?: HeadingSize;
};

export const HeadingText = forwardRef<HTMLHeadingElement, HeadingTextProps>(
  ({ className, level = "h1", size = "lg", children, ...props }, ref) => {
    const Comp = level;

    return (
      <Comp
        ref={ref}
        className={cn(
          "typography-heading",
          headingSizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

HeadingText.displayName = "HeadingText";
