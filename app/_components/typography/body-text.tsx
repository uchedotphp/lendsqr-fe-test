import { forwardRef } from "react";
import { cn } from "@/app/_lib/utils/cn";

const textSizeClasses = {
  xs: "typography-text--xs",
  sm: "typography-text--sm",
  md: "typography-text--md",
  lg: "typography-text--lg",
} as const;

const textToneClasses = {
  default: "typography-text--default",
  muted: "typography-text--muted",
  error: "typography-text--error",
} as const;

type TextSize = keyof typeof textSizeClasses;
type TextTone = keyof typeof textToneClasses;
type TextElement = "p" | "span" | "label" | "small";

type BodyTextProps = React.HTMLAttributes<HTMLElement> & {
  as?: TextElement;
  size?: TextSize;
  tone?: TextTone;
};

export const BodyText = forwardRef<HTMLElement, BodyTextProps>(
  (
    { className, as = "p", size = "md", tone = "default", children, ...props },
    ref,
  ) => {
    const Comp = as;

    return (
      <Comp
        ref={ref}
        className={cn(
          "typography-text",
          textSizeClasses[size],
          textToneClasses[tone],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

BodyText.displayName = "BodyText";
