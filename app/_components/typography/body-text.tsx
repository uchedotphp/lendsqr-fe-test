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

type BodyTextBaseProps = {
  size?: TextSize;
  tone?: TextTone;
  className?: string;
  children?: React.ReactNode;
};

type BodyTextProps =
  | (BodyTextBaseProps &
      React.HTMLAttributes<HTMLParagraphElement> & {
        as?: "p";
      })
  | (BodyTextBaseProps &
      React.HTMLAttributes<HTMLSpanElement> & {
        as: "span";
      })
  | (BodyTextBaseProps &
      React.LabelHTMLAttributes<HTMLLabelElement> & {
        as: "label";
      })
  | (BodyTextBaseProps &
      React.HTMLAttributes<HTMLElement> & {
        as: "small";
      });

export function BodyText({
  className,
  as = "p",
  size = "md",
  tone = "default",
  children,
  ...props
}: BodyTextProps) {
  const Comp = as as TextElement;

  return (
    <Comp
      className={cn(
        "typography-text",
        textSizeClasses[size],
        textToneClasses[tone],
        className,
      )}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </Comp>
  );
}
