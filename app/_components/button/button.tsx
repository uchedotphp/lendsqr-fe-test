import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "@/app/_components/button/button.module.scss";
import { cn } from "@/app/_lib/utils/cn";

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles["button--primary"],
      ghost: styles["button--ghost"],
      link: styles["button--link"],
    },
    size: {
      default: styles["button--size-default"],
      sm: styles["button--size-sm"],
    },
    fullWidth: {
      true: styles["button--full-width"],
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    fullWidth: false,
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText = "Loading...",
      type = "button",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = Boolean(disabled || loading);

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          loading && styles["button--loading"],
          className,
        )}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <span className={styles.button__spinner} aria-hidden="true" />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";
